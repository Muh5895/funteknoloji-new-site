-- =========================================================================
-- ADVANCED COOKIE CONSENT & TELEMETRY SCHEMA FOR SUPABASE
-- Run this script in your Supabase SQL Editor to provision all cookie tables.
-- =========================================================================

-- -------------------------------------------------------------------------
-- TABLE 1: Legacy / Simple Consent Log (backward compatible)
-- -------------------------------------------------------------------------
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

-- RLS configuration for Legacy table
ALTER TABLE public.cookies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert access" ON public.cookies;
CREATE POLICY "Allow anonymous insert access"
ON public.cookies
FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read access" ON public.cookies;
CREATE POLICY "Allow authenticated read access"
ON public.cookies
FOR SELECT
TO authenticated
USING (true);

COMMENT ON TABLE public.cookies IS 'Stores simple anonymous user cookie consents and basic metadata.';


-- -------------------------------------------------------------------------
-- TABLE 2: Advanced Cookie Consents (Tracks latest state per session)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cookie_consents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL, -- Generated client-side to correlate events
    consent_necessary BOOLEAN DEFAULT TRUE NOT NULL,
    consent_analytics BOOLEAN DEFAULT FALSE NOT NULL,
    consent_marketing BOOLEAN DEFAULT FALSE NOT NULL,
    user_lang VARCHAR(10) NOT NULL,
    user_agent TEXT,
    ip_address VARCHAR(45),
    referrer TEXT,
    screen_resolution VARCHAR(20),
    device_type VARCHAR(50),
    country_code VARCHAR(10), -- Optional geo-location tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS configuration for cookie_consents
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert access to consents" ON public.cookie_consents;
CREATE POLICY "Allow anonymous insert access to consents"
ON public.cookie_consents
FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous update access to consents" ON public.cookie_consents;
CREATE POLICY "Allow anonymous update access to consents"
ON public.cookie_consents
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read access to consents" ON public.cookie_consents;
CREATE POLICY "Allow authenticated read access to consents"
ON public.cookie_consents
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS idx_cookie_consents_session ON public.cookie_consents(session_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_created ON public.cookie_consents(created_at);

COMMENT ON TABLE public.cookie_consents IS 'Stores the latest cookie consent state per session/user with full telemetry details.';


-- -------------------------------------------------------------------------
-- TABLE 3: Cookie Consent Events (Detailed Audit Log of User Actions)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cookie_consent_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- e.g., 'BANNER_SHOWN', 'ACCEPT_ALL', 'REJECT_ALL', 'CUSTOM_SAVE', 'BANNER_CLOSED'
    consent_necessary BOOLEAN NOT NULL,
    consent_analytics BOOLEAN NOT NULL,
    consent_marketing BOOLEAN NOT NULL,
    user_lang VARCHAR(10) NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    screen_resolution VARCHAR(20),
    device_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS configuration for cookie_consent_events
ALTER TABLE public.cookie_consent_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert access to events" ON public.cookie_consent_events;
CREATE POLICY "Allow anonymous insert access to events"
ON public.cookie_consent_events
FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read access to events" ON public.cookie_consent_events;
CREATE POLICY "Allow authenticated read access to events"
ON public.cookie_consent_events
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS idx_cookie_consent_events_session ON public.cookie_consent_events(session_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consent_events_type ON public.cookie_consent_events(event_type);
CREATE INDEX IF NOT EXISTS idx_cookie_consent_events_created ON public.cookie_consent_events(created_at);

COMMENT ON TABLE public.cookie_consent_events IS 'Audit log tracking every action a user performs on the cookie consent banner (clicks, views, edits).';
