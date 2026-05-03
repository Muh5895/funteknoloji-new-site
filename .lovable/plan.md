
# Fun Teknoloji Web Sitesi

Yüklenen HTML dosyasındaki tasarımı TanStack Start projesine birebir aktarıyoruz. Ana sayfa tamamen oluşturulacak, ardından 4 ek sayfa (Hakkımızda, Hizmetler, İletişim, Fiyatlandırma) aynı tasarım dilinde eklenecek.

## Yapılacaklar

### 1. Tasarım Sistemi ve Font Kurulumu
- Inter Tight fontunu Google Fonts'tan ekle
- Orijinal sitedeki renk paletini (bg-background-12, text-secondary, stroke-1, ns-green vb.) Tailwind CSS değişkenlerine aktar
- Badge, buton stilleri (btn-secondary-v2, btn-primary-v2, btn-gray-v2 vb.) ve tipografi sınıfları (text-heading-1 ~ 6, text-tagline-1 ~ 3) oluştur

### 2. Ortak Bileşenler
- **Header**: Floating navbar (rounded, backdrop-blur), logo, navigasyon linkleri (Şirket, Platform, Kaynaklar dropdown menüleri), mobil hamburger menü, "Giriş Yap" / "Başlayın" butonları
- **Footer**: Logo, açıklama, sosyal medya ikonları (Facebook, Instagram, YouTube, LinkedIn), 3 sütunlu link listesi (Şirket, Platform, Kaynaklar), alt bilgi ve telif hakkı
- **Animated Button**: Ok animasyonlu buton bileşeni (hover'da ok kayma efekti)

### 3. Ana Sayfa (index.tsx) - Tam İçerik
Orijinal HTML'deki tüm bölümler:
- **Hero**: Büyük başlık "Geleceğin Teknolojileri Bugün Bizimle", alt metin, "Keşfet" ve "Başlayın" butonları, hero görseli
- **Logo Marquee**: Müşteri logoları kayar bant
- **What We Do**: Koyu arka planlı büyük tipografi bölümü
- **Features**: 3 özellik kartı (ses kopyalama, seslendirme, dosya tamamlama) görsellerle
- **How It Works**: 3 adımlı süreç kartları (yeşil/gri arka plan)
- **Services**: 8 hizmet kartı (grid düzeni, görselli)
- **Case Study**: 3 proje vitrin alanı (hover overlay efekti)
- **Testimonials**: 6 müşteri yorumu kartı (yıldız puanı, avatar, X ikonu)
- **FAQ**: Accordion (5 soru-cevap)
- **CTA**: İndirme çağrısı bölümü (App Store / Google Play butonları)

### 4. Hakkımızda Sayfası (about.tsx)
- Hero: "Fun Teknoloji Hakkında" başlığı, şirket tanıtım metni
- Misyon ve Vizyon bölümleri
- Rakamlarla biz (kuruluş yılı, müşteri sayısı, proje sayısı, ekip üyesi)
- Değerlerimiz grid kartları
- CTA bölümü

### 5. Hizmetler Sayfası (services.tsx)
- Hero: "Hizmetlerimiz" başlığı
- Ana sayfadaki 8 hizmet kartının genişletilmiş versiyonu
- Her hizmet için detaylı açıklama
- CTA bölümü

### 6. İletişim Sayfası (contact.tsx)
- İletişim formu (isim, e-posta, konu, mesaj)
- İletişim bilgileri (adres, telefon, e-posta)
- Sosyal medya linkleri
- Harita alanı (placeholder)

### 7. Fiyatlandırma Sayfası (pricing.tsx)
- Aylık/Yıllık geçiş toggle
- 3 plan kartı (Başlangıç, Profesyonel, Kurumsal)
- Özellik karşılaştırma tablosu
- FAQ bölümü
- CTA bölümü

### 8. Root Layout Güncelleme
- `__root.tsx`'e Header ve Footer bileşenlerini ekle
- Türkçe dil ayarı (`lang="tr"`)
- SEO meta etiketleri (Fun Teknoloji branding)

## Teknik Detaylar
- Görseller: Orijinal sitedeki görseller için placeholder kullanılacak (Unsplash veya benzer ücretsiz kaynaklar)
- Animasyonlar: CSS transition/animation ile temel hover efektleri (karmaşık GSAP animasyonları basitleştirilecek)
- Responsive: Tüm sayfalar mobil uyumlu (orijinal breakpoint'ler korunacak)
- Mega menü: CSS hover ile açılan dropdown menüler
