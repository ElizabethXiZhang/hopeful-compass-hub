-- Add session token columns for forum identity verification
ALTER TABLE public.community_members 
ADD COLUMN session_token UUID DEFAULT NULL,
ADD COLUMN session_token_expires_at TIMESTAMPTZ DEFAULT NULL;

-- Revoke SELECT on author_email from anon and authenticated roles to prevent email harvesting
REVOKE SELECT (author_email) ON public.forum_topics FROM anon, authenticated;
REVOKE SELECT (author_email) ON public.forum_replies FROM anon, authenticated;