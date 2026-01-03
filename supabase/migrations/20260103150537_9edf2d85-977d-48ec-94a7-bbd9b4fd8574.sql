-- Add new columns to community_members table
ALTER TABLE public.community_members 
ADD COLUMN age integer,
ADD COLUMN profession text,
ADD COLUMN years_of_service integer;