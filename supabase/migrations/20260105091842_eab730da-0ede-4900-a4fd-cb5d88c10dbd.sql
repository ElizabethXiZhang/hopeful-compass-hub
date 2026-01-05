-- Remove the public INSERT policy since submissions now go through the rate-limited edge function
-- The edge function uses the service role key which bypasses RLS

DROP POLICY IF EXISTS "Anyone can join the community" ON public.community_members;

-- Add a comment to document this security model
COMMENT ON TABLE public.community_members IS 'Community member signups. Direct inserts are blocked. All submissions must go through the community-signup edge function which enforces rate limiting.';
