import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords focused on layoffs and job cuts - neutral tone, not alarmist
const NEWS_KEYWORDS = [
  "layoffs",
  "job cuts",
  "mass layoffs",
  "workforce reduction",
  "furloughs",
  "redundancy",
];

// Keywords to exclude from results (hopeful/retraining news)
const EXCLUDE_KEYWORDS = [
  "hiring",
  "new jobs",
  "reskilling",
  "training program",
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!NEWS_API_KEY) {
      console.error('NEWS_API_KEY is not configured');
      throw new Error('NEWS_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase credentials not configured');
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('Starting news fetch...');

    // Build search query from keywords
    const searchQuery = NEWS_KEYWORDS.slice(0, 3).join(' OR ');
    
    // Fetch news from NewsAPI
    const newsUrl = new URL('https://newsapi.org/v2/everything');
    newsUrl.searchParams.set('q', searchQuery);
    newsUrl.searchParams.set('language', 'en');
    newsUrl.searchParams.set('sortBy', 'publishedAt');
    newsUrl.searchParams.set('pageSize', '20');
    newsUrl.searchParams.set('apiKey', NEWS_API_KEY);

    console.log(`Fetching news with query: ${searchQuery}`);

    const newsResponse = await fetch(newsUrl.toString());
    
    if (!newsResponse.ok) {
      const errorText = await newsResponse.text();
      console.error('NewsAPI error:', newsResponse.status, errorText);
      throw new Error(`NewsAPI error: ${newsResponse.status}`);
    }

    const newsData = await newsResponse.json();
    
    if (newsData.status !== 'ok') {
      console.error('NewsAPI returned error status:', newsData);
      throw new Error(`NewsAPI error: ${newsData.message || 'Unknown error'}`);
    }

    console.log(`Fetched ${newsData.articles?.length || 0} articles`);

    // Filter and prepare articles for insertion
    // Exclude hopeful/retraining news to keep focus on job cuts
    const articles = (newsData.articles || [])
      .filter((article: any) => {
        if (!article.title || !article.url || !article.source?.name || !article.publishedAt) {
          return false;
        }
        if (article.title.includes('[Removed]')) {
          return false;
        }
        // Exclude articles with hopeful/retraining keywords
        const titleLower = article.title.toLowerCase();
        const descLower = (article.description || '').toLowerCase();
        const hasExcludedKeyword = EXCLUDE_KEYWORDS.some(keyword => 
          titleLower.includes(keyword.toLowerCase()) || 
          descLower.includes(keyword.toLowerCase())
        );
        return !hasExcludedKeyword;
      })
      .map((article: any) => ({
        title: article.title.slice(0, 500),
        description: article.description?.slice(0, 1000) || null,
        source: article.source.name,
        url: article.url,
        published_at: article.publishedAt,
      }));

    if (articles.length === 0) {
      console.log('No valid articles to insert');
      return new Response(
        JSON.stringify({ message: 'No new articles found', count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Upsert articles (using URL as unique constraint to avoid duplicates)
    const { data, error } = await supabase
      .from('job_transition_news')
      .upsert(articles, { 
        onConflict: 'url',
        ignoreDuplicates: true 
      })
      .select();

    if (error) {
      console.error('Error inserting articles:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    const insertedCount = data?.length || 0;
    console.log(`Successfully inserted/updated ${insertedCount} articles`);

    // Clean up old articles (keep only last 100)
    const { error: cleanupError } = await supabase
      .from('job_transition_news')
      .delete()
      .lt('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (cleanupError) {
      console.warn('Error cleaning up old articles:', cleanupError);
    }

    return new Response(
      JSON.stringify({ 
        message: 'News fetch completed', 
        count: insertedCount,
        totalFetched: articles.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
