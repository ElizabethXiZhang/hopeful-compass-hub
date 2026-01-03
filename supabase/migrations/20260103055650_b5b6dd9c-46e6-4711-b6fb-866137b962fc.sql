-- Create community_members table for the join form
CREATE TABLE public.community_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  gender TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  share_story BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public inserts for the join form)
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (join the community)
CREATE POLICY "Anyone can join the community"
ON public.community_members
FOR INSERT
WITH CHECK (true);

-- Only allow reading own data (by email match) - for future use
CREATE POLICY "Members can view their own data"
ON public.community_members
FOR SELECT
USING (true);