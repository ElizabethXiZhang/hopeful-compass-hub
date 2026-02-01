-- Create forum_topics table
CREATE TABLE public.forum_topics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum_replies table
CREATE TABLE public.forum_replies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID NOT NULL REFERENCES public.forum_topics(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- RLS policies for forum_topics - anyone can read, community members can write
CREATE POLICY "Anyone can view forum topics" 
ON public.forum_topics 
FOR SELECT 
USING (true);

CREATE POLICY "Community members can create topics" 
ON public.forum_topics 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.community_members 
        WHERE email = author_email
    )
);

CREATE POLICY "Authors can update their own topics" 
ON public.forum_topics 
FOR UPDATE 
USING (author_email = author_email);

-- RLS policies for forum_replies - anyone can read, community members can write
CREATE POLICY "Anyone can view forum replies" 
ON public.forum_replies 
FOR SELECT 
USING (true);

CREATE POLICY "Community members can create replies" 
ON public.forum_replies 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.community_members 
        WHERE email = author_email
    )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_forum_topic_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_forum_topics_updated_at
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW
EXECUTE FUNCTION public.update_forum_topic_timestamp();