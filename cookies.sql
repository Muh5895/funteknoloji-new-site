-- SQL Schema to store cookies / cookie consent data in Supabase
-- Run this in the Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS public.cookies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    consent_necessary BOOLEAN DEFAULT TRUE NOT NULL,
    consent_analytics BOOLEAN DEFAULT FALSE NOT NULL,
    consent_marketing BOOLEAN DEFAULT FALSE NOT NULL,
    user_lang VARCHAR(10) NOT NULL,
    user_agent TEXT,
    ip_address VARCHAR(45), -- Supports IPv4 and IPv6
    referrer TEXT,
    screen_resolution VARCHAR(20),
    device_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) configuration
ALTER TABLE public.cookies ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so clients can save cookie selection without log in)
CREATE POLICY "Allow anonymous insert access"
ON public.cookies
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users or admin to read consent logs if necessary
CREATE POLICY "Allow authenticated read access"
ON public.cookies
FOR SELECT
TO authenticated
USING (true);

-- Comments to describe columns and purpose
COMMENT ON TABLE public.cookies IS 'Stores anonymous user cookie consents and basic analytics/metadata.';
COMMENT ON COLUMN public.cookies.consent_necessary IS 'Whether user accepted necessary cookies (always true).';
COMMENT ON COLUMN public.cookies.consent_analytics IS 'Whether user accepted analytics cookies.';
COMMENT ON COLUMN public.cookies.consent_marketing IS 'Whether user accepted marketing / targeting cookies.';
COMMENT ON COLUMN public.cookies.user_lang IS 'The language selected/browser language at consent time.';
COMMENT ON COLUMN public.cookies.user_agent IS 'Browser User-Agent for analytics.';
COMMENT ON COLUMN public.cookies.ip_address IS 'Anonymized or raw IP address of the user (where available).';
COMMENT ON COLUMN public.cookies.referrer IS 'Referrer URL from which the user arrived.';
COMMENT ON COLUMN public.cookies.screen_resolution IS 'User window/screen resolution (e.g. 1920x1080).';
COMMENT ON COLUMN public.cookies.device_type IS 'Inferred device type (mobile, tablet, desktop).';
