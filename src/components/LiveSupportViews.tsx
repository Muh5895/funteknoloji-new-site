import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ArrowLeft, Send, MessageSquare, LogOut, Eye, EyeOff, Bot, Languages, Image as ImageIcon, AlertCircle, Download, Copy, Volume2, VolumeX, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { translateText } from "../lib/translate";
import { KNOWLEDGE_BASE } from "../lib/knowledge";

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
    errorNetwork: "发生网络错误。请检查您的互联网连接。",
    errorGeneric: "登录时发生错误。",
    confirmCloseTitle: "结束会话",
    confirmCloseDesc: "您确定要结束此在线客服会话吗？",
    confirmCloseYes: "是的，结束",
    confirmCloseNo: "取消",
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
  messages: { role: "agent" | "user"; text: string; id: string; timestamp: number; images?: string[] }[];
  setMessages: React.Dispatch<React.SetStateAction<{ role: "agent" | "user"; text: string; id: string; timestamp: number; images?: string[] }[]>>;
  onBack: () => void;
  onEndSession: () => void;
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
  onEndSession,
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
  const [showConfirmClose, setShowConfirmClose] = useState(false);
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

  // Dynamically generated professional Turkish support representative name, saved on session mount
  const [agentName, setAgentName] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("live_support_agent_name");
      if (saved) return saved;
      const names = ["Emre", "Ahmet", "Yiğit", "Elif", "Burak", "Kaan", "Ceren", "Selin", "Mert", "Deniz"];
      const chosen = names[Math.floor(Math.random() * names.length)];
      localStorage.setItem("live_support_agent_name", chosen);
      return chosen;
    }
    return "Müşteri Temsilcisi";
  });

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

    // Prepare system message to instruct the AI model correctly as a support agent
    const formattedMessages = [];
    formattedMessages.push({
      role: "system",
      content: `Sen Fun Teknoloji şirketinin canlı destek panelinde çalışan profesyonel bir müşteri temsilcisisin. Adın ${agentName}.
Fun Teknoloji'nin projeleri ve bilgileri:
${KNOWLEDGE_BASE}

Görevin: Kullanıcıların canlı destek taleplerini en samimi, kibar ve profesyonel şekilde Türkçe dilinde çözmektir. Soruları bilgi bankasına göre cevapla.
Cevaplarında Pollinations, Pulsar veya başka bir servis reklamı yapma, sadece Fun Teknoloji'nin cana yakın müşteri temsilcisi olarak konuş.`,
    });

    // Map live support conversation history into standard OpenAI messages format with a longer, 20-message memory window
    const historyMessages = messages
      .slice(-20)
      .map((m) => ({
        role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant" | "system",
        content: m.text,
      }));

    formattedMessages.push(...historyMessages);

    // Add current user text in Turkish
    formattedMessages.push({
      role: "user" as const,
      content: userTextInTr,
    });

    // Helper to ensure messages list starts with user role and strictly alternates user/assistant.
    // Gemma-3-1b-it chat template (Jinja) throws 400 Bad Request if roles do not alternate or start with user.
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
      let cleanText = "";

      try {
        // Route 1: Direct fetch to Fun Teknoloji completions endpoint
        const response = await fetch("https://ai.funteknoloji.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: cleanedMessages,
            model: "gemma-3-1b-it"
          }),
        });
        if (response.ok) {
          const data = await response.json() as any;
          let text = data.choices?.[0]?.message?.content || "";
          text = text.replace(/pulsar/gi, "Nexy");
          cleanText = text.trim();
        } else {
          throw new Error("Direct API failed");
        }
      } catch (err) {
        console.warn("Direct API call failed, trying Vercel backend proxy fallback:", err);
        try {
          // Route 2: Fallback to Vercel backend proxy /api/nexy
          const response = await fetch("/api/nexy", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: cleanedMessages,
              model: "gemma-3-1b-it"
            }),
          });
          if (response.ok) {
            const text = await response.text();
            cleanText = text.trim();
          } else {
            throw new Error("Backend proxy failed");
          }
        } catch (proxyErr) {
          console.error("Vercel backend proxy also failed:", proxyErr);
        }
      }

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
            className="p-2 -ml-1 rounded-lg hover:bg-[var(--fun-stroke-1)] fun-text flex items-center justify-center shrink-0"
            title={lang === "tr" ? "Geri" : "Back"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight fun-text leading-tight">
              {agentName}
            </h3>
            <p className={`text-[10px] sm:text-xs font-semibold mt-0.5 ${readOnly ? "text-red-600 dark:text-red-500 font-bold" : "text-green-500 dark:text-green-400"}`}>
              {readOnly ? (lang === "tr" ? "Sonlandırıldı" : "Closed") : getTranslation(lang, "online")}
            </p>
          </div>
        </div>
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
                {lang === "tr" ? `Müşteri temsilcimiz ${agentName} kısa süre içinde size yardımcı olacaktır.` : `Our customer agent ${agentName} will assist you shortly.`}
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isSystemMsg = m.id === "system-details-init";

          // Basic local Markdown Bold & Italic parser for message bubbles
          const renderMessageText = (text: string) => {
            if (!text) return null;
            const lines = text.split("\n");
            return lines.map((line, idx) => {
              const parts = line.split(/(\*\*.*?\*\*)/g);
              const content = parts.map((part, pi) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={pi} className="font-extrabold text-[var(--fun-purple)] dark:text-purple-300">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                const italicParts = part.split(/(\*.*?\*)/g);
                return italicParts.map((iPart, ji) => {
                  if (iPart.startsWith("*") && iPart.endsWith("*")) {
                    return (
                      <em key={ji} className="italic opacity-90">
                        {iPart.slice(1, -1)}
                      </em>
                    );
                  }
                  return iPart;
                });
              });
              return (
                <div key={idx} className={line === "" ? "h-2" : "mb-1"}>
                  {content}
                </div>
              );
            });
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
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${m.role === "user" ? "bg-[var(--fun-purple)] text-white rounded-br-none shadow-lg shadow-purple-500/10" : "bg-[var(--fun-surface)] fun-text border border-[var(--fun-stroke-1)] rounded-bl-none shadow-sm"}`}
                  >
                    {m.text && (
                      <div className="whitespace-pre-wrap">
                        {m.role === "user" ? m.text : renderMessageText(m.text)}
                      </div>
                    )}

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

                  {/* Message Action Utilities (Copy and TTS reading) */}
                  {m.role === "agent" && (
                    <div className={`mt-1.5 flex items-center gap-1.5 px-1 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
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
              onClick={() => {
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-[var(--fun-purple)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-purple-500/30 cursor-pointer z-10"
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
    </div>
  );
}
