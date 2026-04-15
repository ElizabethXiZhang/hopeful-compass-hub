CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  contact_type TEXT NOT NULL,
  message TEXT NOT NULL,
  website TEXT,
  company_name TEXT,
  project_idea TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for everyone" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
