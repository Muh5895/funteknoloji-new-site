-- ==============================================================================================
-- FUN TEKNOLOJİ - APİ/YAPAY ZEKA ERİŞİMİ GÜVENLİK POLİTİKALARI (ROW LEVEL SECURITY - RLS)
-- ==============================================================================================
-- Açıklama: Aşağıdaki SQL kodları, belirtilen 33 tablonun tamamında Row Level Security (RLS)
-- özelliğini aktif eder ve "Ai Erişimi" adı altında SELECT, INSERT, UPDATE, DELETE izinlerini tanımlar.
-- Güvenlik Kuralı: Sadece aktif oturumdaki authenticated kullanıcı (auth.uid()) kendi satırlarına
-- erişebilir. Başka e-postalara/kullanıcılara ait verilere kesinlikle işlem yapılamaz!
-- ==============================================================================================

-- 1. Tablolarda Row Level Security (RLS) Özelliğini Aktif Et
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_panel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_messages_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_chat_messages_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_presence_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookies ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE disaster_plans_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_messages_quakesafe ENABLE ROW LEVEL SECURITY;
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


-- 2. Her bir Tablo İçin "Ai Erişimi" ALL (SELECT, INSERT, UPDATE, DELETE) Politikalarını Oluştur
-- Not: Tablolarda kullanıcı ilişkisini temsil eden sütun ismine göre auth.uid() doğrulaması yapılır.

-- 1. active_sessions
CREATE POLICY "Ai Erişimi" ON active_sessions
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 2. admin_panel_logs
CREATE POLICY "Ai Erişimi" ON admin_panel_logs
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 3. ai_chat_messages_quakesafe
CREATE POLICY "Ai Erişimi" ON ai_chat_messages_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 4. audit_logs_quakesafe
CREATE POLICY "Ai Erişimi" ON audit_logs_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 5. blog (Yazarlar kendi yazılarını yönetebilir)
CREATE POLICY "Ai Erişimi" ON blog
FOR ALL TO authenticated
USING (author_id = auth.uid() OR created_by = auth.uid())
WITH CHECK (author_id = auth.uid() OR created_by = auth.uid());

-- 6. city_chat_messages_quakesafe
CREATE POLICY "Ai Erişimi" ON city_chat_messages_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 7. city_presence_quakesafe
CREATE POLICY "Ai Erişimi" ON city_presence_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 8. contact
CREATE POLICY "Ai Erişimi" ON contact
FOR ALL TO authenticated
USING (user_id = auth.uid() OR email = auth.jwt()->>'email')
WITH CHECK (user_id = auth.uid() OR email = auth.jwt()->>'email');

-- 9. cookies
CREATE POLICY "Ai Erişimi" ON cookies
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 10. developer_profiles
CREATE POLICY "Ai Erişimi" ON developer_profiles
FOR ALL TO authenticated
USING (id = auth.uid() OR user_id = auth.uid())
WITH CHECK (id = auth.uid() OR user_id = auth.uid());

-- 11. device_approvals
CREATE POLICY "Ai Erişimi" ON device_approvals
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 12. disaster_plans_quakesafe
CREATE POLICY "Ai Erişimi" ON disaster_plans_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 13. family_groups
CREATE POLICY "Ai Erişimi" ON family_groups
FOR ALL TO authenticated
USING (created_by = auth.uid() OR id = auth.uid())
WITH CHECK (created_by = auth.uid() OR id = auth.uid());

-- 14. family_invites
CREATE POLICY "Ai Erişimi" ON family_invites
FOR ALL TO authenticated
USING (invited_by = auth.uid() OR email = auth.jwt()->>'email')
WITH CHECK (invited_by = auth.uid() OR email = auth.jwt()->>'email');

-- 15. family_members
CREATE POLICY "Ai Erişimi" ON family_members
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 16. family_messages_quakesafe
CREATE POLICY "Ai Erişimi" ON family_messages_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 17. feedback
CREATE POLICY "Ai Erişimi" ON feedback
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 18. health_check
CREATE POLICY "Ai Erişimi" ON health_check
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 19. login_requests
CREATE POLICY "Ai Erişimi" ON login_requests
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 20. notifications
CREATE POLICY "Ai Erişimi" ON notifications
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 21. orders
CREATE POLICY "Ai Erişimi" ON orders
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 22. payments
CREATE POLICY "Ai Erişimi" ON payments
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 23. profiles
CREATE POLICY "Ai Erişimi" ON profiles
FOR ALL TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 24. profiles_quakesafe
CREATE POLICY "Ai Erişimi" ON profiles_quakesafe
FOR ALL TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 25. qr_login_sessions
CREATE POLICY "Ai Erişimi" ON qr_login_sessions
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 26. security_logs
CREATE POLICY "Ai Erişimi" ON security_logs
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 27. support_tickets_quakesafe
CREATE POLICY "Ai Erişimi" ON support_tickets_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 28. system_status
CREATE POLICY "Ai Erişimi" ON system_status
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 29. user_blocks_quakesafe
CREATE POLICY "Ai Erişimi" ON user_blocks_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 30. user_recovery_codes
CREATE POLICY "Ai Erişimi" ON user_recovery_codes
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 31. user_reports_quakesafe
CREATE POLICY "Ai Erişimi" ON user_reports_quakesafe
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 32. user_settings
CREATE POLICY "Ai Erişimi" ON user_settings
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 33. waitlist
CREATE POLICY "Ai Erişimi" ON waitlist
FOR ALL TO authenticated
USING (user_id = auth.uid() OR email = auth.jwt()->>'email')
WITH CHECK (user_id = auth.uid() OR email = auth.jwt()->>'email');
