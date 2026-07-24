-- ==============================================================================================
-- FUN TEKNOLOJİ - YENİ YAPAY ZEKA DESTEK VE GÖRÜŞME GEÇMİŞİ VERİTABANI KURULUMU (SQL & RLS)
-- ==============================================================================================
-- GÜVENLİK KURALI: Giriş yapmış aktif kullanıcılar sadece kendi oluşturdukları verilere erişebilir.
-- Sadece kendi yazdıklarını okuyabilir ve yeni kayıt ekleyebilirler.
-- ==============================================================================================

-- 1. DESTEK DEĞERLENDİRME TABLOSU (ai_support_feedback)
-- Canlı destek görüşmesi bittiğinde kullanıcının verdiği puan, yorum ve ilgili bilet bilgilerini saklar.
CREATE TABLE IF NOT EXISTS ai_support_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  importance TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  evaluation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Satır Seviyesi Güvenlik) Aktif Etme
ALTER TABLE ai_support_feedback ENABLE ROW LEVEL SECURITY;

-- ai_support_feedback RLS Politikası: Sadece oturum açmış kullanıcılar kendi kayıtlarını ekleyebilir ve okuyabilir
CREATE POLICY "ai_support_feedback_owner_policy" ON ai_support_feedback
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());


-- 2. GEÇMİŞ DESTEK TALEPLERİ TABLOSU (past_support_tickets)
-- Kullanıcının tamamladığı canlı destek taleplerini ve tüm konuşma geçmişini (mesajları) kaydeder.
CREATE TABLE IF NOT EXISTS past_support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  importance TEXT NOT NULL,
  description TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Satır Seviyesi Güvenlik) Aktif Etme
ALTER TABLE past_support_tickets ENABLE ROW LEVEL SECURITY;

-- past_support_tickets RLS Politikası: Sadece oturum açmış kullanıcılar kendi biletlerini ekleyebilir ve okuyabilir
CREATE POLICY "past_support_tickets_owner_policy" ON past_support_tickets
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
