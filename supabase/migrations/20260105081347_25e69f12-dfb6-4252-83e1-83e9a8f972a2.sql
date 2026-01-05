-- Create job_transition_news table for storing fetched news articles
CREATE TABLE public.job_transition_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  source TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraints for data integrity
ALTER TABLE public.job_transition_news
  ADD CONSTRAINT check_title_not_empty CHECK (length(title) > 0),
  ADD CONSTRAINT check_source_not_empty CHECK (length(source) > 0),
  ADD CONSTRAINT check_url_valid CHECK (url ~* '^https?://');

-- Enable Row Level Security
ALTER TABLE public.job_transition_news ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (news is public information)
CREATE POLICY "Anyone can view job transition news"
ON public.job_transition_news
FOR SELECT
USING (true);

-- Create index for faster date sorting
CREATE INDEX idx_job_transition_news_published_at ON public.job_transition_news(published_at DESC);

-- Enable pg_cron and pg_net extensions for scheduled fetching
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;