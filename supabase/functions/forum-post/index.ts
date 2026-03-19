import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60000; // 1 minute

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 255;

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP.trim();
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) rateLimitMap.delete(key);
    }
  }
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true, resetInSeconds: Math.ceil(RATE_WINDOW_MS / 1000) };
  }
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, resetInSeconds: Math.ceil((record.resetTime - now) / 1000) };
  }
  record.count++;
  return { allowed: true, resetInSeconds: Math.ceil((record.resetTime - now) / 1000) };
}

function sanitizeString(input: string): string {
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': String(rateLimit.resetInSeconds) } }
      );
    }

    const body = await req.json();
    const { action, email, session_token, title, content, topic_id } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate session token
    if (!session_token || typeof session_token !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Session token is required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const trimmedEmail = sanitizeString(email).toLowerCase();
    if (trimmedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(trimmedEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate session_token is a UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(session_token)) {
      return new Response(
        JSON.stringify({ error: 'Invalid session token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the session token matches the email and is not expired
    const { data: memberData, error: memberError } = await supabase
      .from('community_members')
      .select('email, name, session_token, session_token_expires_at')
      .eq('email', trimmedEmail)
      .eq('session_token', session_token)
      .limit(1);

    if (memberError || !memberData || memberData.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session. Please verify your membership again.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const member = memberData[0];

    // Check token expiry
    if (member.session_token_expires_at && new Date(member.session_token_expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Session expired. Please verify your membership again.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'create_topic') {
      if (!title || typeof title !== 'string' || !content || typeof content !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Title and content are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const sanitizedTitle = sanitizeString(title);
      const sanitizedContent = sanitizeString(content);

      if (sanitizedTitle.length === 0 || sanitizedTitle.length > MAX_TITLE_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Title must be 1-${MAX_TITLE_LENGTH} characters` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (sanitizedContent.length === 0 || sanitizedContent.length > MAX_CONTENT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Content must be 1-${MAX_CONTENT_LENGTH} characters` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase.from('forum_topics').insert({
        title: sanitizedTitle,
        content: sanitizedContent,
        author_email: member.email,
        author_name: member.name,
      }).select('id, title, content, author_name, created_at, updated_at').single();

      if (error) {
        console.error('Insert topic error:', error.message);
        return new Response(
          JSON.stringify({ error: 'Failed to create topic' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'create_reply') {
      if (!content || typeof content !== 'string' || !topic_id || typeof topic_id !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Content and topic_id are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const sanitizedContent = sanitizeString(content);
      if (sanitizedContent.length === 0 || sanitizedContent.length > MAX_CONTENT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Content must be 1-${MAX_CONTENT_LENGTH} characters` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!uuidRegex.test(topic_id)) {
        return new Response(
          JSON.stringify({ error: 'Invalid topic ID' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase.from('forum_replies').insert({
        topic_id,
        content: sanitizedContent,
        author_email: member.email,
        author_name: member.name,
      }).select('id, topic_id, content, author_name, created_at').single();

      if (error) {
        console.error('Insert reply error:', error.message);
        return new Response(
          JSON.stringify({ error: 'Failed to create reply' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Use create_topic or create_reply.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Unexpected error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
