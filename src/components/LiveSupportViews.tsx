import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ArrowLeft, Send, MessageSquare, LogOut, Eye, EyeOff, Bot, Languages, Image as ImageIcon, AlertCircle, Download, Copy, Volume2, VolumeX, Star, Paperclip, FileText, Search as SearchIcon, Maximize2, Minimize2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { translateText, translateAnyText } from "../lib/translate";
import { KNOWLEDGE_BASE } from "../lib/knowledge";

const translateTextHelper = async (text: string, source: string, target: string): Promise<string> => {
  if (!text || source === target) return text;
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    let result = data[0].map((item: any) => item[0]).join("");
    result = result.replace(/Eğlence Kimliği/gi, "FunID");
    result = result.replace(/Eğlence kimliği/gi, "FunID");
    return result;
  } catch (error) {
    console.error("Translation helper error:", error);
    return text;
  }
};

const translateTextWithCodeBlocks = async (text: string, source: string, target: string): Promise<string> => {
  if (!text || source === target) return text;

  const parts = text.split(/(```[\s\S]*?```)/g);
  const translatedParts = [];

  for (const part of parts) {
    if (part.startsWith("```")) {
      translatedParts.push(part);
    } else {
      const translated = await translateTextHelper(part, source, target);
      translatedParts.push(translated);
    }
  }

  return translatedParts.join("");
};

const cleanLeadingDashes = (text: string): string => {
  if (!text) return text;
  let lines = text.split("\n");
  const isMultiItemList = lines.filter(l => l.trim().startsWith("-")).length > 1;
  if (!isMultiItemList) {
    lines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") && !trimmed.startsWith("- -")) {
        return trimmed.substring(2);
      }
      if (trimmed.startsWith("-") && !trimmed.startsWith("--") && !trimmed.match(/^-[0-9]/)) {
        return trimmed.substring(1);
      }
      return line;
    });
  }
  return lines.join("\n").trim();
};

export interface AttachedFile {
  name: string;
  type: string;
  size: string;
  base64: string;
  thumbnail?: string;
  extractedText?: string;
  isAnalyzing?: boolean;
}

const generateThumbnail = (base64Str: string, maxWidth = 150, maxHeight = 150): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !base64Str || !base64Str.startsWith("data:image/")) {
      resolve("");
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      } else {
        resolve("");
      }
    };
    img.onerror = () => {
      resolve("");
    };
  });
};

// Translate utility to translate from any language to Turkish
const translateToTurkish = async (text: string, sourceLang: string): Promise<string> => {
  if (!text || sourceLang === "tr") return text;
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=tr&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0].map((item: any) => item[0]).join("");
  } catch (error) {
    console.error("Translation to Turkish error:", error);
    return text;
  }
};

