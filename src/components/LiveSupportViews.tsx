import { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, Send, MessageSquare, LogOut, Eye, EyeOff, Bot, Languages, Image as ImageIcon, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { translateText } from "../lib/translate";

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

// 12-language localized dictionary for the Live Support views
const localTrans: Record<string, any> = {
  tr: {
    loginTitle: "Canlı Desteğe Giriş Yap",
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
    onlineAgent: "Destek Temsilcisi Can",
    typeMessage: "Mesajınızı yazın...",
    logout: "Oturumu Kapat",
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
    onlineAgent: "Support Agent Can",
    typeMessage: "Type your message...",
    logout: "Logout",
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
    onlineAgent: "Support-Mitarbeiter Can",
    typeMessage: "Schreiben Sie Ihre Nachricht...",
    logout: "Abmelden",
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
    onlineAgent: "Agent de support Can",
    typeMessage: "Tapez votre message...",
    logout: "Se déconnecter",
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
    translationWarning: "Los mensajes se traducen automáticamente y pueden contener errores.",
    imageLimitError: "Puede subir un máximo de 5 imágenes.",
    archivedWarning: "Este chat ha finalizado. No se pueden enviar mensajes nuevos.",
    online: "En línea",
    onlineAgent: "Agente de soporte Can",
    typeMessage: "Escriba su mensaje...",
    logout: "Cerrar sesión",
  },
  az: {
    loginTitle: "Canlı Dəstəyə Giriş Edin",
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
    onlineAgent: "Dəstək Nümayəndəsi Can",
    typeMessage: "Mesajınızı yazın...",
    logout: "Çıxış et",
  },
  ru: {
    loginTitle: "Вход в живую поддержку",
    loginDesc: "Войдите, чтобы продолжить",
    email: "Электронная почта",
    password: "Пароль",
    loginBtn: "Войти",
    loggingIn: "Вход...",
    fillFields: "Пожалуйста, заполните все поля.",
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
    onlineAgent: "Агент поддержки Can",
    typeMessage: "Введите ваше сообщение...",
    logout: "Выйти",
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
    onlineAgent: "وكيل الدعم Can",
    typeMessage: "اكتب رسالتك...",
    logout: "تسجيل الخروج",
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
    imageLimitError: "Puoi caricare un massimo di 5 immagini.",
    archivedWarning: "Questa chat è terminata. Non è possibile inviare nuovi messaggi.",
    online: "Online",
    onlineAgent: "Agente di supporto Can",
    typeMessage: "Digita il tuo messaggio...",
    logout: "Esci",
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
    onlineAgent: "Agente de suporte Can",
    typeMessage: "Digite sua mensagem...",
    logout: "Sair",
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
    onlineAgent: "サポート担当者 Can",
    typeMessage: "メッセージを入力してください...",
    logout: "ログアウト",
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
    onlineAgent: "客服代表 Can",
    typeMessage: "输入您要发送的消息...",
    logout: "退出登录",
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
        toast.error(error.message);
      } else if (data?.user) {
        toast.success(getTranslation(lang, "loginSuccess"));
        onLoginSuccess({ email: data.user.email || email });
      }
    } catch (err: any) {
      toast.error(err.message || "Login error");
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
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
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

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 p-5 sm:p-6 flex flex-col justify-center gap-4">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-2 rounded-xl bg-[var(--fun-purple)] text-white font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? getTranslation(lang, "loggingIn") : getTranslation(lang, "loginBtn")}
        </button>
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
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
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
  messages: { role: "agent" | "user"; text: string; id: string; timestamp: number; images?: string[] }[];
  setMessages: React.Dispatch<React.SetStateAction<{ role: "agent" | "user"; text: string; id: string; timestamp: number; images?: string[] }[]>>;
  onBack: () => void;
  onLogout: () => void;
  lang: string;
  isAgentTyping: boolean;
  setIsAgentTyping: (typing: boolean) => void;
  isMaximized: boolean;
  readOnly?: boolean;
}

export function LiveChatView({
  user,
  messages,
  setMessages,
  onBack,
  onLogout,
  lang,
  isAgentTyping,
  setIsAgentTyping,
  isMaximized,
  readOnly = false,
}: LiveChatViewProps) {
  const [input, setInput] = useState("");
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (attachedImages.length + files.length > 5) {
      // Correct built-in Sonner warning icon without custom emojis
      toast.error(getTranslation(lang, "imageLimitError"));
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAttachedImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachedImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachedImages.length === 0) || isAgentTyping || readOnly) return;

    const userText = input.trim();
    const currentAttachedImages = [...attachedImages];

    const userMsg = {
      role: "user" as const,
      text: userText,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      images: currentAttachedImages,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachedImages([]);
    setIsAgentTyping(true);

    // Dynamic dual-translation: Translate user text to Turkish if language is not Turkish
    let userTextInTr = userText;
    if (lang !== "tr" && userText) {
      userTextInTr = await translateToTurkish(userText, lang);
    }

    // Agent "Can" system instructions - Agent Can always speaks in Turkish
    const prompt = `System: Sen Fun Teknoloji şirketinin canlı destek ekibinden Can'sın.
    Giriş yapan kullanıcının e-postası: ${user.email}.
    Sen bir yapay zeka değilsin, gerçek bir canlı destek temsilcisisin. Doğal, dost canlısı, profesyonel, Türkçe konuşacaksın.
    Cevaplarını kısa tut (maksimum 1-2 cümle) ve Pollinations veya başka servislerin adını geçirme, sadece Fun Teknoloji adına yardımcı ol.

    Konuşma Geçmişi:
    ${messages.slice(-6).map(m => `${m.role === "user" ? "User" : "Agent Can"}: ${m.text}`).join("\n")}
    User: ${userTextInTr}`;

    try {
      const response = await fetch(
        `/api/nexy/${encodeURIComponent(prompt)}?model=openai&cache=false`
      );
      const text = await response.text();
      const cleanText = text
        .replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, "")
        .replace(/Powered by Pollinations\.AI.*/gi, "")
        .trim();

      // Translate Agent's Turkish response to user's local language if not Turkish
      let agentText = cleanText || (lang === "tr" ? "Size nasıl yardımcı olabilirim?" : "How can I assist you?");
      if (lang !== "tr") {
        agentText = await translateText({ text: agentText, targetLang: lang });
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent" as const,
            text: agentText,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: Date.now()
          }
        ]);
        setIsAgentTyping(false);
      }, 1500);
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
            className="h-8 w-8 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center fun-text transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              Can
            </h3>
            <p className="text-[10px] sm:text-xs text-green-500 font-semibold mt-0.5 animate-pulse">
              {readOnly ? (lang === "tr" ? "Sonlandırıldı" : "Closed") : getTranslation(lang, "online")}
            </p>
          </div>
        </div>
        {!readOnly && (
          <button
            onClick={onLogout}
            title={getTranslation(lang, "logout")}
            className="h-9 w-9 rounded-full hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-dots"
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
                {lang === "tr" ? "Canlı Sohbet Başlatıldı" : "Live Chat Started"}
              </p>
              <p className="text-[10px] sm:text-[11px] fun-text-muted max-w-[200px] mt-1 leading-normal">
                {lang === "tr" ? "Müşteri temsilcimiz Can kısa süre içinde size yardımcı olacaktır." : "Our customer agent Can will assist you shortly."}
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-br-none shadow-lg shadow-purple-500/10" : "bg-[var(--fun-surface)] fun-text border border-[var(--fun-stroke-1)] rounded-bl-none shadow-sm"}`}
            >
              {m.text && <p className="whitespace-pre-wrap">{m.text}</p>}

              {/* Images Grid inside message bubble */}
              {m.images && m.images.length > 0 && (
                <div className={`grid ${m.images.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"} gap-2 mt-2`}>
                  {m.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border border-white/10 shadow-sm cursor-zoom-in hover:scale-105 transition-transform"
                    >
                      <img src={img} alt="Uploaded attachment" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[9px] fun-text-muted mt-1 px-1 font-medium opacity-50">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}

        {isAgentTyping && (
          <div className="flex flex-col items-start space-y-1">
            <div className="bg-[var(--fun-surface)] rounded-2xl rounded-bl-none px-4 py-3 border border-[var(--fun-stroke-1)]">
              <div className="flex gap-1.5 items-center">
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Draft Attached Images previews bar */}
      {attachedImages.length > 0 && (
        <div className="p-3 border-t bg-[var(--fun-surface)]/80 flex items-center gap-3 overflow-x-auto" style={{ borderColor: "var(--fun-stroke-1)" }}>
          {attachedImages.map((img, idx) => (
            <div key={idx} className="relative h-12 w-12 rounded-lg border border-[var(--fun-stroke-2)] overflow-hidden shrink-0 group">
              <img src={img} alt="draft preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAttachedImage(idx)}
                className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-black/90 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      {!readOnly && (
        <form
          onSubmit={handleSend}
          className="p-4 border-t bg-[var(--fun-surface)]/50 backdrop-blur-xl"
          style={{ borderColor: "var(--fun-stroke-1)" }}
        >
          <div className={`flex items-center gap-2 ${isMaximized ? "max-w-4xl mx-auto w-full" : ""}`}>
            {/* Image Attachment trigger button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              disabled={isAgentTyping}
              onClick={() => fileInputRef.current?.click()}
              title={lang === "tr" ? "Resim Ekle" : "Attach Image"}
              className="h-10 w-10 shrink-0 rounded-full hover:bg-[var(--fun-stroke-1)] flex items-center justify-center text-zinc-400 hover:text-[var(--fun-purple)] transition-colors disabled:opacity-40"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getTranslation(lang, "typeMessage")}
                className="w-full rounded-[20px] bg-[var(--fun-surface)] border border-[var(--fun-stroke-2)] py-3 pl-4 pr-12 text-xs outline-none focus:border-[var(--fun-purple)] focus:ring-4 focus:ring-[var(--fun-purple)]/10 transition-all fun-text shadow-inner"
              />
              <button
                type="submit"
                disabled={(!input.trim() && attachedImages.length === 0) || isAgentTyping}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 cursor-pointer"
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
          <div className="relative max-w-full max-h-[85vh] animate-in zoom-in-95 duration-200">
            <img src={selectedImage} alt="Fullscreen Attachment" className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-zinc-300 font-bold text-sm bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              ✕ {lang === "tr" ? "Kapat" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
