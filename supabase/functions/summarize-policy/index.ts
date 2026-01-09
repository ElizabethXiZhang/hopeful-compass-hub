import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation constants
const MAX_TITLE_LENGTH = 200;
const MAX_POLICY_TEXT_LENGTH = 10000;

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // max requests per window
const RATE_WINDOW_MS = 60000; // 1 minute window

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }
  
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true, resetInSeconds: Math.ceil(RATE_WINDOW_MS / 1000) };
  }
  
  if (record.count >= RATE_LIMIT) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, resetInSeconds };
  }
  
  record.count++;
  return { allowed: true, resetInSeconds: Math.ceil((record.resetTime - now) / 1000) };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP);
  
  if (!rateLimit.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIP.substring(0, 8)}...`);
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.resetInSeconds)
        } 
      }
    );
  }

  try {
    const { policyText, title } = await req.json();
    
    // Validate required fields
    if (!policyText || !title) {
      return new Response(
        JSON.stringify({ error: 'Policy text and title are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input types
    if (typeof policyText !== 'string' || typeof title !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid input types' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input lengths
    if (title.length > MAX_TITLE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Title must be less than ${MAX_TITLE_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (policyText.length > MAX_POLICY_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Policy text must be less than ${MAX_POLICY_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs (remove control characters)
    const cleanTitle = title.replace(/[\x00-\x1F\x7F]/g, '').trim();
    const cleanText = policyText.replace(/[\x00-\x1F\x7F]/g, '').trim();

    if (!cleanTitle || !cleanText) {
      return new Response(
        JSON.stringify({ error: 'Invalid input content' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('Service configuration error');
    }

    console.log(`Summarizing policy: ${cleanTitle.substring(0, 50)}...`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a policy summarizer. Your task is to convert complex government policy language into calm, neutral, easy-to-understand summaries for people affected by unemployment or job transitions.

Guidelines:
- Keep summaries under 80 words
- Use simple, accessible language
- Be factual and neutral - do NOT give legal advice
- Focus on what the policy offers and who can benefit
- Avoid jargon and technical terms
- Be compassionate but professional`
          },
          {
            role: 'user',
            content: `Please summarize this government policy titled "${cleanTitle}":\n\n${cleanText}`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('AI service error');
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content;

    if (!summary) {
      throw new Error('No summary generated');
    }

    console.log(`Successfully summarized policy`);

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in summarize-policy function:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process request. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