// 12-language localized dictionary for the Live Support views (Fully intact)
const localTrans: Record<string, any> = {
  tr: {
    loginTitle: "Nexy Desteğe Giriş Yap",
    loginDesc: "Devam etmek için oturum açın",
    email: "E-posta",
    password: "Şifre",
    loginBtn: "Giriş Yap",
    loggingIn: "Giriş Yapılıyor...",
    fillFields: "Lütfen tüm alanları doldurun.",
    validEmail: "Geçerli bir e-posta girin.",
    loginSuccess: "Giriş başarılı!",
    detailsTitle: "Destek Talebi Oluştur",
    detailsDesc: "Sohbete başlamadan önce detayları girin",
    subject: "Konu",
    subjectPlaceholder: "Örn: Ödeme Sorunu, Teknik Hata",
    importance: "Önem Seviyesi",
    importanceLow: "Düşük",
    importanceMedium: "Orta",
    importanceHigh: "Yüksek",
    importanceCritical: "Kritik",
    description: "Açıklama",
    descriptionPlaceholder: "Lütfen sorununuzu detaylıca açıklayın...",
    startChat: "Sohbeti Başlat",
    translationWarning: "Mesajlar otomatik olarak çevrilmektedir ve hatalı olabilir.",
    imageLimitError: "En fazla 5 adet resim yükleyebilirsiniz.",
    archivedWarning: "Bu sohbet sonlandırılmıştır. Yeni mesaj gönderilemez.",
    online: "Çevrimiçi",
    onlineAgent: "Destek Temsilcisi",
    typeMessage: "Mesajınızı yazın...",
    logout: "Oturumu Kapat",
    errorInvalidCredentials: "Hatalı giriş bilgileri. Lütfen e-posta ve şifrenizi kontrol edin.",
    errorEmailNotConfirmed: "E-posta adresi henüz doğrulanmamış.",
    errorUserNotFound: "Kullanıcı bulunamadı.",
    errorNetwork: "Bağlantı hatası oluştu. Lütfen internetinizi kontrol edin.",
    errorGeneric: "Giriş hatası oluştu.",
    confirmCloseTitle: "Görüşmeyi Sonlandır",
    confirmCloseDesc: "Mevcut canlı destek görüşmesini sonlandırmak istediğinize emin misiniz?",
    confirmCloseYes: "Evet, Sonlandır",
    confirmCloseNo: "İptal",
    searchPlaceholder: "Mesajlarda ara...",
  },
  en: {
    loginTitle: "Login to Live Support",
    loginDesc: "Sign in to continue",
    email: "Email",
    password: "Password",
    loginBtn: "Sign In",
    loggingIn: "Signing In...",
    fillFields: "Please fill in all fields.",
    validEmail: "Enter a valid email address.",
    loginSuccess: "Login successful!",
    detailsTitle: "Create Support Ticket",
    detailsDesc: "Enter details before starting the chat",
    subject: "Subject",
    subjectPlaceholder: "e.g., Payment Issue, Technical Bug",
    importance: "Importance Level",
    importanceLow: "Low",
    importanceMedium: "Medium",
    importanceHigh: "High",
    importanceCritical: "Critical",
    description: "Description",
    descriptionPlaceholder: "Please describe your issue in detail...",
    startChat: "Start Chat",
    translationWarning: "Messages are automatically translated and may contain errors.",
    imageLimitError: "You can upload a maximum of 5 images.",
    archivedWarning: "This chat has ended. New messages cannot be sent.",
    online: "Online",
    onlineAgent: "Support Agent",
    typeMessage: "Type your message...",
    logout: "Logout",
    errorInvalidCredentials: "Invalid login credentials. Please check your email and password.",
    errorEmailNotConfirmed: "Email address has not been verified yet.",
    errorUserNotFound: "User not found.",
    errorNetwork: "Network error occurred. Please check your internet connection.",
    errorGeneric: "An error occurred during login.",
    confirmCloseTitle: "End Support Session",
    confirmCloseDesc: "Are you sure you want to end this live support session?",
    confirmCloseYes: "Yes, End",
    confirmCloseNo: "Cancel",
    searchPlaceholder: "Search messages...",
  },
  de: {
    loginTitle: "Anmeldung zum Live-Support",
    loginDesc: "Melden Sie sich an, um fortzufahren",
    email: "E-Mail",
    password: "Kennwort",
    loginBtn: "Anmelden",
    loggingIn: "Anmeldung...",
    fillFields: "Bitte füllen Sie alle Felder aus.",
    validEmail: "Geben Sie eine gültige E-Mail-Adresse ein.",
    loginSuccess: "Anmeldung erfolgreich!",
    detailsTitle: "Support-Ticket erstellen",
    detailsDesc: "Geben Sie Details ein, bevor Sie den Chat starten",
    subject: "Betreff",
    subjectPlaceholder: "z.B. Zahlungsproblem, technischer Fehler",
    importance: "Dringlichkeit",
    importanceLow: "Niedrig",
    importanceMedium: "Mittel",
    importanceHigh: "Hoch",
    importanceCritical: "Kritisch",
    description: "Beschreibung",
    descriptionPlaceholder: "Bitte beschreiben Sie Ihr Problem im Detail...",
    startChat: "Chat starten",
    translationWarning: "Nachrichten werden automatisch übersetzt und können Fehler enthalten.",
    imageLimitError: "Sie können maximal 5 Bilder hochladen.",
    archivedWarning: "Dieser Chat wurde beendet. Neue Nachrichten können nicht gesendet werden.",
    online: "Online",
    onlineAgent: "Support-Mitarbeiter",
    typeMessage: "Schreiben Sie Ihre Nachricht...",
    logout: "Abmelden",
    errorInvalidCredentials: "Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.",
    errorEmailNotConfirmed: "E-Mail-Adresse wurde noch nicht bestätigt.",
    errorUserNotFound: "Benutzer nicht gefunden.",
    errorNetwork: "Netzwerkfehler aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung.",
    errorGeneric: "Ein Fehler ist bei der Anmeldung aufgetreten.",
    confirmCloseTitle: "Sitzung beenden",
    confirmCloseDesc: "Möchten Sie diese Live-Support-Sitzung wirklich beenden?",
    confirmCloseYes: "Ja, beenden",
    confirmCloseNo: "Abbrechen",
    searchPlaceholder: "Nachrichten durchsuchen...",
  },
  fr: {
    loginTitle: "Connexion au support en direct",
    loginDesc: "Connectez-vous pour continuer",
    email: "E-mail",
    password: "Mot de passe",
    loginBtn: "Se connecter",
    loggingIn: "Connexion...",
    fillFields: "Veuillez remplir tous les champs.",
    validEmail: "Entrez une adresse e-mail valide.",
    loginSuccess: "Connexion réussie !",
    detailsTitle: "Créer un ticket de support",
    detailsDesc: "Entrez les détails avant de commencer le chat",
    subject: "Sujet",
    subjectPlaceholder: "ex : Problème de paiement, bogue technique",
    importance: "Niveau d'importance",
    importanceLow: "Faible",
    importanceMedium: "Moyen",
    importanceHigh: "Élevé",
    importanceCritical: "Critique",
    description: "Description",
    descriptionPlaceholder: "Veuillez décrire votre problème en détail...",
    startChat: "Démarrer le chat",
    translationWarning: "Les messages sont traduits automatiquement et peuvent contenir des erreurs.",
    imageLimitError: "Vous pouvez télécharger un maximum de 5 images.",
    archivedWarning: "Ce chat est terminé. Impossible d'envoyer de nouveaux messages.",
    online: "En ligne",
    onlineAgent: "Agent de support",
    typeMessage: "Tapez votre message...",
    logout: "Se déconnecter",
    errorInvalidCredentials: "Identifiants de connexion invalides. Veuillez vérifier votre e-mail et mot de passe.",
    errorEmailNotConfirmed: "L'adresse e-mail n'a pas encore été vérifiée.",
    errorUserNotFound: "Utilisateur non trouvé.",
    errorNetwork: "Une erreur réseau est survenue. Veuillez vérifier votre connexion Internet.",
    errorGeneric: "Une erreur est survenue lors de la connexion.",
    confirmCloseTitle: "Terminer la session",
    confirmCloseDesc: "Êtes-vous sûr de vouloir terminer cette session de support en direct ?",
    confirmCloseYes: "Oui, terminer",
    confirmCloseNo: "Annuler",
    searchPlaceholder: "Rechercher des messages...",
  },
  es: {
    loginTitle: "Iniciar sesión en Soporte en Vivo",
    loginDesc: "Inicie sesión para continuar",
    email: "E-mail",
    password: "Contraseña",
    loginBtn: "Iniciar sesión",
    loggingIn: "Iniciando sesión...",
    fillFields: "Por favor complete todos los campos.",
    validEmail: "Ingrese un correo electrónico válido.",
    loginSuccess: "¡Inicio de sesión exitoso!",
    detailsTitle: "Crear ticket de soporte",
    detailsDesc: "Ingrese los detalles antes de comenzar el chat",
    subject: "Asunto",
    subjectPlaceholder: "ej: Problema de pago, error técnico",
    importance: "Nivel de importancia",
    importanceLow: "Bajo",
    importanceMedium: "Medio",
    importanceHigh: "Alto",
    importanceCritical: "Crítico",
    description: "Descripción",
    descriptionPlaceholder: "Por favor describa su problema en detalle...",
    startChat: "Iniciar chat",
    translationWarning: "Los messages se traducen automáticamente y pueden contener errores.",
    imageLimitError: "Puede subir un máximo de 5 imágenes.",
    archivedWarning: "Este chat ha finalizado. No se pueden enviar mensajes nuevos.",
    online: "En línea",
    onlineAgent: "Agente de soporte",
    typeMessage: "Escriba su mensaje...",
    logout: "Cerrar sesión",
    errorInvalidCredentials: "Credenciales de inicio de sesión no válidas. Por favor verifique su correo y contraseña.",
    errorEmailNotConfirmed: "La dirección de correo electrónico aún no ha sido verificada.",
    errorUserNotFound: "Usuario no encontrado.",
    errorNetwork: "Ocurrió un error de red. Por favor verifique su conexión a Internet.",
    errorGeneric: "Ocurrió un error al iniciar sesión.",
    confirmCloseTitle: "Finalizar sesión",
    confirmCloseDesc: "¿Está seguro de que desea finalizar esta sesión de soporte en vivo?",
    confirmCloseYes: "Sí, finalizar",
    confirmCloseNo: "Cancelar",
    searchPlaceholder: "Buscar mensajes...",
  },
  az: {
    loginTitle: "Nexy Dəstəyə Giriş Edin",
    loginDesc: "Davam etmək üçün daxil olun",
    email: "E-poçt",
    password: "Şifrə",
    loginBtn: "Giriş et",
    loggingIn: "Giriş edilir...",
    fillFields: "Zəhmət olmasa bütün sahələri doldurun.",
    validEmail: "Düzgün e-poçt daxil edin.",
    loginSuccess: "Giriş uğurludur!",
    detailsTitle: "Dəstək Sorğusu Yaradın",
    detailsDesc: "Söhbətə başlamazdan əvvəl təfərrüatları daxil edin",
    subject: "Mövzu",
    subjectPlaceholder: "Məs: Ödəniş Problemi, Texniki Xəta",
    importance: "Vaciblik Səviyyəsi",
    importanceLow: "Aşağı",
    importanceMedium: "Orta",
    importanceHigh: "Yüksək",
    importanceCritical: "Kritik",
    description: "Təsvir",
    descriptionPlaceholder: "Zəhmət olmasa probleminizi ətraflı izah edin...",
    startChat: "Söhbətə Başla",
    translationWarning: "Mesajlar avtomatik tərcümə olunur və xətalar ola bilər.",
    imageLimitError: "Ən çox 5 şəkil yükləyə bilərsiniz.",
    archivedWarning: "Bu söhbət sonlandırılıb. Yeni mesaj göndərmək olmaz.",
    online: "Onlayn",
    onlineAgent: "Dəstək Nümayəndəsi",
    typeMessage: "Mesajınızı yazın...",
    logout: "Çıxış et",
    errorInvalidCredentials: "Yanlış giriş məlumatları. Zəhmət olmasa e-poçt və şifrənizi yoxlayın.",
    errorEmailNotConfirmed: "E-poçt ünvanı hələ təsdiqlənməyib.",
    errorUserNotFound: "İstifadəçi tapılmadı.",
    errorNetwork: "Şəbəkə xətası baş verdi. Zəhmət olmasa internet bağlantınızı yoxlayın.",
    errorGeneric: "Giriş zamanı xəta baş verdi.",
    confirmCloseTitle: "Görüşü Sonlandır",
    confirmCloseDesc: "Cari canlı dəstək görüşünü sonlandırmaq istədiyinizə əminsiniz?",
    confirmCloseYes: "Bəli, Sonlandır",
    confirmCloseNo: "İmtina",
    searchPlaceholder: "Mesajları axtar...",
  },
  ru: {
    loginTitle: "Вход в живую поддержку",
    loginDesc: "Войдите, чтобы продолжить",
    email: "Электронная почта",
    password: "Пароль",
    loginBtn: "Войти",
    loggingIn: "Вход...",
    fillFields: "Пожалуйста, заполнитe все поля.",
    validEmail: "Введите действительный адрес электронной почты.",
    loginSuccess: "Вход выполнен успешно!",
    detailsTitle: "Создать тикет поддержки",
    detailsDesc: "Введите детали перед началом чата",
    subject: "Тема",
    subjectPlaceholder: "например, проблема с оплатой, техническая ошибка",
    importance: "Уровень важности",
    importanceLow: "Низкий",
    importanceMedium: "Средний",
    importanceHigh: "Высокий",
    importanceCritical: "Критический",
    description: "Описание",
    descriptionPlaceholder: "Пожалуйста, подробно опишите вашу проблему...",
    startChat: "Начать чат",
    translationWarning: "Сообщения переводятся автоматически и могут содержать ошибки.",
    imageLimitError: "Вы можете загрузить не более 5 изображений.",
    archivedWarning: "Этот чат завершен. Новые сообщения отправлять нельзя.",
    online: "В сети",
    onlineAgent: "Агент поддержки",
    typeMessage: "Введите ваше сообщение...",
    logout: "Выйти",
    errorInvalidCredentials: "Неверные учетные данные. Пожалуйста, проверьте адрес электронной почты и пароль.",
    errorEmailNotConfirmed: "Адрес электронной почты еще не подтвержден.",
    errorUserNotFound: "Пользователь не найден.",
    errorNetwork: "Произошла сетевая ошибка. Пожалуйста, проверьте подключение к Интернету.",
    errorGeneric: "Произошла ошибка при входе.",
    confirmCloseTitle: "Завершить сессию",
    confirmCloseDesc: "Вы уверены, что хотите завершить эту сессию живой поддержки?",
    confirmCloseYes: "Да, завершить",
    confirmCloseNo: "Отмена",
    searchPlaceholder: "Поиск сообщений...",
  },
  ar: {
    loginTitle: "تسجيل الدخول إلى الدعم المباشر",
    loginDesc: "سجل الدخول للمتابعة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    loginBtn: "تسجيل الدخول",
    loggingIn: "جاري تسجيل الدخول...",
    fillFields: "يرجى ملء جميع الحقول.",
    validEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    detailsTitle: "إنشاء تذكرة دعم",
    detailsDesc: "أدخل التفاصيل قبل بدء الدردشة",
    subject: "الموضوع",
    subjectPlaceholder: "مثال: مشكلة الدفع، خطأ تقني",
    importance: "مستوى الأهمية",
    importanceLow: "منخفض",
    importanceMedium: "متوسط",
    importanceHigh: "عالي",
    importanceCritical: "حرج",
    description: "الوصف",
    descriptionPlaceholder: "يرجى وصف مشكلتك بالتفصيل...",
    startChat: "بدء الدردشة",
    translationWarning: "الرسائل تترجم تلقائياً وقد تحتوي على أخطاء.",
    imageLimitError: "يمكنك تحميل 5 صور كحد أقصى.",
    archivedWarning: "انتهت هذه الدردشة. لا يمكن إرسال رسائل جديدة.",
    online: "متصل",
    onlineAgent: "وكيل الدعم",
    typeMessage: "اكتب رسالتك...",
    logout: "تسجيل الخروج",
    errorInvalidCredentials: "بيانات الاعتماد غير صالحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.",
    errorEmailNotConfirmed: "لم يتم تأكيد عنوان البريد الإلكتروني بعد.",
    errorUserNotFound: "المستخدم غير موجود.",
    errorNetwork: "حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت.",
    errorGeneric: "حدث خطأ أثناء تسجيل الدخول.",
    confirmCloseTitle: "إنهاء الجلسة",
    confirmCloseDesc: "هل أنت متأكد أنك تريد إنهاء جلسة الدعم المباشر هذه؟",
    confirmCloseYes: "نعم، إنهاء",
    confirmCloseNo: "إلغاء",
    searchPlaceholder: "البحث في الرسائل...",
  },
  it: {
    loginTitle: "Accedi al Supporto Live",
    loginDesc: "Accedi per continuare",
    email: "E-mail",
    password: "Password",
    loginBtn: "Accedi",
    loggingIn: "Accesso in corso...",
    fillFields: "Si prega di compilare tutti i campi.",
    validEmail: "Inserisci un indirizzo email valido.",
    loginSuccess: "Accesso riuscito!",
    detailsTitle: "Crea un ticket di supporto",
    detailsDesc: "Inserisci i dettagli prima di avviare la chat",
    subject: "Oggetto",
    subjectPlaceholder: "es. Problema di pagamento, Bug tecnico",
    importance: "Livello di importanza",
    importanceLow: "Basso",
    importanceMedium: "Medio",
    importanceHigh: "Alto",
    importanceCritical: "Critico",
    description: "Descrizione",
    descriptionPlaceholder: "Descrivi il tuo problema in dettaglio...",
    startChat: "Avvia chat",
    translationWarning: "I messaggi sono tradotti automaticamente e possono contenere errori.",
    imageLimitError: "Puoi caricare un maxim di 5 immagini.",
    archivedWarning: "Questa chat è terminata. Non è possibile inviare nuovi messaggi.",
    online: "Online",
    onlineAgent: "Agente di supporto",
    typeMessage: "Digita il tuo messaggio...",
    logout: "Esci",
    errorInvalidCredentials: "Credenziali di accesso non valide. Si prega di controllare l'e-mail e la password.",
    errorEmailNotConfirmed: "L'indirizzo e-mail non è stato ancora verificato.",
    errorUserNotFound: "Utente non trovato.",
    errorNetwork: "Si è verificato un errore di rete. Si prega di controllare la connessione Internet.",
    errorGeneric: "Si è verificato un errore durante l'accesso.",
    confirmCloseTitle: "Termina sessione",
    confirmCloseDesc: "Sei sicuro di voler terminare questa sessione di supporto live?",
    confirmCloseYes: "Sì, termina",
    confirmCloseNo: "Annulla",
    searchPlaceholder: "Cerca messaggi...",
  },
  pt: {
    loginTitle: "Entrar no Suporte ao Vivo",
    loginDesc: "Faça login para continuar",
    email: "E-mail",
    password: "Senha",
    loginBtn: "Entrar",
    loggingIn: "Entrando...",
    fillFields: "Por favor, preencha todos os campos.",
    validEmail: "Insira um endereço de e-mail válido.",
    loginSuccess: "Login realizado com sucesso!",
    detailsTitle: "Criar ticket de suporte",
    detailsDesc: "Insira os detalhes antes de iniciar o chat",
    subject: "Assunto",
    subjectPlaceholder: "ex: Problema de pagamento, erro técnico",
    importance: "Nível de importância",
    importanceLow: "Baixo",
    importanceMedium: "Médio",
    importanceHigh: "Alto",
    importanceCritical: "Crítico",
    description: "Descrição",
    descriptionPlaceholder: "Descreva seu problema em detalhes...",
    startChat: "Iniciar chat",
    translationWarning: "As mensagens são traduzidas automaticamente e podem conter erros.",
    imageLimitError: "Você pode enviar no máximo 5 imagens.",
    archivedWarning: "Este chat foi encerrado. Novas mensagens não podem ser enviadas.",
    online: "Online",
    onlineAgent: "Agente de suporte",
    typeMessage: "Digite sua mensagem...",
    logout: "Sair",
    errorInvalidCredentials: "Credenciais de login inválidas. Por favor, verifique seu e-mail e senha.",
    errorEmailNotConfirmed: "O endereço de e-mail ainda não foi verificado.",
    errorUserNotFound: "Usuário não encontrado.",
    errorNetwork: "Ocorreu um erro de rede. Por favor, verifique sua conexão com a Internet.",
    errorGeneric: "Ocorreu um erro durante o login.",
    confirmCloseTitle: "Encerrar sessão",
    confirmCloseDesc: "Tem certeza de que deseja encerrar esta sessão de suporte ao vivo?",
    confirmCloseYes: "Sim, encerrar",
    confirmCloseNo: "Cancelar",
    searchPlaceholder: "Pesquisar mensagens...",
  },
  ja: {
    loginTitle: "ライブサポートにログイン",
    loginDesc: "続行するにはサインインしてください",
    email: "メールアドレス",
    password: "パスワード",
    loginBtn: "サインイン",
    loggingIn: "サインイン中...",
    fillFields: "すべてのフィールドに入力してください。",
    validEmail: "有効なメールアドレスを入力してください。",
    loginSuccess: "ログインに成功しました！",
    detailsTitle: "サポートチケットを作成",
    detailsDesc: "チャットを開始する前に詳細を入力してください",
    subject: "件名",
    subjectPlaceholder: "例：支払いの問題、技術的なバグ",
    importance: "重要度",
    importanceLow: "低",
    importanceMedium: "中",
    importanceHigh: "高",
    importanceCritical: "致命的",
    description: "詳細説明",
    descriptionPlaceholder: "問題を詳細に説明してください...",
    startChat: "チャットを開始",
    translationWarning: "メッセージは自動的に翻訳されるため、誤りが含まれる場合があります。",
    imageLimitError: "最大5枚の画像をアップロードできます。",
    archivedWarning: "このチャットは終了しました。新しいメッセージは送信できません。",
    online: "オンライン",
    onlineAgent: "サポート担当者",
    typeMessage: "メッセージを入力してください...",
    logout: "ログアウト",
    errorInvalidCredentials: "ログイン情報が無効です。メールアドレスとパスワードを確認してください。",
    errorEmailNotConfirmed: "メールアドレスがまだ確認されていません。",
    errorUserNotFound: "ユーザーが見つかりません。",
    errorNetwork: "ネットワークエラーが発生しました。インターネット接続を確認してください。",
    errorGeneric: "ログイン中にエラーが発生しました。",
    confirmCloseTitle: "セッションを終了",
    confirmCloseDesc: "このライブサポートセッションを終了してもよろしいですか？",
    confirmCloseYes: "はい、終了する",
    confirmCloseNo: "キャンセル",
    searchPlaceholder: "メッセージを検索...",
  },
  zh: {
    loginTitle: "登录在线客服",
    loginDesc: "登录以继续",
    email: "电子邮件",
    password: "密码",
    loginBtn: "登录",
    loggingIn: "登录中...",
    fillFields: "请填写所有字段。",
    validEmail: "请输入有效的电子邮件地址。",
    loginSuccess: "登录成功！",
    detailsTitle: "创建支持工单",
    detailsDesc: "在开始对话之前输入详细信息",
    subject: "主题",
    subjectPlaceholder: "例如：支付问题、技术故障",
    importance: "重要程度",
    importanceLow: "低",
    importanceMedium: "中",
    importanceHigh: "高",
    importanceCritical: "紧急",
    description: "问题描述",
    descriptionPlaceholder: "请详细描述您遇到的问题...",
    startChat: "开始对话",
    translationWarning: "信息是自动翻译 survey 的，可能会有翻译偏差。",
    imageLimitError: "您最多只能上传 5 张图片。",
    archivedWarning: "此会话已结束。无法发送新消息。",
    online: "在线",
    onlineAgent: "客服代表",
    typeMessage: "输入您要发送的消息...",
    logout: "退出登录",
    errorInvalidCredentials: "登录凭证无效。请检查您的电子邮件和密码。",
    errorEmailNotConfirmed: "电子邮件地址尚未验证。",
    errorUserNotFound: "找不到该用户。",
    errorNetwork: "发生 network 错误。请检查您的互联网连接。",
    errorGeneric: "登录时发生错误。",
    confirmCloseTitle: "结束会话",
    confirmCloseDesc: "您确定要结束此在线客服会话吗？",
    confirmCloseYes: "是的，结束",
    confirmCloseNo: "取消",
    searchPlaceholder: "搜索消息...",
  }
};

