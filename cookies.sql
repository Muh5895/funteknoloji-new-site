-- =========================================================================
-- SIMPLIFIED AND EXTENDED SINGLE COOKIE TELEMETRY SCHEMA FOR SUPABASE
-- Run this script in your Supabase SQL Editor.
-- =========================================================================

-- Ensure only a single table exists as requested
DROP TABLE IF EXISTS public.cookie_consent_events CASCADE;
DROP TABLE IF EXISTS public.cookie_consents CASCADE;
DROP TABLE IF EXISTS public.cookies CASCADE;

CREATE TABLE public.cookies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    consent_necessary BOOLEAN DEFAULT TRUE NOT NULL,
    consent_analytics BOOLEAN DEFAULT FALSE NOT NULL,
    consent_marketing BOOLEAN DEFAULT FALSE NOT NULL,
    user_lang VARCHAR(10) NOT NULL,

    -- Precise OS and Browser Information parsed from User-Agent
    os_name VARCHAR(100),
    os_version VARCHAR(50),
    browser_name VARCHAR(100),
    browser_version VARCHAR(50),
    raw_user_agent TEXT,

    -- True Network Telemetry and IP address
    ip_address VARCHAR(45), -- Supports IPv4 and IPv6
    referrer TEXT,

    -- High-accuracy screen resolution and scaling details
    screen_resolution VARCHAR(50), -- e.g., "1920x1080 (DPR: 2, Viewport: 1200x800)"
    device_type VARCHAR(50), -- desktop, mobile, tablet

    -- Network performance / connection stats
    network_effective_type VARCHAR(20), -- e.g., "4g", "3g"
    network_downlink NUMERIC, -- Downlink speed in Mbps
    network_rtt INT, -- Round-trip time in ms
    network_latency_ms INT, -- Client-measured request/ping latency to API

    -- Error and diagnostic log telemetry (Console errors)
    console_errors TEXT, -- Saved JSON or text of captured runtime errors / warnings

    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) configuration
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

-- Indexes for lightning fast lookups and analytics
CREATE INDEX IF NOT EXISTS idx_cookies_created_at ON public.cookies(created_at);
CREATE INDEX IF NOT EXISTS idx_cookies_os_browser ON public.cookies(os_name, browser_name);

-- Comments to describe columns and purpose
COMMENT ON TABLE public.cookies IS 'Unified table for storing anonymous cookie consents, accurate client system specs, connection stats, and error diagnostics.';
