-- ==============================================================================================
-- FUN TEKNOLOJİ - YAPAY ZEKA VERİTABANI ERİŞİMİ VE GÜVENLİK POLİTİKALARI (RLS)
-- ==============================================================================================
-- KURAL: Giriş yapan aktif kullanıcı sadece kendi verilerine erişebilir. Diğer e-postalara ve
-- hesaplara ait verilere müdahale kesinlikle engellenmiştir!
-- GÜNCELLEME: Tüm UUID ve TEXT eşleşme hatalarını (ERROR: 42883) önlemek için açık tür dönüşümleri
-- (::text cast) eklenmiştir. Bu sayede kolon türü uuid veya text olsa bile hatasız çalışır.
-- ==============================================================================================

-- 1. YENİ TABLO OLUŞTURMA: 'ai_support_feedback'
-- (Destek talebi açıldığında konu, önem seviyesi, açıklama, görüşme sonundaki puan ve yorumu kaydeder)
CREATE TABLE IF NOT EXISTS ai_support_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  importance TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  evaluation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. İlgili Tablolarda Row Level Security (RLS) Aktif Et
ALTER TABLE ai_support_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_presence_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE disaster_plans_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets_quakesafe ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;


-- 3. 'Ai Erişimi' RLS Güvenlik Politikalarını Tanımla
-- (Giriş yapılan kullanıcıların verilerini 'user_id' veya 'id' üzerinden ::text dönüşümüyle güvenle eşleştirir)

-- ai_support_feedback (user_id bulunuyor, sadece kendi verisini okuyabilir/yazabilir)
CREATE POLICY "Ai Erişimi" ON ai_support_feedback
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- active_sessions (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON active_sessions
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- audit_logs_quakesafe (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON audit_logs_quakesafe
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- city_presence_quakesafe (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON city_presence_quakesafe
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- contact (Giriş yapan kullanıcının doğrulanmış email adresi auth.users tablosundan çekilerek eşleştirilir)
CREATE POLICY "Ai Erişimi" ON contact
FOR ALL TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id::text = auth.uid()::text))
WITH CHECK (email = (SELECT email FROM auth.users WHERE id::text = auth.uid()::text));

-- developer_profiles (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON developer_profiles
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- device_approvals (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON device_approvals
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- disaster_plans_quakesafe (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON disaster_plans_quakesafe
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- feedback (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON feedback
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- login_requests (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON login_requests
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- notifications (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON notifications
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- orders (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON orders
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- profiles (sütun adı id'dir, user_id değil)
CREATE POLICY "Ai Erişimi" ON profiles
FOR ALL TO authenticated
USING (id::text = auth.uid()::text)
WITH CHECK (id::text = auth.uid()::text);

-- profiles_quakesafe (sütun adı id'dir, user_id değil)
CREATE POLICY "Ai Erişimi" ON profiles_quakesafe
FOR ALL TO authenticated
USING (id::text = auth.uid()::text)
WITH CHECK (id::text = auth.uid()::text);

-- security_logs (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON security_logs
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- support_tickets_quakesafe (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON support_tickets_quakesafe
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);

-- system_status (Yalnızca SELECT okuma yetkisi verilir, güncelleme ve silme kesinlikle engellenmiştir)
CREATE POLICY "Ai Erişimi" ON system_status
FOR SELECT TO authenticated
USING (true);

-- user_settings (user_id bulunuyor)
CREATE POLICY "Ai Erişimi" ON user_settings
FOR ALL TO authenticated
USING (user_id::text = auth.uid()::text)
WITH CHECK (user_id::text = auth.uid()::text);
