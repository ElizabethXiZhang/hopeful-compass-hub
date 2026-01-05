-- Create government_policies table for storing verified policy information
CREATE TABLE public.government_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  ai_summary TEXT,
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add check constraints for data integrity
ALTER TABLE public.government_policies
  ADD CONSTRAINT check_country_not_empty CHECK (length(country) > 0),
  ADD CONSTRAINT check_policy_type_valid CHECK (policy_type IN ('Financial Support', 'Reskilling / Education', 'Welfare / Social Safety Nets', 'AI & Automation Policies')),
  ADD CONSTRAINT check_title_not_empty CHECK (length(title) > 0),
  ADD CONSTRAINT check_source_url_valid CHECK (source_url ~* '^https?://');

-- Enable Row Level Security
ALTER TABLE public.government_policies ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (policies are public information)
CREATE POLICY "Anyone can view government policies"
ON public.government_policies
FOR SELECT
USING (true);

-- Create index for faster country filtering
CREATE INDEX idx_government_policies_country ON public.government_policies(country);
CREATE INDEX idx_government_policies_policy_type ON public.government_policies(policy_type);