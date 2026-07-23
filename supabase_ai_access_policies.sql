-- ==============================================================================================
-- FUN TEKNOLOJİ - APİ/YAPAY ZEKA VERİTABANI AJANI ERİŞİM VE GÜVENLİK POLİTİKALARI (RLS)
-- ==============================================================================================
-- Açıklama: Aşağıdaki SQL kodları, yeni 'support_tickets_feedback' tablosunu oluşturur,
-- belirtilen tablolar üzerinde Row Level Security (RLS) özelliğini aktif eder ve
-- 'Ai Erişimi' adlı ALL (SELECT, INSERT, UPDATE, DELETE) izinlerini tanımlar.
-- Güvenlik Kuralı: Giriş yapan aktif kullanıcı sadece kendi 'user_id' veya 'id' değerine sahip
-- satırlara erişebilir. Diğer e-postalara ve hesaplara ait verilere müdahale kesinlikle engellenmiştir.
-- ==============================================================================================

-- 1. YENİ TABLO OLUŞTURMA: 'support_tickets_feedback'
-- (Destek talebi açınca verileri, puanı ve değerlendirmeleri kaydeder)
CREATE TABLE IF NOT EXISTS support_tickets_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  importance TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  evaluation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tablolarda Row Level Security (RLS) Özelliğini Aktif Et
ALTER TABLE support_tickets_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_panel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_presence_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookies ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE disaster_plans_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_check ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_login_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_blocks_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_recovery_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reports_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;


-- 3. 'Ai Erişimi' ALL (SELECT, INSERT, UPDATE, DELETE) RLS Politikalarını Tanımla
-- (Hesap kontrolü ve güvenlik süzgeci için kesinlikle 'user_id' veya anahtar alan 'id' kullanılır)

-- support_tickets_feedback
CREATE POLICY "Ai Erişimi" ON support_tickets_feedback
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- active_sessions
CREATE POLICY "Ai Erişimi" ON active_sessions
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- admin_panel_logs
CREATE POLICY "Ai Erişimi" ON admin_panel_logs
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- audit_logs_quakesafe
CREATE POLICY "Ai Erişimi" ON audit_logs_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- city_presence_quakesafe
CREATE POLICY "Ai Erişimi" ON city_presence_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- contact
CREATE POLICY "Ai Erişimi" ON contact
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- cookies
CREATE POLICY "Ai Erişimi" ON cookies
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- developer_profiles
CREATE POLICY "Ai Erişimi" ON developer_profiles
FOR ALL TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- device_approvals
CREATE POLICY "Ai Erişimi" ON device_approvals
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- disaster_plans_quakesafe
CREATE POLICY "Ai Erişimi" ON disaster_plans_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- family_groups
CREATE POLICY "Ai Erişimi" ON family_groups
FOR ALL TO authenticated
USING (created_by = auth.uid() OR id = auth.uid())
WITH CHECK (created_by = auth.uid() OR id = auth.uid());

-- family_invites
CREATE POLICY "Ai Erişimi" ON family_invites
FOR ALL TO authenticated
USING (invited_by = auth.uid())
WITH CHECK (invited_by = auth.uid());

-- family_members
CREATE POLICY "Ai Erişimi" ON family_members
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- feedback
CREATE POLICY "Ai Erişimi" ON feedback
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- health_check
CREATE POLICY "Ai Erişimi" ON health_check
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- login_requests
CREATE POLICY "Ai Erişimi" ON login_requests
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- notifications
CREATE POLICY "Ai Erişimi" ON notifications
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- orders
CREATE POLICY "Ai Erişimi" ON orders
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- payments
CREATE POLICY "Ai Erişimi" ON payments
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- profiles
CREATE POLICY "Ai Erişimi" ON profiles
FOR ALL TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- profiles_quakesafe
CREATE POLICY "Ai Erişimi" ON profiles_quakesafe
FOR ALL TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- qr_login_sessions
CREATE POLICY "Ai Erişimi" ON qr_login_sessions
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- security_logs
CREATE POLICY "Ai Erişimi" ON security_logs
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- support_tickets_quakesafe
CREATE POLICY "Ai Erişimi" ON support_tickets_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- system_status
CREATE POLICY "Ai Erişimi" ON system_status
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- user_blocks_quakesafe
CREATE POLICY "Ai Erişimi" ON user_blocks_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- user_recovery_codes
CREATE POLICY "Ai Erişimi" ON user_recovery_codes
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- user_reports_quakesafe
CREATE POLICY "Ai Erişimi" ON user_reports_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- user_settings
CREATE POLICY "Ai Erişimi" ON user_settings
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- waitlist
CREATE POLICY "Ai Erişimi" ON waitlist
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
