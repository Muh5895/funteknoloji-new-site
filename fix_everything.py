import re
import os

def fix_i18n():
    with open('src/lib/i18n.tsx', 'r') as f:
        content = f.read()

    # 1. 404 Title
    content = re.sub(r'"404.title": ".*?"', '"404.title": "404"', content)

    # 2. FAQ Translations
    langs = ["tr", "en", "de", "fr", "es", "az", "ru", "ar", "it", "pt", "ja", "zh"]
    faq_data = {
        "tr": {
            "home.faq.q3": "Projeler ne kadar sürede tamamlanıyor?",
            "home.faq.a3": "Projenin kapsamına göre değişmekle birlikte, küçük projeleri 2-4 hafta, kapsamlı projeleri ise 2-4 ay içinde tamamlıyoruz.",
            "home.faq.q4": "Fiyatlandırma nasıl yapılıyor?",
            "home.faq.a4": "Fiyatlandırma, projenizin karmaşıklığına ve ihtiyaç duyulan özelliklere göre özel olarak belirlenir.",
            "home.faq.q5": "Yapay zeka sistemlerimize entegre edilebilir mi?",
            "home.faq.a5": "Evet, yapay zeka modellerini mevcut sistemlerinize entegre etme konusunda uzmanız.",
            "home.faq.q6": "Ücretsiz danışmanlık alabilir miyim?",
            "home.faq.a6": "Elbette! Proje fikirlerinizi bizimle paylaşabilir, ücretsiz danışmanlık alabilirsiniz.",
            "home.faq.q7": "Mobil uygulama geliştiriyor musunuz?",
            "home.faq.a7": "Evet, hem iOS hem de Android platformları için modern mobil uygulamalar geliştiriyoruz."
        },
        "en": {
            "home.faq.q3": "How long does it take to complete projects?",
            "home.faq.a3": "Although it varies depending on the scope of the project, we complete small projects within 2-4 weeks and comprehensive projects within 2-4 months.",
            "home.faq.q4": "How is pricing done?",
            "home.faq.a4": "Pricing is specifically determined by the complexity of your project and the features needed.",
            "home.faq.q5": "Can AI be integrated into our systems?",
            "home.faq.a5": "Yes, we specialize in integrating AI models into your existing systems.",
            "home.faq.q6": "Can I get a free consultation?",
            "home.faq.a6": "Certainly! You can share your project ideas with us and get free consultancy.",
            "home.faq.q7": "Do you develop mobile applications?",
            "home.faq.a7": "Yes, we develop modern mobile applications for both iOS and Android platforms."
        },
        "de": {
            "home.faq.q1": "Was ist Fun Technology?",
            "home.faq.a1": "Fun Technology ist ein Technologieunternehmen, das sich auf künstliche Intelligenz, kundenspezifische Softwareentwicklung und digitale Transformation spezialisiert hat.",
            "home.faq.q2": "Bieten Sie technischen Support an?",
            "home.faq.a2": "Ja, wir bieten rund um die Uhr technischen Support und Wartungsdienste für Ihre Projekte.",
            "home.faq.q3": "Wie lange dauert die Projektabwicklung?",
            "home.faq.a3": "Obwohl es je nach Projektumfang unterschiedlich ist, schließen wir kleine Projekte innerhalb von 2-4 Wochen und umfassende Projekte innerhalb von 2-4 Monaten ab.",
            "home.faq.q4": "Wie erfolgt die Preisgestaltung?",
            "home.faq.a4": "Die Preisgestaltung richtet sich speziell nach der Komplexität Ihres Projekts und den benötigten Funktionen.",
            "home.faq.q5": "Kann KI in unsere Systeme integriert werden?",
            "home.faq.a5": "Ja, wir sind auf die Integration von KI-Modellen in Ihre bestehenden Systeme spezialisiert.",
            "home.faq.q6": "Kann ich eine kostenlose Beratung erhalten?",
            "home.faq.a6": "Sicherlich! Sie können Ihre Projektideen mit uns teilen und sich kostenlos beraten lassen.",
            "home.faq.q7": "Entwickeln Sie mobile Anwendungen?",
            "home.faq.a7": "Ja, wir entwickeln moderne mobile Anwendungen sowohl für iOS- als auch für Android-Plattformen."
        },
        "fr": {
            "home.faq.q1": "Qu'est-ce que Fun Technology ?",
            "home.faq.a1": "Fun Technology est une entreprise technologique spécialisée dans l'intelligence artificielle, le développement de logiciels personnalisés et la transformation numérique.",
            "home.faq.q2": "Fournissez-vous un support technique ?",
            "home.faq.a2": "Oui, nous proposons des services d'assistance technique et de maintenance 24h/24 et 7j/7 pour vos projets.",
            "home.faq.q3": "Combien de temps faut-il pour réaliser les projets ?",
            "home.faq.a3": "Bien que cela varie en fonction de la portée du projet, nous réalisons de petits projets en 2 à 4 semaines et des projets complets en 2 à 4 mois.",
            "home.faq.q4": "Comment se fait la tarification ?",
            "home.faq.a4": "Le prix est spécifiquement déterminé par la complexité de votre projet et les fonctionnalités nécessaires.",
            "home.faq.q5": "L'IA peut-elle être intégrée à nos systèmes ?",
            "home.faq.a5": "Oui, nous sommes spécialisés dans l’intégration de modèles d’IA dans vos systèmes existants.",
            "home.faq.q6": "Puis-je obtenir une consultation gratuite ?",
            "home.faq.a6": "Certainement ! Vous pouvez partager vos idées de projets avec nous et bénéficier de conseils gratuits.",
            "home.faq.q7": "Développez-vous des applications mobiles ?",
            "home.faq.a7": "Oui, nous développons des applications mobiles modernes pour les plateformes iOS et Android."
        },
        "es": {
            "home.faq.q1": "¿Qué es Fun Technology?",
            "home.faq.a1": "Fun Technology es una empresa de tecnología especializada en inteligencia artificial, desarrollo de software personalizado y transformación digital.",
            "home.faq.q2": "¿Ofrecen soporte técnico?",
            "home.faq.a2": "Sí, ofrecemos soporte técnico y mantenimiento 24/7 para sus proyectos.",
            "home.faq.q3": "¿Cuánto tiempo se tarda en completar los proyectos?",
            "home.faq.a3": "Aunque varía según el alcance del proyecto, completamos proyectos pequeños en 2-4 semanas y proyectos integrales en 2-4 meses.",
            "home.faq.q4": "¿Cómo se realiza la tarificación?",
            "home.faq.a4": "El precio se determina específicamente por la complejidad de su proyecto y las características necesarias.",
            "home.faq.q5": "¿Se puede integrar la IA en nuestros sistemas?",
            "home.faq.a5": "Sí, nos especializamos en integrar modelos de IA en sus sistemas existentes.",
            "home.faq.q6": "¿Puedo obtener una consulta gratuita?",
            "home.faq.a6": "¡Ciertamente! Puede compartir sus ideas de proyectos con nosotros y obtener consultoría gratuita.",
            "home.faq.q7": "¿Desarrollan aplicaciones móviles?",
            "home.faq.a7": "Sí, desarrollamos aplicaciones móviles modernas para plataformas iOS and Android."
        },
        "az": {
            "home.faq.q1": "Fun Teknoloji nədir?",
            "home.faq.a1": "Fun Teknoloji, süni intellekt, xüsusi proqram təminatının hazırlanması və rəqəmsal transformasiya sahələrində ixtisaslaşmış bir texnologiya şirkətidir.",
            "home.faq.q2": "Texniki dəstək verirsiniz?",
            "home.faq.a2": "Bəli, layihələriniz üçün 7/24 texniki dəstək və texniki xidmət təklif edirik.",
            "home.faq.q3": "Layihələr nə qədər vaxta tamamlanır?",
            "home.faq.a3": "Layihənin əhatə dairəsindən asılı olaraq dəyişsə də, kiçik layihələri 2-4 həftə, geniş layihələri isə 2-4 ay ərzində tamamlayırıq.",
            "home.faq.q4": "Qiymət necə müəyyən olunur?",
            "home.faq.a4": "Qiymətlər layihənizin mürəkkəbliyinə və lazım olan xüsusiyyətlərə görə xüsusi olaraq müəyyən edilir.",
            "home.faq.q5": "Süni intellekt sistemlərimizə inteqrasiya oluna bilərmi?",
            "home.faq.a5": "Bəli, süni intellekt modellərini mövcud sistemlərinizə inteqrasiya etmək sahəsində mütəxəssisik.",
            "home.faq.q6": "Pulsuz məsləhət ala bilərəmmi?",
            "home.faq.a6": "Əlbəttə! Layihə ideyalarınızı bizimlə bölüşə və pulsuz məsləhət ala bilərsiniz.",
            "home.faq.q7": "Mobil tətbiq hazırlayırsınız?",
            "home.faq.a7": "Bəli, həm iOS, həm də Android platformaları üçün müasir mobil proqramlar hazırlayırıq."
        },
        "ru": {
            "home.faq.q1": "Что такое Fun Technology?",
            "home.faq.a1": "Fun Technology — это технологическая компания, специализирующаяся на искусственном интеллекте, разработке программного обеспечения на заказ и цифровой трансформации.",
            "home.faq.q2": "Предоставляете ли вы техническую поддержку?",
            "home.faq.a2": "Да, мы предлагаем круглосуточную техническую поддержку и обслуживание ваших проектов.",
            "home.faq.q3": "Сколько времени занимает выполнение проектов?",
            "home.faq.a3": "Хотя сроки зависят от масштаба проекта, мы завершаем небольшие проекты за 2–4 недели, а комплексные — за 2–4 месяца.",
            "home.faq.q4": "Как определяется цена?",
            "home.faq.a4": "Цена определяется индивидуально в зависимости от сложности вашего проекта и необходимых функций.",
            "home.faq.q5": "Можно ли интегрировать ИИ в наши системы?",
            "home.faq.a5": "Да, мы специализируемся на интеграции моделей ИИ в ваши существующие системы.",
            "home.faq.q6": "Могу ли я получить бесплатную консультацию?",
            "home.faq.a6": "Конечно! Вы можете поделиться с нами своими идеями и получить бесплатную консультацию.",
            "home.faq.q7": "Разрабатываете ли вы мобильные приложения?",
            "home.faq.a7": "Да, мы разрабатываем современные мобильные приложения для платформ iOS и Android."
        },
        "ar": {
            "home.faq.q1": "ما هي Fun Technology؟",
            "home.faq.a1": "Fun Technology هي شركة تقنية متخصصة في الذكاء الاصطناعي وتطوير البرمجيات المخصصة والتحول الرقمي.",
            "home.faq.q2": "هل تقدمون الدعم الفني؟",
            "home.faq.a2": "نعم، نحن نقدم دعماً فنياً وصيانة على مدار الساعة طوال أيام الأسبوع لمشاريعكم.",
            "home.faq.q3": "كم من الوقت يستغرق إكمال المشاريع؟",
            "home.faq.a3": "على الرغم من أنها تختلف حسب نطاق المشروع، إلا أننا نكمل المشاريع الصغيرة في غضون 2-4 أسابيع، والمشاريع الشاملة في غضون 2-4 أشهر.",
            "home.faq.q4": "كيف يتم تحديد الأسعار؟",
            "home.faq.a4": "يتم تحديد السعر خصيصاً بناءً على تعقيد مشروعكم والميزات المطلوبة.",
            "home.faq.q5": "هل يمكن دمج الذكاء الاصطناعي في أنظمتنا؟",
            "home.faq.a5": "نعم، نحن متخصصون في دمج نماذج الذكاء الاصطناعي في أنظمتكم الحالية.",
            "home.faq.q6": "هل يمكنني الحصول على استشارة مجانية؟",
            "home.faq.a6": "بالتأكيد! يمكنكم مشاركة أفكار مشاريعكم معنا والحصول على استشارة مجانية.",
            "home.faq.q7": "هل تقومون بتطوير تطبيقات الجوال؟",
            "home.faq.a7": "نعم، نحن نطور تطبيقات جوال حديثة لمنصتي iOS وAndroid."
        },
        "it": {
            "home.faq.q1": "Cos'è Fun Technology?",
            "home.faq.a1": "Fun Technology è un'azienda tecnologica specializzata in intelligenza artificiale, sviluppo software personalizzato e trasformazione digitale.",
            "home.faq.q2": "Fornite supporto tecnico?",
            "home.faq.a2": "Sì, offriamo supporto tecnico e manutenzione 24/7 per i vostri progetti.",
            "home.faq.q3": "Quanto tempo occorre per completare i progetti?",
            "home.faq.a3": "Sebbene vari in base alla portata del progetto, completiamo i piccoli progetti in 2-4 settimane e i progetti complessi in 2-4 mesi.",
            "home.faq.q4": "Come viene stabilito il prezzo?",
            "home.faq.a4": "Il prezzo è determinato specificamente dalla complessità del progetto e dalle funzionalità richieste.",
            "home.faq.q5": "L'IA può essere integrata nei nostri sistemi?",
            "home.faq.a5": "Sì, siamo specializzati nell'integrazione di modelli di IA nei vostri sistemi esistenti.",
            "home.faq.q6": "Posso avere una consulenza gratuita?",
            "home.faq.a6": "Certamente! Potete condividere le vostre idee di progetto con noi e ricevere una consulenza gratuita.",
            "home.faq.q7": "Sviluppate applicazioni mobili?",
            "home.faq.a7": "Sì, sviluppiamo moderne applicazioni mobili per piattaforme iOS and Android."
        },
        "pt": {
            "home.faq.q1": "O que é Fun Technology?",
            "home.faq.a1": "A Fun Technology é uma empresa de tecnologia especializada em inteligência artificial, desenvolvimento de software personalizado e transformação digital.",
            "home.faq.q2": "Você fornece suporte técnico?",
            "home.faq.a2": "Sim, oferecemos suporte técnico e manutenção 24/7 para seus projetos.",
            "home.faq.q3": "Quanto tempo leva para concluir os projetos?",
            "home.faq.a3": "Embora varie dependendo do escopo do projeto, concluímos projetos pequenos em 2-4 semanas e projetos abrangentes em 2-4 meses.",
            "home.faq.q4": "Como é feito o preço?",
            "home.faq.a4": "O preço é determinado especificamente pela complexidade do seu projeto e pelos recursos necessários.",
            "home.faq.q5": "A IA pode ser integrada em nossos sistemas?",
            "home.faq.a5": "Sim, somos especialistas na integração de modelos de IA nos seus sistemas existentes.",
            "home.faq.q6": "Posso obter uma consulta gratuita?",
            "home.faq.a6": "Certamente! Você pode compartilhar suas ideias de projeto conosco e obter consultoria gratuita.",
            "home.faq.q7": "Vocês desenvolvem aplicações móveis?",
            "home.faq.a7": "Sim, desenvolvemos aplicações móveis modernas para as plataformas iOS and Android."
        },
        "ja": {
            "home.faq.q1": "Fun Technologyとは何ですか？",
            "home.faq.a1": "Fun Technologyは、人工知能、カスタムソフトウェア開発、デジタルトランスフォーメーションを専門とするテクノロジー企業です。",
            "home.faq.q2": "テクニカルサポートはありますか？",
            "home.faq.a2": "はい、お客様のプロジェクトに対して24時間年中無休のテクニカルサポートとメンテナンスサービスを提供しています。",
            "home.faq.q3": "プロジェクトの完了にはどのくらい時間がかかりますか？",
            "home.faq.a3": "プロジェクトの規模により異なりますが、小規模なプロジェクトは2〜4週間、包括的なプロジェクトは2〜4ヶ月で完了します。",
            "home.faq.q4": "価格設定はどのようになっていますか？",
            "home.faq.a4": "価格は、プロジェクトの複雑さや必要な機能に基づいて個別に決定されます。",
            "home.faq.q5": "AIを既存のシステムに統合できますか？",
            "home.faq.a5": "はい、AIモデルを既存のシステムに統合することに特化しています。",
            "home.faq.q6": "無料相談は可能ですか？",
            "home.faq.a6": "もちろんです！プロジェクトのアイデアを共有していただければ、無料のコンサルティングを提供いたします。",
            "home.faq.q7": "モバイルアプリの開発は行っていますか？",
            "home.faq.a7": "はい、iOSとAndroidの両方のプラットフォーム向けに最新のモバイルアプリケーションを開発しています。"
        },
        "zh": {
            "home.faq.q1": "什么是趣味科技？",
            "home.faq.a1": "趣味科技（Fun Technology）是一家专注于人工智能、定制软件开发和数字化转型的科技公司。",
            "home.faq.q2": "你们提供技术支持吗？",
            "home.faq.a2": "是的，我们为您的项目提供 24/7 全天候技术支持和维护服务。",
            "home.faq.q3": "完成项目需要多长时间？",
            "home.faq.a3": "虽然取决于项目范围，但我们通常在 2-4 周内完成小型项目，在 2-4 个月内完成综合项目。",
            "home.faq.q4": "如何定价？",
            "home.faq.a4": "价格根据项目的复杂程度和所需功能专门确定。",
            "home.faq.q5": "AI 可以集成到我们的系统中吗？",
            "home.faq.a5": "是的，我们擅长将 AI 模型集成到您现有的系统中。",
            "home.faq.q6": "我可以获得免费咨询吗？",
            "home.faq.a6": "当然可以！您可以与我们分享您的项目想法，获取免费咨询。",
            "home.faq.q7": "你们开发移动应用吗？",
            "home.faq.a7": "是的，我们为 iOS 和 Android 平台开发先进的移动应用程序。"
        }
    }

    # Also add help button translations if missing
    help_button_translations = {
        "tr": "Yardım", "en": "Help", "de": "Hilfe", "fr": "Aide", "es": "Ayuda", "az": "Kömək",
        "ru": "Помощь", "ar": "مساعدة", "it": "Aiuto", "pt": "Ajuda", "ja": "ヘルプ", "zh": "帮助"
    }

    for lang in langs:
        match = re.search(f'const {lang}: Dict = {{', content)
        if not match: continue
        dict_start = match.end()
        end_match = re.search(r'};\s*(const|function|interface|export)', content[dict_start:])
        if not end_match: end_match = re.search(r'};\s*$', content[dict_start:])
        if not end_match: continue
        dict_end = dict_start + end_match.start()
        dict_block = content[dict_start:dict_end]

        # Merge FAQ data
        if lang in faq_data:
            for key, value in faq_data[lang].items():
                pattern = f'"{re.escape(key)}":\s*".*?"'
                if re.search(pattern, dict_block):
                    dict_block = re.sub(pattern, f'"{key}": "{value}"', dict_block)
                else:
                    dict_block += f'  "{key}": "{value}",\n'

        # Help button
        key = "nexy.help_button"
        value = help_button_translations[lang]
        pattern = f'"{re.escape(key)}":\s*".*?"'
        if re.search(pattern, dict_block):
            dict_block = re.sub(pattern, f'"{key}": "{value}"', dict_block)
        else:
            dict_block += f'  "{key}": "{value}",\n'

        content = content[:dict_start] + dict_block + content[dict_end:]

    with open('src/lib/i18n.tsx', 'w') as f:
        f.write(content)

