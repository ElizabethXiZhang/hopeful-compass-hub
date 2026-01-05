-- Fix community_members RLS policies to protect personal data

-- Drop the overly permissive SELECT policy that exposes all personal data
DROP POLICY IF EXISTS "Members can view their own data" ON public.community_members;

-- Create a restrictive policy - no public read access to personal data
-- Only service role (admin) can read member data for aggregate statistics
-- This protects emails, names, and other PII from public exposure
CREATE POLICY "No public read access to personal data"
ON public.community_members
FOR SELECT
USING (false);

-- Note: The INSERT policy "Anyone can join the community" is kept intentionally
-- as the form is designed for anonymous community signups.
-- Rate limiting should be implemented at the application/edge function level if needed.