import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per function instance)
// Note: In production with multiple instances, consider using Redis or database-based rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max submissions per window
const RATE_WINDOW_MS = 3600000; // 1 hour window

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_PROFESSION_LENGTH = 100;
const MAX_COUNTRY_LENGTH = 100;
const MAX_CITY_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MIN_AGE = 16;
const MAX_AGE = 120;
const MIN_YEARS = 0;
const MAX_YEARS = 60;

const VALID_GENDERS = ['male', 'female', 'non-binary', 'prefer-not-to-say'];

// Email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIP(req: Request): string {
  // Try various headers that might contain the real IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP if there are multiple
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback - not ideal but better than nothing
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; resetInSeconds: number } {
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
    // First request or window expired
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true, remainingAttempts: RATE_LIMIT - 1, resetInSeconds: Math.ceil(RATE_WINDOW_MS / 1000) };
  }
  
  if (record.count >= RATE_LIMIT) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remainingAttempts: 0, resetInSeconds };
  }
  
  record.count++;
  return { 
    allowed: true, 
    remainingAttempts: RATE_LIMIT - record.count, 
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000) 
  };
}

function sanitizeString(input: string | null | undefined): string | null {
  if (input === null || input === undefined) {
    return null;
  }
  // Remove control characters and trim
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

function validateInput(data: unknown): { valid: boolean; errors: string[]; sanitized?: Record<string, unknown> } {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }
  
  const input = data as Record<string, unknown>;
  
  // Required fields validation
  const gender = typeof input.gender === 'string' ? sanitizeString(input.gender) : null;
  if (!gender || !VALID_GENDERS.includes(gender)) {
    errors.push('Invalid gender selection');
  }
  
  const country = typeof input.country === 'string' ? sanitizeString(input.country) : null;
  if (!country || country.length === 0) {
    errors.push('Country is required');
  } else if (country.length > MAX_COUNTRY_LENGTH) {
    errors.push(`Country must be less than ${MAX_COUNTRY_LENGTH} characters`);
  }
  
  const city = typeof input.city === 'string' ? sanitizeString(input.city) : null;
  if (!city || city.length === 0) {
    errors.push('City is required');
  } else if (city.length > MAX_CITY_LENGTH) {
    errors.push(`City must be less than ${MAX_CITY_LENGTH} characters`);
  }
  
  const email = typeof input.email === 'string' ? sanitizeString(input.email)?.toLowerCase() : null;
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('Valid email is required');
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.push(`Email must be less than ${MAX_EMAIL_LENGTH} characters`);
  }
  
  const age = typeof input.age === 'number' ? input.age : null;
  if (age !== null && (age < MIN_AGE || age > MAX_AGE || !Number.isInteger(age))) {
    errors.push(`Age must be between ${MIN_AGE} and ${MAX_AGE}`);
  }
  
  const yearsOfService = typeof input.years_of_service === 'number' ? input.years_of_service : null;
  if (yearsOfService !== null && (yearsOfService < MIN_YEARS || yearsOfService > MAX_YEARS || !Number.isInteger(yearsOfService))) {
    errors.push(`Years of service must be between ${MIN_YEARS} and ${MAX_YEARS}`);
  }
  
  // Optional fields with length limits
  const name = typeof input.name === 'string' ? sanitizeString(input.name) : null;
  if (name && name.length > MAX_NAME_LENGTH) {
    errors.push(`Name must be less than ${MAX_NAME_LENGTH} characters`);
  }
  
  const profession = typeof input.profession === 'string' ? sanitizeString(input.profession) : null;
  if (profession && profession.length > MAX_PROFESSION_LENGTH) {
    errors.push(`Profession must be less than ${MAX_PROFESSION_LENGTH} characters`);
  }
  
  const shareStory = typeof input.share_story === 'boolean' ? input.share_story : false;
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    sanitized: {
      name: name || null,
      gender,
      age,
      profession: profession || null,
      years_of_service: yearsOfService,
      country,
      city,
      email,
      share_story: shareStory,
    }
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
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
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP.substring(0, 8)}...`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many submissions. Please try again later.',
          retryAfterSeconds: rateLimit.resetInSeconds
        }),
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
    
    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Initialize Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert the community member
    const { error: insertError } = await supabase
      .from('community_members')
      .insert(validation.sanitized);
    
    if (insertError) {
      console.error('Database insert error:', insertError.message);
      
      // Check for unique constraint violation (duplicate email)
      if (insertError.message.includes('duplicate') || insertError.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'This email is already registered with our community.' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to join community. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`New community member signup from ${clientIP.substring(0, 8)}...`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome to the community!',
        remainingAttempts: rateLimit.remainingAttempts
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Unexpected error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
