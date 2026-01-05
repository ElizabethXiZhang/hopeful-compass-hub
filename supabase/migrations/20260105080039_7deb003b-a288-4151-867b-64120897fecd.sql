-- Add CHECK constraints for server-side validation on community_members table
-- These enforce the same rules as the client-side Zod validation

ALTER TABLE community_members
  ADD CONSTRAINT check_name_length CHECK (name IS NULL OR length(name) <= 100),
  ADD CONSTRAINT check_gender_not_empty CHECK (length(gender) > 0),
  ADD CONSTRAINT check_age_range CHECK (age IS NULL OR (age >= 16 AND age <= 120)),
  ADD CONSTRAINT check_profession_length CHECK (profession IS NULL OR length(profession) <= 100),
  ADD CONSTRAINT check_years_range CHECK (years_of_service IS NULL OR (years_of_service >= 0 AND years_of_service <= 60)),
  ADD CONSTRAINT check_country_length CHECK (length(country) > 0 AND length(country) <= 100),
  ADD CONSTRAINT check_city_length CHECK (length(city) > 0 AND length(city) <= 100),
  ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT check_email_length CHECK (length(email) <= 255);