def fix_assistant():
    with open('src/components/NexyAssistant.tsx', 'r') as f:
        content = f.read()

    if 'const [showPopup, setShowPopup] = useState(true);' not in content:
        content = content.replace(
            'const [messageKey, setMessageKey] = useState("");',
            'const [showPopup, setShowPopup] = useState(true);'
        )

    # Remove old effect
    content = re.sub(r'useEffect\(\(\) => \{.*?setMessageKey\(t\("nexy.msg1"\)\);.*?\}, \[lang, isOpen, visible, t\]\);', '', content, flags=re.DOTALL)

    content = content.replace('setMessageKey("");', 'setShowPopup(false);')
    content = content.replace('!isOpen && !isMinimized && (', '!isOpen && !isMinimized && showPopup && (')
    content = content.replace('onClick={() => setMessageKey("")}', 'onClick={() => setShowPopup(false)}')

    with open('src/components/NexyAssistant.tsx', 'w') as f:
        f.write(content)

def fix_contact():
    with open('src/routes/contact.tsx', 'r') as f:
        content = f.read()
    content = content.replace('submitContactForm({ data: formData })', 'submitContactForm(formData)')
    with open('src/routes/contact.tsx', 'w') as f:
        f.write(content)

def fix_blog():
    with open('src/routes/blog.$postId.tsx', 'r') as f:
        content = f.read()
    content = content.replace('getBlogPost({ data: postId })', 'getBlogPost(postId)')

    # Ensure translateText calls are also fixed
    content = re.sub(
        r'translateText\(\{ data: \{ text: (.*?), targetLang: lang \} \}\)',
        r'translateText({ text: \1, targetLang: lang })',
        content
    )

    with open('src/routes/blog.$postId.tsx', 'w') as f:
        f.write(content)

    with open('src/routes/blog.index.tsx', 'r') as f:
        content = f.read()
    content = re.sub(
        r'translateText\(\{ data: \{ text: (.*?), targetLang: lang \} \}\)',
        r'translateText({ text: \1, targetLang: lang })',
        content
    )
    with open('src/routes/blog.index.tsx', 'w') as f:
        f.write(content)

if __name__ == "__main__":
    fix_i18n()
    fix_assistant()
    fix_contact()
    fix_blog()
