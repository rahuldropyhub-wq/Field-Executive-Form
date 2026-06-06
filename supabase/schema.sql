-- Create Candidates Table
CREATE TABLE public.candidates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mobile_number TEXT UNIQUE NOT NULL,
    qualification TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    work_location TEXT NOT NULL,
    notice_period TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert candidates
CREATE POLICY "Allow anonymous users to insert candidates" 
    ON public.candidates FOR INSERT 
    WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to read all candidates
CREATE POLICY "Allow authenticated users to view candidates" 
    ON public.candidates FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update candidates
CREATE POLICY "Allow authenticated users to update candidates" 
    ON public.candidates FOR UPDATE 
    USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete candidates
CREATE POLICY "Allow authenticated users to delete candidates" 
    ON public.candidates FOR DELETE 
    USING (auth.role() = 'authenticated');

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run the function
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
