-- Supabase Schema for dkathel-portfolio (Updated)
-- Run this in the Supabase SQL Editor or via CLI
-- This version has relaxed constraints for easier data seeding

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- DROP EXISTING TABLES IF RE-RUNNING
-- =====================
DROP TABLE IF EXISTS self_hosted_apps CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- =====================
-- CERTIFICATIONS TABLE
-- =====================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  image TEXT NOT NULL,
  pdf_url TEXT,
  skills TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Other',
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certifications_active ON certifications(is_active);
CREATE INDEX idx_certifications_category ON certifications(category);

-- =====================
-- EXPERIENCES TABLE
-- =====================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  logo TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_experiences_active ON experiences(is_active);

-- =====================
-- COMPANIES TABLE
-- =====================
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  website TEXT,
  description TEXT,
  category TEXT DEFAULT 'Other',
  relationship TEXT DEFAULT 'partner',
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_active ON companies(is_active);
CREATE INDEX idx_companies_featured ON companies(featured);

-- =====================
-- BLOG_POSTS TABLE
-- =====================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES users(id),
  author_name TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

-- =====================
-- SKILLS TABLE
-- =====================
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  proficiency TEXT DEFAULT 'intermediate',
  description TEXT,
  icon TEXT,
  years_experience INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_active ON skills(is_active);

-- =====================
-- SELF_HOSTED_APPS TABLE
-- =====================
CREATE TABLE self_hosted_apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'other',
  url TEXT NOT NULL,
  icon TEXT,
  status TEXT DEFAULT 'active',
  is_public BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  last_checked TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_self_hosted_apps_status ON self_hosted_apps(status);

-- =====================
-- AUTO-UPDATE TIMESTAMP TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_self_hosted_apps_updated_at BEFORE UPDATE ON self_hosted_apps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE self_hosted_apps ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read for certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read for experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read for companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read for blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read for self hosted apps" ON self_hosted_apps FOR SELECT USING (true);
CREATE POLICY "Public read for users" ON users FOR SELECT USING (true);

-- Service role has full access
CREATE POLICY "Service role full access users" ON users FOR ALL USING (true);
CREATE POLICY "Service role full access certifications" ON certifications FOR ALL USING (true);
CREATE POLICY "Service role full access experiences" ON experiences FOR ALL USING (true);
CREATE POLICY "Service role full access companies" ON companies FOR ALL USING (true);
CREATE POLICY "Service role full access blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Service role full access skills" ON skills FOR ALL USING (true);
CREATE POLICY "Service role full access self_hosted_apps" ON self_hosted_apps FOR ALL USING (true);

-- Blog views increment function
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE blog_posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success notice
DO $$
BEGIN
    RAISE NOTICE 'Schema created successfully!';
END $$;