const getTranslation = (lang: string, key: string): string => {
  const normalizedLang = (lang || "tr").toLowerCase();
  const dict = localTrans[normalizedLang] || localTrans.en;
  return dict[key] || localTrans.en[key] || key;
};

// LIVE LOGIN VIEW
interface LiveLoginViewProps {
  onBack: () => void;
  onLoginSuccess: (user: { email: string }) => void;
  lang: string;
}

export function LiveLoginView({ onBack, onLoginSuccess, lang }: LiveLoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const translateSupabaseError = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
      return getTranslation(lang, "errorInvalidCredentials");
    }
    if (m.includes("email not confirmed")) {
      return getTranslation(lang, "errorEmailNotConfirmed");
    }
    if (m.includes("user not found")) {
      return getTranslation(lang, "errorUserNotFound");
    }
    if (m.includes("network")) {
      return getTranslation(lang, "errorNetwork");
    }
    return getTranslation(lang, "errorGeneric") || msg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(getTranslation(lang, "fillFields"));
      return;
    }
    if (!email.includes("@")) {
      toast.error(getTranslation(lang, "validEmail"));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(translateSupabaseError(error.message));
      } else if (data?.user) {
        toast.success(getTranslation(lang, "loginSuccess"));
        onLoginSuccess({ email: data.user.email || email });
      }
    } catch (err: any) {
      toast.error(translateSupabaseError(err.message || "Login error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
            title={lang === "tr" ? "Geri" : "Back"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              {getTranslation(lang, "loginTitle")}
            </h3>
            <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">
              {getTranslation(lang, "loginDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Form - Top Aligned for proper aesthetic spacing and symmetry */}
      <form onSubmit={handleLogin} className="flex-1 p-5 sm:p-6 flex flex-col justify-start pt-6 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold fun-text">
            {getTranslation(lang, "email")}
          </label>
          <input
            type="email"
            placeholder="ornek@funteknoloji.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-4 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
          />
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-xs font-semibold fun-text">
            {getTranslation(lang, "password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] pl-4 pr-10 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end -mt-2">
          <a
            href="https://account.funteknoloji.com/forgot-password"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[var(--fun-purple)] hover:underline"
          >
            {lang === "tr" ? "Şifremi Unuttum" : "Forgot Password?"}
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-1 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? getTranslation(lang, "loggingIn") : getTranslation(lang, "loginBtn")}
        </button>

        <div className="text-center mt-1">
          <span className="text-[11px] fun-text-muted">
            {lang === "tr" ? "Hesabınız Yok mu? " : "Don't have an account? "}
            <a
              href="https://account.funteknoloji.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--fun-purple)] hover:underline"
            >
              {lang === "tr" ? "Oluşturun" : "Create one"}
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

// LIVE TICKET DETAILS VIEW
interface LiveTicketDetailsViewProps {
  lang: string;
  onBack: () => void;
  onSubmit: (details: { subject: string; importance: string; description: string }) => void;
}

export function LiveTicketDetailsView({ lang, onBack, onSubmit }: LiveTicketDetailsViewProps) {
  const [subject, setSubject] = useState("");
  const [importance, setImportance] = useState("Orta");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");

  // Retrieve user full name from Supabase auth metadata on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Müşteri";
          setUserName(fullName);
        }
      } catch (err) {
        console.error("Failed to fetch user profiles:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error(getTranslation(lang, "fillFields"));
      return;
    }
    onSubmit({ subject, importance, description });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
            title={lang === "tr" ? "Geri" : "Back"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              {getTranslation(lang, "detailsTitle")}
            </h3>
            <p className="text-[10px] sm:text-xs fun-text-muted mt-0.5">
              {getTranslation(lang, "detailsDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto">
        {userName && (
          <div className="text-[11px] sm:text-xs text-[var(--fun-purple)] font-bold px-1">
            {lang === "tr" ? `Aktif Profil: ${userName}` : `Active Profile: ${userName}`}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold fun-text">
            {getTranslation(lang, "subject")}
          </label>
          <input
            type="text"
            placeholder={getTranslation(lang, "subjectPlaceholder")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-4 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold fun-text">
            {getTranslation(lang, "importance")}
          </label>
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-4 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all fun-text"
          >
            <option value="Düşük">{getTranslation(lang, "importanceLow")}</option>
            <option value="Orta">{getTranslation(lang, "importanceMedium")}</option>
            <option value="Yüksek">{getTranslation(lang, "importanceHigh")}</option>
            <option value="Kritik">{getTranslation(lang, "importanceCritical")}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold fun-text">
            {getTranslation(lang, "description")}
          </label>
          <textarea
            placeholder={getTranslation(lang, "descriptionPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-4 py-3 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all resize-none fun-text"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 mt-2 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          {getTranslation(lang, "startChat")}
        </button>
      </form>
    </div>
  );
}

// LIVE CHAT VIEW (Supports image sending, auto-translation system, auto-translation warning, read-only session)
interface LiveChatViewProps {
  user: { email: string };
  messages: { role: "agent" | "user"; text: string; id: string; timestamp: number; files?: AttachedFile[]; englishText?: string; displayedText?: string }[];
  setMessages: React.Dispatch<React.SetStateAction<{ role: "agent" | "user"; text: string; id: string; timestamp: number; files?: AttachedFile[]; englishText?: string; displayedText?: string }[]>>;
  onBack: () => void;
  onEndSession: () => void;
  onLogout: () => void;
  lang: string;
  isAgentTyping: boolean;
  setIsAgentTyping: (typing: boolean) => void;
  isMaximized: boolean;
  setIsMaximized?: (maximized: boolean) => void;
  readOnly?: boolean;
}

const extractDownloadableData = (text: string): { type: "csv" | "json"; data: string } | null => {
  if (!text) return null;
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
  if (jsonMatch && jsonMatch[1]) {
    return { type: "json", data: jsonMatch[1].trim() };
  }
  const csvMatch = text.match(/```csv\s*([\s\S]*?)\s*```/i);
  if (csvMatch && csvMatch[1]) {
    return { type: "csv", data: csvMatch[1].trim() };
  }
  if (text.trim().startsWith("[") && text.trim().endsWith("]")) {
    return { type: "json", data: text.trim() };
  }
  return null;
};

const triggerDataDownload = (data: string, type: "csv" | "json", filename = "funteknoloji-data") => {
  try {
    const mimeType = type === "json" ? "application/json" : "text/csv";
    const extension = type === "json" ? "json" : "csv";
    const blob = new Blob([data], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.${extension}`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(type === "json" ? "JSON dosyası indirildi!" : "CSV dosyası indirildi!");
  } catch (err) {
    console.error("Failed to download file:", err);
  }
};

export function LiveChatView({
  user,
  messages,
  setMessages,
  onBack,
  onEndSession,
  onLogout,
  lang,
  isAgentTyping,
  setIsAgentTyping,
  isMaximized,
  setIsMaximized,
  readOnly = false,
}: LiveChatViewProps) {
  const [input, setInput] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<AttachedFile | null>(null);
  const [lastSentTimestamp, setLastSentTimestamp] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(typeof window !== "undefined" ? navigator.onLine : true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [thinkingStage, setThinkingStage] = useState<"checking" | "typing">("checking");
  const [pendingOfflineInput, setPendingOfflineInput] = useState<string>("");
  const [downloadedMessages, setDownloadedMessages] = useState<Record<string, boolean>>({});

  // Resilient Offline auto-resending trigger when connection returns
  useEffect(() => {
    if (isOnline && pendingOfflineInput && !isAgentTyping && !readOnly) {
      const resendMessage = async () => {
        const textToResend = pendingOfflineInput;
        setPendingOfflineInput(""); // clear immediately to prevent loops

        // Remove any previous temporary system offline warning messages from the thread for aesthetic elegance
        setMessages((prev) => prev.filter((m) => !m.id.startsWith("system-offline-warn-")));

        setIsAgentTyping(true);
        setThinkingStage("checking");

        let accountContext = "";
        if (userProfile) {
          accountContext = `\n[USER ACCOUNT CONTEXT]\nEmail: ${userProfile.email}\nFull Name: ${userProfile.name}\nAccount Created At: ${userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleString("tr-TR") : "N/A"}\nEmail Verification Status: ${userProfile.emailConfirmed ? "Verified" : "Unverified"}\nLast Sign-In: ${userProfile.lastSignIn ? new Date(userProfile.lastSignIn).toLocaleString("tr-TR") : "N/A"}\n`;
        }

        const ticketSubject = localStorage.getItem("live_support_subject_en") || localStorage.getItem("live_support_subject") || "General Support";
        const ticketImportance = localStorage.getItem("live_support_importance_en") || localStorage.getItem("live_support_importance") || "Medium";
        const ticketDescription = localStorage.getItem("live_support_description_en") || localStorage.getItem("live_support_description") || "";

        let ticketContext = `\n[USER TICKET DETAILS]\nSubject: ${ticketSubject}\nImportance Level: ${ticketImportance}\nUser's Description of the Issue: "${ticketDescription}"\n`;

        const formattedMessages = [
          {
            role: "system",
            content: `You are ${agentName}, a professional, warm, and highly capable AI support assistant working strictly for Fun Teknoloji (Fun Technology).
Fun Technology projects and information:
${KNOWLEDGE_BASE}
${accountContext}
${ticketContext}
Do not mention any third-party services like Pollinations or Pulsar. Respond directly in the language of the chat: ${lang}.`,
          }
        ];

        const historyMessages = messages
          .filter((m) => !m.id.startsWith("system-offline-warn-"))
          .slice(-20)
          .map((m) => ({
            role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant" | "system",
            content: m.text,
          }));

        formattedMessages.push(...historyMessages);

        const cleanMessagesForAPI = (msgs: any[]) => {
          const systemMsg = msgs.find((m) => m.role === "system");
          const chatMsgs = msgs.filter((m) => m.role !== "system");
          while (chatMsgs.length > 0 && chatMsgs[0].role !== "user") {
            chatMsgs.shift();
          }
          const alternating: any[] = [];
          for (const msg of chatMsgs) {
            if (!msg.content || msg.content.trim() === "") continue;
            if (alternating.length === 0) {
              alternating.push({ ...msg });
            } else {
              const lastMsg = alternating[alternating.length - 1];
              if (lastMsg.role === msg.role) {
                lastMsg.content = `${lastMsg.content}\n${msg.content}`;
              } else {
                alternating.push({ ...msg });
              }
            }
          }
          const finalMsgs = [];
          if (systemMsg) finalMsgs.push(systemMsg);
          finalMsgs.push(...alternating);
          return finalMsgs;
        };

        const cleanedMessages = cleanMessagesForAPI(formattedMessages);

        try {
          let agentText = "";
          let englishResponse = "";
          let token = "";
          try {
            const { data: { session } } = await supabase.auth.getSession();
            token = session?.access_token || "";
          } catch (e) {}

          const response = await fetch("/api/nexy/helper", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              messages: cleanedMessages,
              originalMessages: cleanedMessages,
              lang,
              ticketSubject,
              ticketImportance,
              ticketDescription,
              model: "gemma-3-1b-it",
              isLiveSupport: true
            }),
          });

          if (response.ok) {
            const data = await response.json();
            agentText = data.text;
            englishResponse = data.englishText;
          } else {
            throw new Error("Backend query failed");
          }

          agentText = agentText.replace(/\[inceliyor\]/gi, "");
          agentText = agentText.replace(/\[duraklama\]/gi, "");
          agentText = agentText.replace(/\[bekliyor\]/gi, "");
          agentText = agentText.replace(/\[düşünüyor\]/gi, "");
          agentText = agentText.replace(/\[[^\]]+\]/g, (match) => {
            if (match.toLowerCase().startsWith("[redirect:")) return match;
            return "";
          });
          agentText = agentText.trim().replace(/pulsar/gi, "Nexy");
          englishResponse = englishResponse.trim().replace(/pulsar/gi, "Nexy");

          const agentMsgId = Math.random().toString(36).substring(2, 9);
          setMessages((prev) => [
            ...prev,
            {
              role: "agent" as const,
              text: agentText,
              id: agentMsgId,
              timestamp: Date.now(),
              displayedText: "",
              englishText: englishResponse
            }
          ]);

          setThinkingStage("typing");
          setTimeout(() => {
            setIsAgentTyping(false);
            setTimeout(() => typeAgentMessage(agentText, agentMsgId), 50);
          }, 800);

        } catch (err) {
          setIsAgentTyping(false);
          setPendingOfflineInput(textToResend);
        }
      };

      resendMessage();
    }
  }, [isOnline, pendingOfflineInput]);

  const getAgentThinkingText = () => {
    if (thinkingStage === "typing") {
      return lang === "tr" ? "Nexy Yazıyor..." : "Nexy is typing...";
    }

    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    const lastUserText = lastUserMsg?.text?.toLowerCase() || "";
    const hasFiles = attachedFiles.length > 0;
    const hasMsgFiles = lastUserMsg?.files && lastUserMsg.files.length > 0;

    const filesCount = attachedFiles.length + (lastUserMsg?.files?.length || 0);

    const isCreatingFile =
      lastUserText.includes("csv") ||
      lastUserText.includes("json") ||
      lastUserText.includes("dosya oluştur") ||
      lastUserText.includes("oluştur") ||
      lastUserText.includes("tablo") ||
      lastUserText.includes("indir") ||
      lastUserText.includes("excel") ||
      lastUserText.includes("export") ||
      lastUserText.includes("create") ||
      lastUserText.includes("file") ||
      lastUserText.includes("table") ||
      lastUserText.includes("list");

    if (isCreatingFile) {
      return lang === "tr" ? "Dosya Oluşturuluyor..." : "Generating File...";
    }

    const mentionsFiles =
      lastUserText.includes("dosya") ||
      lastUserText.includes("resim") ||
      lastUserText.includes("ekledim") ||
      lastUserText.includes("görsel") ||
      lastUserText.includes("screenshot") ||
      lastUserText.includes("file") ||
      lastUserText.includes("image") ||
      lastUserText.includes("pdf");

    if (hasFiles || hasMsgFiles || mentionsFiles) {
      if (filesCount > 1) {
        return lang === "tr" ? "Dosyalar İnceleniyor..." : "Analyzing Files...";
      }
      return lang === "tr" ? "Dosya İnceleniyor..." : "Analyzing File...";
    }

    const mentionsAccount =
      lastUserText.includes("hesap") ||
      lastUserText.includes("profil") ||
      lastUserText.includes("üye") ||
      lastUserText.includes("giriş") ||
      lastUserText.includes("e-posta") ||
      lastUserText.includes("eposta") ||
      lastUserText.includes("email") ||
      lastUserText.includes("account") ||
      lastUserText.includes("profile") ||
      lastUserText.includes("my name") ||
      lastUserText.includes("adım") ||
      lastUserText.includes("kimim");

    if (mentionsAccount) {
      return lang === "tr" ? "Hesabınız İnceleniyor..." : "Reviewing your account securely...";
    }

    // Checking details fallback
    const mentionsQuery = lastUserText.includes("öde") || lastUserText.includes("abonelik") || lastUserText.includes("bilet") || lastUserText.includes("ticket") || lastUserText.includes("fatura");
    if (mentionsQuery) {
      return lang === "tr" ? "Hesap Bilgileriniz Sorgulanıyor..." : "Sourcing secure account details...";
    }

    return lang === "tr" ? "Düşünüyor..." : "Thinking...";
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  // Fetch Supabase Auth account details on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (sbUser) {
          setUserProfile({
            email: sbUser.email,
            name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split("@")[0] || "Değerli Müşterimiz",
            createdAt: sbUser.created_at,
            emailConfirmed: !!sbUser.email_confirmed_at,
            lastSignIn: sbUser.last_sign_in_at,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user profiles:", err);
      }
    };
    fetchProfile();
  }, []);

  const welcomeTriggeredRef = useRef(false);
  const typingIntervalRef = useRef<number | null>(null);
  const isSendingRef = useRef(false);

  const typeAgentMessage = (fullText: string, msgId: string) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    let currentText = "";
    let charIndex = 0;
    const speed = 25; // 25ms per letter

    typingIntervalRef.current = window.setInterval(() => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, displayedText: currentText } : m
          )
        );
        charIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // 5-minute Inactivity Timer (Closes the active chat session safely on inactivity timeout)
  useEffect(() => {
    if (readOnly) return;

    const inactivityTimeout = setTimeout(() => {
      toast.info(
        lang === "tr"
          ? "Görüşme 5 dakika boyunca hareketsiz kaldığı için otomatik olarak sonlandırıldı."
          : "Session was automatically closed due to 5 minutes of inactivity."
      );
      // Cleanly end support session rather than completely signing out of the entire account
      onEndSession();
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(inactivityTimeout);
    };
  }, [messages, readOnly, lang]);

  // Tab/Window close confirmation and sync termination
  useEffect(() => {
    if (readOnly) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Synchronously clear localStorage support details on tab/browser close to ensure session is completely terminated
      localStorage.removeItem("live_support_messages");
      localStorage.removeItem("live_support_subject");
      localStorage.removeItem("live_support_importance");
      localStorage.removeItem("live_support_subject_en");
      localStorage.removeItem("live_support_importance_en");
      localStorage.removeItem("live_support_description_en");
      localStorage.removeItem("live_support_agent_name");

      e.preventDefault();
      e.returnValue = lang === "tr"
        ? "Canlı destek görüşmeniz devam ediyor. Ayrılmak istediğinize emin misiniz? Çıkarsanız görüşmeniz sonlandırılacaktır."
        : "Your live support session is active. Are you sure you want to leave? Your session will be terminated.";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [readOnly, lang]);

  const forceSupportLogout = () => {
    supabase.auth.signOut().catch(() => {});
    onLogout();
    toast.error(
      lang === "tr"
        ? "Oturum süreniz doldu veya geçersiz. Güvenliğiniz için tekrar giriş yapın."
        : "Session expired or invalid. Please log in again for your security."
    );
  };

  // Automatic personalized AI representative greeting on chat mount/initialization
  useEffect(() => {
    if (!userProfile || messages.length !== 1 || welcomeTriggeredRef.current) return;
    welcomeTriggeredRef.current = true;

    const triggerWelcome = async () => {
      setThinkingStage("checking");
      setIsAgentTyping(true);

      const ticketSubject = localStorage.getItem("live_support_subject_en") || localStorage.getItem("live_support_subject") || "General Support";
      const ticketImportance = localStorage.getItem("live_support_importance_en") || localStorage.getItem("live_support_importance") || "Medium";
      const ticketDescription = localStorage.getItem("live_support_description_en") || localStorage.getItem("live_support_description") || "";

      const accountContext = `\n[USER ACCOUNT CONTEXT]\nEmail: ${userProfile.email}\nFull Name: ${userProfile.name}\nAccount Created At: ${userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleString("tr-TR") : "N/A"}\nEmail Verification Status: ${userProfile.emailConfirmed ? "Verified" : "Unverified"}\nLast Sign-In: ${userProfile.lastSignIn ? new Date(userProfile.lastSignIn).toLocaleString("tr-TR") : "N/A"}\n`;

      const formattedMessages = [
        {
          role: "system",
          content: `You are ${agentName}, a highly professional AI support assistant working at Fun Teknoloji (Fun Technology).
Fun Technology projects and information:
${KNOWLEDGE_BASE}
- Note on FunID: FunID is Fun Teknoloji's unified account, identity verification, and security management platform. If the user's issue relates to updating their profile, verifying emails, or managing account settings, this is handled via FunID.
${accountContext}

[USER TICKET DETAILS]
Subject: ${ticketSubject}
Importance Level: ${ticketImportance}
User's Description of the Issue: "${ticketDescription}"

Your task is to write a highly personalized, warm, and professional welcome greeting to the user.
Greet them by their full name (${userProfile.name}) in a warm, helpful way.
Acknowledge that they are securely logged in under their email address (${userProfile.email}) and that you see they have submitted a support request regarding their issue. Discuss the issue description ("${ticketDescription}") naturally in a conversational sentence.
CRITICAL OUTPUT CONSTRAINT: Never output any technical ticket fields (like "Subject:", "Konu:", "Importance:", "Severity:", "Açıklama:") as headers, prefixes, or labels in your response. Never write any "Subject:" or "Konu:" prefixes. Do not write any redirection labels, redirect commands, or redirect text in your messages. Just speak naturally.
STRICT TOPIC RULE: Focus intensely and intelligently on their actual ticket topic ("${ticketSubject}" and "${ticketDescription}"): do not wander off or try to force every single greeting to talk about unrelated features like QuakeSafe or Nexy features unless their ticket description specifically mentions them. Stay professional, precise, and direct.
Do not promote any third-party services like Pollinations or Pulsar. Respond directly in the language of the chat: ${lang}.`,
        },
        {
          role: "user",
          content: "Write your welcome message now.",
        }
      ];

      const cleanMessagesForAPI = (msgs: any[]) => {
        const systemMsg = msgs.find((m) => m.role === "system");
        const chatMsgs = msgs.filter((m) => m.role !== "system");
        while (chatMsgs.length > 0 && chatMsgs[0].role !== "user") {
          chatMsgs.shift();
        }
        const alternating: any[] = [];
        for (const msg of chatMsgs) {
          if (!msg.content || msg.content.trim() === "") continue;
          if (alternating.length === 0) {
            alternating.push({ ...msg });
          } else {
            const lastMsg = alternating[alternating.length - 1];
            if (lastMsg.role === msg.role) {
              lastMsg.content = `${lastMsg.content}\n${msg.content}`;
            } else {
              alternating.push({ ...msg });
            }
          }
        }
        const finalMsgs = [];
        if (systemMsg) finalMsgs.push(systemMsg);
        finalMsgs.push(...alternating);
        return finalMsgs;
      };

      const cleanedMessages = cleanMessagesForAPI(formattedMessages);

      try {
        let agentText = "";
        let englishResponse = "";
        try {
          // Fetch local Supabase Session securely if user session is available
          let token = "";
          try {
            const { data: { session } } = await supabase.auth.getSession();
            token = session?.access_token || "";
          } catch (e) {}

          const response = await fetch("/api/nexy/helper", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              messages: cleanedMessages,
              originalMessages: cleanedMessages,
              lang,
              ticketSubject,
              ticketImportance,
              ticketDescription,
              model: "gemma-3-1b-it",
              isLiveSupport: true
            }),
          });

          if (response.status === 401) {
            forceSupportLogout();
            return;
          }

          if (response.ok) {
            const data = await response.json();
            agentText = data.text;
            englishResponse = data.englishText;
          } else {
            throw new Error("Vercel proxy failed");
          }
        } catch (err) {
          console.error("Vercel backend proxy call failed in triggerWelcome:", err);
          agentText = `Hello ${userProfile.name}! I am ${agentName}. How can I assist you today?`;
          englishResponse = agentText;
        }

        agentText = agentText || `Hello ${userProfile.name}! I am ${agentName}. How can I assist you today?`;
        englishResponse = englishResponse || agentText;

        agentText = agentText.replace(/\[inceliyor\]/gi, "");
        agentText = agentText.replace(/\[duraklama\]/gi, "");
        agentText = agentText.replace(/\[bekliyor\]/gi, "");
        agentText = agentText.replace(/\[düşünüyor\]/gi, "");
        agentText = agentText.replace(/\[[^\]]+\]/g, (match) => {
          if (match.toLowerCase().startsWith("[redirect:")) return match;
          return "";
        });
        agentText = agentText.trim().replace(/pulsar/gi, "Nexy");

        const agentMsgId = Math.random().toString(36).substring(2, 9);
        setMessages((prev) => [
          ...prev,
          {
            role: "agent" as const,
            text: agentText,
            id: agentMsgId,
            timestamp: Date.now(),
            displayedText: "",
            englishText: englishResponse
          }
        ]);

        // Transition stage to typing with organic delay
        setThinkingStage("typing");
        setTimeout(() => {
          setIsAgentTyping(false);
          setTimeout(() => typeAgentMessage(agentText, agentMsgId), 50);
        }, 800);

      } catch (err) {
        setIsAgentTyping(false);
      }
    };

    triggerWelcome();
  }, [userProfile]);

  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success(lang === "tr" ? "Kopyalandı" : "Copied", {
      description: lang === "tr" ? "Mesaj panoya kopyalandı." : "Message copied to clipboard.",
      duration: 3000,
    });
  };

  const speak = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      if (speakingMessageIndex === id) {
        window.speechSynthesis.cancel();
        setSpeakingMessageIndex(null);
        return;
      }
      window.speechSynthesis.cancel();
      setSpeakingMessageIndex(id);

      const cleanText = text
        .replace(/\*\*/g, "") // Remove bold markers
        .replace(/\*/g, "") // Remove italic markers
        .trim();

      const ut = new SpeechSynthesisUtterance(cleanText);
      const langMap: Record<string, string> = {
        tr: "tr-TR",
        en: "en-US",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES",
        az: "tr-TR",
        ru: "ru-RU",
        ar: "ar-SA",
        it: "it-IT",
        pt: "pt-PT",
        ja: "ja-JP",
        zh: "zh-CN",
      };
      ut.lang = langMap[lang] || "tr-TR";
      ut.rate = 1.0;
      ut.pitch = 1.1;
      ut.onstart = () => setSpeakingMessageIndex(id);
      ut.onend = () => setSpeakingMessageIndex(null);
      ut.onerror = () => setSpeakingMessageIndex(null);
      window.speechSynthesis.speak(ut);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  // OCR helper function for images & PDFs
  const runOcrOnImage = async (base64Image: string, fileType: string): Promise<string> => {
    try {
      let fileTypeParam = "png";
      const nameLower = fileType.toLowerCase();
      if (nameLower.includes("pdf") || nameLower.endsWith(".pdf")) {
        fileTypeParam = "pdf";
      } else if (nameLower.includes("jpg") || nameLower.includes("jpeg")) {
        fileTypeParam = "jpg";
      } else if (nameLower.includes("gif")) {
        fileTypeParam = "gif";
      }

      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          apikey: "helloworld",
          base64image: base64Image,
          filetype: fileTypeParam,
          language: "tur"
        })
      });
      if (response.ok) {
        const data = await response.json() as any;
        if (data && data.ParsedResults && data.ParsedResults[0]) {
          return data.ParsedResults[0].ParsedText || "";
        }
      }
    } catch (err) {
      console.error("OCR extraction failed:", err);
    }
    return "";
  };

  // Image Captioning/Visual description using Salesforce BLIP Large model
  const describeImage = async (base64Image: string): Promise<string> => {
    try {
      const arr = base64Image.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });

      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          method: "POST",
          body: blob,
        }
      );
      if (response.ok) {
        const data = await response.json() as any;
        if (data && data[0] && data[0].generated_text) {
          return data[0].generated_text;
        }
      }
    } catch (err) {
      console.error("Image captioning failed:", err);
    }
    return "";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (attachedFiles.length + files.length > 5) {
      toast.error(getTranslation(lang, "imageLimitError"));
      return;
    }

    for (const file of files) {
      const sizeStr = (file.size / 1024).toFixed(1) + " KB";
      const fileObj: AttachedFile = {
        name: file.name,
        type: file.type || "application/octet-stream",
        size: sizeStr,
        base64: "",
        isAnalyzing: true
      };

      // Add to list immediately as analyzing placeholder
      setAttachedFiles((prev) => [...prev, fileObj]);

      // Read as base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string || "");
        reader.readAsDataURL(file);
      });

      fileObj.base64 = base64;
      if (file.type.includes("image")) {
        fileObj.thumbnail = await generateThumbnail(base64);
      }

      // Extract content and visual description
      if (file.type.includes("text/plain") || file.name.endsWith(".txt")) {
        const txtContent = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string || "");
          reader.readAsText(file);
        });
        fileObj.extractedText = txtContent;
        fileObj.isAnalyzing = false;
      } else if (file.type.includes("image")) {
        // Run OCR and Visual Captioning concurrently
        const [ocrText, visualDesc] = await Promise.all([
          runOcrOnImage(base64, file.type || file.name),
          describeImage(base64)
        ]);

        let combined = "";
        if (ocrText && ocrText.trim()) {
          combined += `OCR Extracted Text:\n${ocrText.trim()}`;
        }
        if (visualDesc && visualDesc.trim()) {
          let localizedDesc = visualDesc.trim();
          if (lang !== "en") {
            localizedDesc = await translateAnyText(localizedDesc, "en", lang);
          }
          combined += (combined ? "\n\n" : "") + `Visual Scene Description: "${localizedDesc}"`;
        }

        fileObj.extractedText = combined || "[An image file with no readable text]";
        fileObj.isAnalyzing = false;
      } else if (file.type.includes("pdf") || file.name.endsWith(".pdf")) {
        // Run PDF OCR
        const ocrText = await runOcrOnImage(base64, file.type || file.name);
        fileObj.extractedText = ocrText ? `PDF Extracted Content:\n${ocrText}` : "[An empty PDF document]";
        fileObj.isAnalyzing = false;
      } else {
        fileObj.extractedText = `[File attachment name: ${file.name}]`;
        fileObj.isAnalyzing = false;
      }

      // Update state with finalized file details
      setAttachedFiles((prev) =>
        prev.map((f) => (f.name === file.name ? { ...fileObj } : f))
      );
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Support assistant name is always Nexy
  const [agentName, setAgentName] = useState("Nexy");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachedFiles.length === 0) || isAgentTyping || readOnly) return;

    // Client-side rate limiting: 1 message per 2 seconds
    const now = Date.now();
    if (now - lastSentTimestamp < 2000) {
      toast.warning(
        lang === "tr"
          ? "Çok hızlı mesaj gönderiyorsunuz. Lütfen biraz bekleyin."
          : "You are sending messages too fast. Please wait a moment."
      );
      return;
    }

    if (isSendingRef.current) return;
    isSendingRef.current = true;

    try {
      setLastSentTimestamp(now);

      const userText = input.trim();
      const currentAttachedFiles = [...attachedFiles];

      // Handle offline state dynamically with a direct warning bubble and saved input
      if (!isOnline) {
        const offlineMsg = {
          role: "user" as const,
          text: userText,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          files: currentAttachedFiles
        };

        const systemWarnMsg = {
          role: "agent" as const,
          text: lang === "tr"
            ? "⚠️ **İnternet Bağlantısı Yok.** Bağlantınız geri geldiğinde sorunuz otomatik olarak iletilecek ve yanıtlanacaktır."
            : "⚠️ **No Internet Connection.** Your question will be automatically forwarded and answered once connection is restored.",
          id: "system-offline-warn-" + Math.random().toString(36).substring(2, 5),
          timestamp: Date.now()
        };

        setMessages((prev) => [...prev, offlineMsg, systemWarnMsg]);
        setInput("");
        setAttachedFiles([]);
        setPendingOfflineInput(userText);
        setIsAgentTyping(false);
        isSendingRef.current = false;
        return;
      }

      const userMsg = {
        role: "user" as const,
        text: userText,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        files: currentAttachedFiles
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setAttachedFiles([]);
      setThinkingStage("checking");
      setIsAgentTyping(true);

      // Combine any pre-extracted OCR text or plain text content from the attached files
      let ocrCombinedText = "";
      const filesWithText = currentAttachedFiles.filter((f) => f.extractedText && f.extractedText.trim().length > 0);
      if (filesWithText.length > 0) {
        ocrCombinedText = filesWithText.map((f, idx) => `[Attached File #${idx + 1} "${f.name}" Content/OCR Text: "${f.extractedText}"]`).join("\n");
      }

      let userTextWithOcr = userText;
      if (ocrCombinedText) {
        userTextWithOcr = `${userText}\n\n[USER ATTACHED FILE DETAILS]\n${ocrCombinedText}`;
      }

      // Prepare system message strictly in English for maximum reasoning quality
      let accountContext = "";
      if (userProfile) {
        accountContext = `\n[USER ACCOUNT CONTEXT]\nEmail: ${userProfile.email}\nFull Name: ${userProfile.name}\nAccount Created At: ${userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleString("tr-TR") : "N/A"}\nEmail Verification Status: ${userProfile.emailConfirmed ? "Verified" : "Unverified"}\nLast Sign-In: ${userProfile.lastSignIn ? new Date(userProfile.lastSignIn).toLocaleString("tr-TR") : "N/A"}\n`;
      }

      const ticketSubject = localStorage.getItem("live_support_subject_en") || localStorage.getItem("live_support_subject") || "General Support";
      const ticketImportance = localStorage.getItem("live_support_importance_en") || localStorage.getItem("live_support_importance") || "Medium";
      const ticketDescription = localStorage.getItem("live_support_description_en") || localStorage.getItem("live_support_description") || "";

      let ticketContext = `\n[USER TICKET DETAILS]\nSubject: ${ticketSubject}\nImportance Level: ${ticketImportance}\nUser's Description of the Issue: "${ticketDescription}"\n`;

      const formattedMessages = [];
      formattedMessages.push({
        role: "system",
        content: `You are ${agentName}, a professional, warm, and highly capable AI support assistant working strictly for Fun Teknoloji (Fun Technology).
Fun Technology projects and information:
${KNOWLEDGE_BASE}
- Note on FunID: FunID is Fun Teknoloji's unified identity authentication and user account management service. If the user has questions about updating passwords, verifying profiles, or editing account credentials/details, explain how FunID handles this securely.
${accountContext}
${ticketContext}

CRITICAL RULES:
1. FOCUS ON SUPPORT: Your main objective is to assist the user with Fun Teknoloji, our services, or their specific ticket details ("${ticketDescription}"). Do not wander off or divert the conversation to other topics. If the ticket description is about a specific product/setting (like FunID or general questions), address that directly without trying to forcefully connect everything to QuakeSafe or Nexy features. Stay strictly on-topic with the user's inquiry!
2. BE WARM, CONVERSATIONAL AND INTELLIGENT: Talk like a highly empathetic, helpful AI assistant. Avoid dry, robotic rejections. If the user asks general friendly chitchat or unrelated questions, gently and politely bridge back to how you can help them with Fun Teknoloji or their support ticket.
3. Solve requests in a polite and professional manner based on the knowledge base, user account context, and ticket details.
4. Ensure your help is specifically tailored to resolve the user's described issue ("${ticketDescription}").
5. COGNITIVE DOCUMENT RELEVANCE CHECK: If the user has attached any files or if there is OCR/extracted text from files under [USER ATTACHED FILE DETAILS], you MUST carefully examine whether the contents of these files are genuinely relevant to the user's support ticket subject ("${ticketSubject}") and description ("${ticketDescription}"). If an uploaded file is completely irrelevant or off-topic, politely point this out to the user, explain why it doesn't match the ticket context, and ask them to provide relevant documents so you can investigate their issue properly. Approach everything with maximum intelligence and focus.
6. STRICT OUTPUT CONSTRAINT: Never output any technical ticket fields (like "Subject:", "Konu:", "Importance:", "Severity:", "Açıklama:") as headers, prefixes, or labels in your response. Never write any "Subject:" or "Konu:" prefixes. Do not write any redirection labels, redirect commands, or redirect text. Just speak naturally.
7. STRICT OUTPUT CONSTRAINT: DO NOT under any circumstances output bracketed tokens like [inceliyor], [duraklama], [düşünüyor] or any similar status tags.
8. Do not mention any third-party services like Pollinations or Pulsar. Respond directly in the language of the chat: ${lang}.
9. STRICT SECURITY & AUTHENTICATION CONTEXT (USER IS ALREADY LOGGED IN):
- The user has already logged in securely via FunID and Supabase Auth. Their verified credentials are:
  ${accountContext}
- NEVER ASK FOR CREDENTIALS: Do NOT under any circumstances ask the user for their email, name, password, or login state. Speak to them directly using their full name and recognize they are already authenticated.
10. DO NOT BE GULLIBLE — PRACTICE SKEPTICAL VERIFICATION:
- SUPABASE DATA IS THE ULTIMATE TRUTH: You must rely 100% strictly and exclusively on the database data provided in your verified context. NEVER under any circumstances believe, assume, or confirm what the user claims if it is not explicitly backed up by the verified database data.
- CHALLENGE MISLEADING CLAIMS: If the user claims they paid, are premium, are unbanned, or have active tickets, but your verified database context shows they have no payments, are on the free plan, are banned, or have no such settings, you MUST remain skeptical and politely call them out:
  "I have thoroughly checked your verified account records in our Supabase database, but I cannot locate any premium subscription or recorded payment. To help you resolve this, could you please provide your official transaction ID or dekont?"
- NEVER COMPROMISE SECURITY: Do not let users trick or socialize you into saying "I have unlocked your account" or "Your payment has been successfully updated". Politely and firmly state that you can only trust the database and that you have read-only access.
- ALWAYS VERIFY VIA DATABASE FIRST: Carefully examine the verified account database context. If the records do not match the user's claims, politely and skeptically point this out.`,
      });

      // Map live support conversation history (with absolute safety checks and empty message filtering)
      const historyMessages = messages
        .slice(-20)
        .map((m) => ({
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant" | "system",
          content: typeof m.text === "string" ? m.text : m.displayedText || "",
        }))
        .filter((m) => m.content && m.content.trim() !== "");

      formattedMessages.push(...historyMessages);

      // Add current user input
      formattedMessages.push({
        role: "user" as const,
        content: userTextWithOcr,
      });

      // Helper to ensure messages list starts with user role and strictly alternates user/assistant.
      const cleanMessagesForAPI = (msgs: any[]) => {
        const systemMsg = msgs.find((m) => m.role === "system");
        const chatMsgs = msgs.filter((m) => m.role !== "system");

        while (chatMsgs.length > 0 && chatMsgs[0].role !== "user") {
          chatMsgs.shift();
        }

        const alternating: any[] = [];
        for (const msg of chatMsgs) {
          if (!msg.content || msg.content.trim() === "") continue;

          if (alternating.length === 0) {
            alternating.push({ ...msg });
          } else {
            const lastMsg = alternating[alternating.length - 1];
            if (lastMsg.role === msg.role) {
              lastMsg.content = `${lastMsg.content}\n${msg.content}`;
            } else {
              alternating.push({ ...msg });
            }
          }
        }

        const finalMsgs = [];
        if (systemMsg) {
          finalMsgs.push(systemMsg);
        }
        finalMsgs.push(...alternating);
        return finalMsgs;
      };

      const cleanedMessages = cleanMessagesForAPI(formattedMessages);

      try {
        let agentText = "";
        let englishResponse = "";

        try {
          // Construct original untranslated messages history
          const originalMessages = messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          }));
          originalMessages.push({
            role: "user",
            content: userText,
          });

          // Fetch local Supabase Session securely if user session is available
          let token = "";
          try {
            const { data: { session } } = await supabase.auth.getSession();
            token = session?.access_token || "";
          } catch (e) {}

          // Route all requests directly to Vercel backend proxy /api/nexy/helper (acts as central fallback orchestrator)
          const response = await fetch("/api/nexy/helper", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              messages: cleanedMessages,
              originalMessages,
              lang,
              ticketSubject,
              ticketImportance,
              ticketDescription,
              model: "gemma-3-1b-it",
              isLiveSupport: true
            }),
          });

          if (response.status === 401) {
            forceSupportLogout();
            return;
          }

          if (response.ok) {
            const data = await response.json();
            const textCandidate = data.text || "";
            if (textCandidate.includes("geçici bir yoğunluk") || textCandidate.includes("temporary system congestion") || textCandidate.includes("meşgul") || textCandidate.includes("Sorgunuz işlenirken bir hata oluştu")) {
              throw new Error("Backend returned a congestion/error response, forcing direct frontend fallback");
            }
            agentText = textCandidate;
            englishResponse = data.englishText || agentText;
          } else {
            throw new Error("Backend proxy failed");
          }
        } catch (proxyErr) {
          console.error("Vercel backend proxy call failed in handleSend, attempting direct fallback:", proxyErr);
          try {
            // 1. Translate user messages to English before sending to Gemma
            const englishMessages = [];
            for (const msg of cleanedMessages) {
              if (msg.role === "system") {
                englishMessages.push(msg);
              } else {
                const contentStr = typeof msg.content === "string" ? msg.content : "";
                const translatedContent = await translateTextHelper(contentStr, lang, "en");
                englishMessages.push({ ...msg, content: translatedContent });
              }
            }

            // Direct frontend fallback call
            const directResponse = await fetch("https://ai.funteknoloji.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                "Accept": "application/json",
                "Origin": "https://nexy.funteknoloji.com",
                "Referer": "https://nexy.funteknoloji.com/"
              },
              body: JSON.stringify({
                messages: englishMessages,
                model: "gemma-3-1b-it"
              }),
            });

            if (directResponse.ok) {
              const directData = await directResponse.json();
              const rawText = directData.choices?.[0]?.message?.content || "";

              englishResponse = rawText;

              // 2. Translate response back to user's target language
              let translatedText = rawText;
              if (lang && lang !== "en") {
                translatedText = await translateTextWithCodeBlocks(rawText, "en", lang);
              }

              translatedText = cleanLeadingDashes(translatedText);
              englishResponse = cleanLeadingDashes(englishResponse);

              agentText = translatedText;
            } else {
              throw new Error(`Direct fallback failed with status ${directResponse.status}`);
            }
          } catch (directErr) {
            console.error("Direct frontend fallback also failed in helper:", directErr);
            const fallbackErrMsg = "A temporary system congestion occurred. Please try again in a moment.";
            agentText = await translateTextHelper(fallbackErrMsg, "en", lang);
            englishResponse = fallbackErrMsg;
          }
        }

        agentText = agentText.replace(/\[inceliyor\]/gi, "");
        agentText = agentText.replace(/\[duraklama\]/gi, "");
        agentText = agentText.replace(/\[bekliyor\]/gi, "");
        agentText = agentText.replace(/\[düşünüyor\]/gi, "");
        agentText = agentText.replace(/\[[^\]]+\]/g, (match) => {
          if (match.toLowerCase().startsWith("[redirect:")) return match;
          return "";
        });
        agentText = agentText.trim().replace(/pulsar/gi, "Nexy");
        englishResponse = englishResponse.trim().replace(/pulsar/gi, "Nexy");

        const agentMsgId = Math.random().toString(36).substring(2, 9);
        setMessages((prev) => [
          ...prev,
          {
            role: "agent" as const,
            text: agentText,
            id: agentMsgId,
            timestamp: Date.now(),
            displayedText: "",
            englishText: englishResponse
          }
        ]);

        // Transition stage to typing with organic delay
        setThinkingStage("typing");
        setTimeout(() => {
          setIsAgentTyping(false);
          setTimeout(() => typeAgentMessage(agentText, agentMsgId), 50);
        }, 800);

      } catch (e) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "agent" as const,
              text: lang === "tr" ? "Bağlantı hatası oluştu, lütfen tekrar deneyin." : "Connection error, please try again.",
              id: Math.random().toString(36).substring(2, 9),
              timestamp: Date.now()
            }
          ]);
          setIsAgentTyping(false);
        }, 1500);
      }
    } finally {
      isSendingRef.current = false;
    }
  };

  const filteredMessages = messages.filter((m) =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--fun-card)] select-none animate-in fade-in duration-300">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-shimmer-text {
          background: linear-gradient(90deg, #a855f7 0%, #e9d5ff 50%, #a855f7 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 1.8s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Header */}
      <div
        className="p-5 sm:p-6 border-b flex items-center justify-between bg-[var(--fun-surface)] h-20 sm:h-24"
        style={{ borderColor: "var(--fun-stroke-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
            title={lang === "tr" ? "Geri" : "Back"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              {agentName}
            </h3>
            <p className={`text-[10px] sm:text-xs font-semibold mt-0.5 ${readOnly ? "text-red-600 dark:text-red-500 font-bold" : "fun-text-muted"}`}>
              {readOnly ? (lang === "tr" ? "Sonlandırıldı" : "Closed") : (lang === "tr" ? "Destek Asistanı" : "Support Assistant")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 z-10">
          <button
            onClick={() => setShowSearch(!showSearch)}
            title={lang === "tr" ? "Mesaj Ara" : "Search Messages"}
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          {setIsMaximized && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? (lang === "tr" ? "Küçült" : "Minimize") : (lang === "tr" ? "Büyüt" : "Maximize")}
              className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          )}
          {!readOnly && (
            <button
              onClick={() => setShowConfirmClose(true)}
              title={lang === "tr" ? "Görüşmeyi Sonlandır" : "End Session"}
              className="h-9 w-9 rounded-full hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors z-10"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {showSearch && (
        <div className="px-5 py-3 border-b border-[var(--fun-stroke-1)] bg-[var(--fun-surface)] animate-in slide-in-from-top-2">
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getTranslation(lang, "searchPlaceholder")}
            className="w-full bg-transparent text-xs fun-text outline-none"
          />
        </div>
      )}

      {/* Messages area */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-dots ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}
      >
        {/* Translation warning alert for non-Turkish languages */}
        {lang !== "tr" && !readOnly && (
          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[10px] sm:text-xs text-amber-500 font-medium leading-normal animate-in fade-in slide-in-from-top-2 duration-300">
            <Languages className="h-4 w-4 shrink-0 text-amber-500" />
            <span>{getTranslation(lang, "translationWarning")}</span>
          </div>
        )}

        {readOnly && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-[10px] sm:text-xs text-red-500 font-medium leading-normal">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{getTranslation(lang, "archivedWarning")}</span>
          </div>
        )}

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold fun-text">
                {lang === "tr" ? "Destek Sohbeti Başlatıldı" : "Support Chat Started"}
              </p>
              <p className="text-[10px] sm:text-[11px] fun-text-muted max-w-[200px] mt-1 leading-normal">
                {lang === "tr" ? `Destek asistanımız ${agentName} kısa süre içinde size yardımcı olacaktır.` : `Our support assistant ${agentName} will assist you shortly.`}
              </p>
            </div>
          </div>
        )}

        {(searchQuery ? filteredMessages : messages).map((m) => {
          const isSystemMsg = m.id === "system-details-init";

          // Clean, full Markdown & HTML Table renderer for Live Support message bubbles
          const renderMessageText = (text: string) => {
            if (!text) return null;

            // Clean up raw CSV/JSON blocks from the main visible text bubble to prevent clutters
            let cleanedText = text;
            const csvIdx = cleanedText.indexOf("```csv");
            if (csvIdx !== -1) {
              cleanedText = cleanedText.substring(0, csvIdx);
            }
            const jsonIdx = cleanedText.indexOf("```json");
            if (jsonIdx !== -1) {
              cleanedText = cleanedText.substring(0, jsonIdx);
            }
            cleanedText = cleanedText.replace(/```json[\s\S]*?```/gi, "");
            cleanedText = cleanedText.replace(/```csv[\s\S]*?```/gi, "");
            if (cleanedText.trim().startsWith("[") && cleanedText.trim().endsWith("]")) {
              cleanedText = "";
            }
            cleanedText = cleanedText.trim();

            if (!cleanedText && extractDownloadableData(text)) {
              return <p className="italic text-zinc-400 dark:text-zinc-500">{lang === "tr" ? "Dosyanız başarıyla oluşturuldu:" : "Your file was successfully generated:"}</p>;
            }

            const lines = cleanedText.split("\n");
            const result: React.ReactNode[] = [];
            let currentTable: string[][] = [];
            let inTable = false;

            const processLine = (line: string, key: string | number) => {
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return parts.map((part, pi) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={`${key}-${pi}`} className="font-extrabold text-[var(--fun-purple)] dark:text-purple-300">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                const italicParts = part.split(/(\*.*?\*)/g);
                return italicParts.map((iPart, ji) => {
                  if (iPart.startsWith("*") && iPart.endsWith("*")) {
                    return (
                      <em key={`${key}-${pi}-${ji}`} className="italic opacity-90">
                        {iPart.slice(1, -1)}
                      </em>
                    );
                  }
                  return iPart;
                });
              });
            };

            const renderTable = (tableData: string[][], tableKey: string | number) => {
              if (tableData.length === 0) return null;
              const headers = tableData[0];
              const rows = tableData.slice(1);

              return (
                <div
                  key={`table-wrapper-${tableKey}`}
                  className="overflow-x-auto my-3 border rounded-xl border-[var(--fun-stroke-1)] bg-[var(--fun-card)] shadow-sm"
                >
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-[var(--fun-surface)] text-[var(--fun-purple)] font-bold">
                      <tr>
                        {headers.map((cell, idx) => (
                          <th
                            key={idx}
                            className="p-2.5 border-b border-[var(--fun-stroke-1)] whitespace-nowrap"
                          >
                            {processLine(cell, `th-${idx}`)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-[var(--fun-surface)]/50 transition-colors">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-2.5 border-t border-[var(--fun-stroke-1)]">
                              {processLine(cell, `td-${rowIdx}-${cellIdx}`)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            };

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();

              if (line.startsWith("|") && line.includes("|")) {
                const cells = line
                  .split("|")
                  .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
                  .map((c) => c.trim());

                if (cells.every((c) => c.match(/^[ \-:]+$/))) {
                  continue;
                }

                if (!inTable) {
                  inTable = true;
                  currentTable = [cells];
                } else {
                  currentTable.push(cells);
                }
              } else {
                if (inTable) {
                  result.push(renderTable(currentTable, i));
                  currentTable = [];
                  inTable = false;
                }
                if (line || lines[i] === "") {
                  result.push(
                    <p key={i} className={lines[i] === "" ? "h-2" : "mb-1 leading-relaxed"}>
                      {processLine(lines[i], i)}
                    </p>,
                  );
                }
              }
            }

            if (inTable) {
              result.push(renderTable(currentTable, "end"));
            }

            return result;
          };

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isSystemMsg ? "items-center w-full" : m.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {isSystemMsg ? (
                <div className="w-full max-w-[90%] rounded-2xl p-4 bg-purple-500/5 border border-purple-500/20 text-xs font-medium leading-relaxed fun-text shadow-sm relative overflow-hidden my-2">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--fun-purple)]" />
                  <div className="pl-2">
                    {renderMessageText(m.text)}
                  </div>
                </div>
              ) : (
                <div className={`w-full flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed break-words overflow-hidden ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-br-none shadow-lg shadow-purple-500/10" : "bg-[var(--fun-surface)] fun-text border border-[var(--fun-stroke-1)] rounded-bl-none shadow-sm"}`}
                  >
                    {/* Render uploaded files/images strictly ABOVE the text bubble */}
                    {m.files && m.files.length > 0 && (
                      <div className="mb-2.5 space-y-2 max-w-full">
                        {/* Render Images in a Grid */}
                        {m.files.filter((f) => f.type.startsWith("image/")).length > 0 && (
                          <div className={`grid ${m.files.filter((f) => f.type.startsWith("image/")).length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
                            {m.files
                              .filter((f) => f.type.startsWith("image/"))
                              .map((file, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => setSelectedImage(file.base64 || file.thumbnail || "")}
                                  className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden border border-white/10 shadow-sm cursor-zoom-in hover:scale-[1.03] transition-transform"
                                >
                                  <img src={file.base64 || file.thumbnail} alt="Message attachment" className="h-full w-full object-cover" />
                                </div>
                              ))}
                          </div>
                        )}
                        {/* Render Documents (txt, doc, docx, pdf) as beautifully styled cards */}
                        {m.files.filter((f) => !f.type.startsWith("image/")).length > 0 && (
                          <div className="flex flex-col gap-1.5">
                            {m.files
                              .filter((f) => !f.type.startsWith("image/"))
                              .map((file, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => setSelectedDocument(file)}
                                  className="flex items-center gap-2.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 max-w-[240px] cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                >
                                  <div className="h-8 w-8 rounded-lg bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                                    <FileText className="h-4.5 w-4.5" />
                                  </div>
                                  <div className="min-w-0 flex-1 flex flex-col text-[10px]">
                                    <span className="font-bold truncate text-zinc-800 dark:text-zinc-200 leading-tight">
                                      {file.name}
                                    </span>
                                    <span className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                                      {file.size}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

                    {m.text && (
                      <div className="whitespace-pre-wrap">
                        {m.role === "user" ? m.text : renderMessageText(m.displayedText !== undefined ? m.displayedText : m.text)}

                        {/* Beautiful One-Time File Download Card directly inside the message bubble */}
                        {(() => {
                          const downloadable = extractDownloadableData(m.text);
                          if (downloadable) {
                            const isDownloaded = downloadedMessages[m.id];
                            const extension = downloadable.type;
                            return (
                              <div className="mt-3 p-3 rounded-xl border border-dashed border-purple-500/30 bg-purple-500/5 flex flex-col gap-2 max-w-[280px] text-zinc-800 dark:text-zinc-200">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-lg bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                                    <FileText className="h-4.5 w-4.5" />
                                  </div>
                                  <div className="min-w-0 flex-1 flex flex-col">
                                    <span className="font-bold truncate text-[11px] leading-tight text-zinc-800 dark:text-zinc-200">
                                      funteknoloji-veri.{extension}
                                    </span>
                                    <span className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                      {lang === "tr" ? "Tek Seferlik İndirme" : "One-Time Download Link"}
                                    </span>
                                  </div>
                                </div>
                                {isDownloaded ? (
                                  <button
                                    type="button"
                                    disabled
                                    className="w-full py-1.5 px-3 rounded-lg bg-zinc-200 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-500 text-[10px] font-bold flex items-center justify-center gap-1 cursor-not-allowed"
                                  >
                                    <span>{lang === "tr" ? "İndirildi (Süresi Doldu)" : "Downloaded (Expired)"}</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      triggerDataDownload(downloadable.data, downloadable.type);
                                      setDownloadedMessages((prev) => ({ ...prev, [m.id]: true }));
                                    }}
                                    className="w-full py-1.5 px-3 rounded-lg bg-[var(--fun-purple)] hover:bg-[var(--fun-purple)]/90 text-white text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                                  >
                                    <Download className="h-3 w-3" />
                                    <span>{lang === "tr" ? "Şimdi İndir" : "Download Now"}</span>
                                  </button>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Message Action Utilities (Copy and TTS reading) */}
                  {m.role === "agent" && (
                    <div className="mt-1.5 flex items-center gap-1.5 px-1 justify-start">
                      <button
                        onClick={() => copyToClipboard(m.text, m.id)}
                        className={`h-7 w-7 flex items-center justify-center rounded-full border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-all active:scale-95 ${copiedId === m.id ? "bg-green-500 text-white border-green-500 hover:bg-green-500" : ""}`}
                        title={lang === "tr" ? "Kopyala" : "Copy"}
                      >
                        {copiedId === m.id ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                      <button
                        onClick={() => speak(m.text, m.id)}
                        className={`h-7 w-7 flex items-center justify-center rounded-full border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white transition-all active:scale-95 ${speakingMessageIndex === m.id ? "bg-red-500 text-white border-red-500 hover:bg-red-500" : ""}`}
                        title={speakingMessageIndex === m.id ? "Durdur" : (lang === "tr" ? "Dinle" : "Speak")}
                      >
                        {speakingMessageIndex === m.id ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </button>
                      {(() => {
                        const downloadable = extractDownloadableData(m.text);
                        if (downloadable) {
                          return (
                            <button
                              onClick={() => triggerDataDownload(downloadable.data, downloadable.type)}
                              className="h-7 px-2.5 flex items-center justify-center gap-1 rounded-full border border-[var(--fun-stroke-1)] bg-[var(--fun-card)] fun-text hover:bg-[var(--fun-purple)] hover:text-white text-[10px] font-bold transition-all active:scale-95"
                              title={lang === "tr" ? "Dosyayı İndir" : "Download File"}
                            >
                              <Download className="h-3 w-3" />
                              <span>{downloadable.type.toUpperCase() === "JSON" ? "JSON İndir" : "CSV İndir"}</span>
                            </button>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}
                </div>
              )}
              {!isSystemMsg && (
                <span className="text-[9px] fun-text-muted mt-1 px-1 font-medium opacity-50">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          );
        })}

        {isAgentTyping && (
          <div className="flex flex-col items-start space-y-1 animate-in fade-in duration-300">
            <div className="bg-[var(--fun-surface)] rounded-2xl rounded-bl-none px-4 py-3 border border-[var(--fun-stroke-1)] shadow-sm">
              <div className="flex items-center gap-3">
                {/* Modern Tech Spinning Ring */}
                <div className="relative h-5 w-5 flex items-center justify-center shrink-0 mr-0.5">
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--fun-purple)]/20"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-t-[var(--fun-purple)] animate-spin"></div>
                </div>
                {/* Shimmering Context-Aware Loading Text */}
                <div className="flex items-center gap-2">
                  <span className="skeleton-shimmer-text text-xs tracking-tight font-extrabold">
                    {getAgentThinkingText()}
                  </span>
                  <div className="flex gap-1 items-center shrink-0">
                    <span className="h-1.5 w-1-5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="h-1.5 w-1-5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="h-1.5 w-1-5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Confirmation Close Modal Pop-up */}
      {showConfirmClose && (
        <div className="absolute inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-3xl p-6 text-center shadow-2xl max-w-[340px] w-full animate-in zoom-in-95 duration-200">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <h4 className="text-sm font-bold fun-text mb-2">
              {getTranslation(lang, "confirmCloseTitle")}
            </h4>
            <p className="text-xs fun-text-muted mb-5 leading-relaxed">
              {getTranslation(lang, "confirmCloseDesc")}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmClose(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--fun-surface)] hover:bg-[var(--fun-stroke-1)] text-xs font-semibold fun-text transition-colors"
              >
                {getTranslation(lang, "confirmCloseNo")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmClose(false);
                  setShowFeedback(true);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                {getTranslation(lang, "confirmCloseYes")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating / Feedback Modal Pop-up */}
      {showFeedback && (
        <div className="absolute inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-3xl p-6 text-center shadow-2xl max-w-[340px] w-full animate-in zoom-in-95 duration-200">
            <div className="h-12 w-12 rounded-2xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold fun-text mb-1">
              {lang === "tr" ? "Görüşmeyi Değerlendirin" : "Rate the Support Session"}
            </h4>
            <p className="text-xs fun-text-muted mb-4 leading-relaxed">
              {lang === "tr" ? "Hizmet kalitemizi artırmamıza yardımcı olun." : "Help us improve our support quality."}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 focus:outline-none transition-transform active:scale-90"
                >
                  <Star
                    className={`h-7 w-7 transition-colors duration-150 ${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Comment Textarea */}
            <textarea
              placeholder={lang === "tr" ? "Yorumunuzu veya değerlendirmenizi buraya yazabilirsiniz..." : "Leave your comments or feedback here..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full rounded-xl bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] px-3 py-2 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-2 focus:ring-[var(--fun-purple)]/20 transition-all resize-none fun-text mb-4"
            />

            <button
              type="button"
              disabled={rating === 0}
              onClick={async () => {
                // Fix: Verify and fetch the authentic, logged-in user session dynamically before inserting feedback to prevent failures
                // Securely save the ticket details, rating, and feedback directly into the database on session end
                try {
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user) {
                    const ticketSubject = localStorage.getItem("live_support_subject") || "Destek Talebi";
                    const ticketImportance = localStorage.getItem("live_support_importance") || "Orta";
                    const ticketDescription = localStorage.getItem("live_support_description") || "";

                    await supabase.from("ai_support_feedback").insert([
                      {
                        user_id: user.id,
                        subject: ticketSubject,
                        description: ticketDescription,
                        importance: ticketImportance,
                        rating: rating,
                        evaluation: comment || ""
                      }
                    ]);
                  }
                } catch (dbErr) {
                  console.error("Failed to save support ticket feedback to database:", dbErr);
                }

                toast.success(
                  lang === "tr" ? "Değerlendirmeniz Gönderildi" : "Feedback Submitted",
                  {
                    description: lang === "tr" ? "Geri bildiriminiz için çok teşekkür ederiz." : "Thank you so much for your feedback.",
                  }
                );
                // Call actual close sequence
                onEndSession();
                setShowFeedback(false);
                setRating(0);
                setComment("");
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              {lang === "tr" ? "Gönder ve Sonlandır" : "Submit & End Session"}
            </button>
          </div>
        </div>
      )}

      {/* Draft Attached Files previews bar */}
      {attachedFiles.length > 0 && (
        <div className="h-12 px-3 border-t bg-[var(--fun-surface)]/80 flex items-center gap-2 overflow-x-auto shrink-0 w-full max-w-full no-scrollbar" style={{ borderColor: "var(--fun-stroke-1)" }}>
          {attachedFiles.map((file, idx) => {
            const isImg = file.type.startsWith("image/");
            return (
              <div key={idx} className="relative flex items-center gap-1.5 px-2 py-1 bg-[var(--fun-card)] border border-[var(--fun-stroke-2)] rounded-lg shrink-0 h-8 group">
                {file.isAnalyzing ? (
                  <div className="h-6 w-6 rounded bg-[var(--fun-purple)]/5 border border-[var(--fun-purple)]/25 flex items-center justify-center shrink-0">
                    <svg className="animate-spin h-3.5 w-3.5 text-[var(--fun-purple)]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.3 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : isImg ? (
                  <div className="h-6 w-6 rounded overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                    <img src={file.base64 || file.thumbnail} alt="draft preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="flex flex-col text-[9px] max-w-[100px]">
                  <span className="font-bold truncate fun-text leading-none">{file.name}</span>
                  <span className="fun-text-muted mt-0.5 text-[8px] leading-none">
                    {file.isAnalyzing ? (
                      <span className="text-[var(--fun-purple)] font-bold animate-pulse">
                        {lang === "tr" ? "Yükleniyor..." : "Loading..."}
                      </span>
                    ) : (
                      file.size
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachedFile(idx)}
                  className="bg-black/40 hover:bg-black/70 text-white rounded-full h-4.5 w-4.5 flex items-center justify-center text-[8px] transition-colors ml-0.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Input */}
      {!readOnly && (
        <form
          onSubmit={handleSend}
          className="p-4 border-t bg-[var(--fun-surface)]/50 backdrop-blur-xl shrink-0"
          style={{ borderColor: "var(--fun-stroke-1)" }}
        >
          <div className={`flex items-center gap-2 ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}>
            {/* Generic File Attachment trigger button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.pdf,.doc,.docx,image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              disabled={isAgentTyping || !isOnline}
              onClick={() => fileInputRef.current?.click()}
              title={lang === "tr" ? "Dosya Ekle" : "Attach File"}
              className="h-10 w-10 shrink-0 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center text-zinc-400 hover:text-[var(--fun-purple)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                disabled={!isOnline}
                placeholder={isOnline ? getTranslation(lang, "typeMessage") : (lang === "tr" ? "İnternet bağlantısı yok." : "No internet connection.")}
                className="w-full rounded-[20px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] py-3 pl-4 pr-12 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/10 transition-all fun-text shadow-inner resize-none h-[42px] overflow-y-auto disabled:opacity-55 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={(!input.trim() && attachedFiles.length === 0) || isAgentTyping || !isOnline}
                className="absolute right-2.5 top-[21px] -translate-y-1/2 h-8 w-8 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 cursor-pointer z-10"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </form>
      )}


      {/* Image zoom modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-[85vh] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Fullscreen Attachment" className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
            <div className="absolute -top-12 right-0 flex gap-2">
              <a
                href={selectedImage}
                download="funteknoloji-live-attachment.png"
                className="text-white hover:text-zinc-300 font-bold text-xs bg-black/45 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                {lang === "tr" ? "İndir" : "Download"}
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-zinc-300 font-bold text-xs bg-black/45 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                ✕ {lang === "tr" ? "Kapat" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document viewer modal */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="bg-[var(--fun-card)] border border-[var(--fun-stroke-1)] rounded-3xl p-6 shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--fun-stroke-2)] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-[var(--fun-purple)]/10 text-[var(--fun-purple)] flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="font-bold truncate text-sm fun-text leading-tight">
                    {selectedDocument.name}
                  </span>
                  <span className="text-[10px] fun-text-muted mt-0.5">
                    {selectedDocument.size} • {selectedDocument.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Document Content Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] rounded-2xl min-h-[150px]">
              {selectedDocument.extractedText ? (
                <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed fun-text break-words">
                  {selectedDocument.extractedText}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
                  <FileText className="h-8 w-8 text-zinc-400 animate-pulse" />
                  <p className="text-xs fun-text-muted">
                    {lang === "tr" ? "Bu belgede okunabilir bir metin içeriği bulunamadı." : "No readable text content found in this document."}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer with Copy & Download Button Actions */}
            <div className="flex gap-3 shrink-0 pt-1">
              <button
                onClick={() => {
                  if (selectedDocument.extractedText) {
                    navigator.clipboard.writeText(selectedDocument.extractedText);
                    toast.success(lang === "tr" ? "Kopyalandı" : "Copied", {
                      description: lang === "tr" ? "Belge içeriği kopyalandı." : "Document content copied to clipboard."
                    });
                  }
                }}
                disabled={!selectedDocument.extractedText}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--fun-surface)] hover:bg-[var(--fun-stroke-1)] text-xs font-semibold fun-text transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Copy className="h-4 w-4" />
                {lang === "tr" ? "Metni Kopyala" : "Copy Text"}
              </button>
              <a
                href={selectedDocument.base64}
                download={selectedDocument.name}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--fun-purple)] hover:bg-[var(--fun-purple)]/90 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                {lang === "tr" ? "Dosyayı İndir" : "Download File"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
