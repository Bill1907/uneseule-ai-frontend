export const locales = ["ko", "en", "es"] as const;
export const defaultLocale = "ko" as const;

export type Locale = (typeof locales)[number];

export const translations = {
  ko: {
    landing: {
      hero: {
        subtitle: "인공지능과 함께하는 새로운 경험을 만나보세요",
        startButton: "서비스 시작하기",
        learnMoreButton: "더 알아보기",
      },
      features: {
        title: "주요 기능",
        subtitle: "혁신적인 AI 기술로 당신의 일상을 더욱 편리하게 만들어보세요",
        smartAI: {
          title: "스마트 AI",
          description:
            "최첨단 인공지능 기술로 더 정확하고 빠른 서비스를 제공합니다",
        },
        fastResponse: {
          title: "빠른 응답",
          description: "실시간으로 빠르고 정확한 답변을 받아보세요",
        },
        security: {
          title: "안전한 보안",
          description: "철저한 보안 시스템으로 개인정보를 안전하게 보호합니다",
        },
      },
      cta: {
        title: "지금 바로 시작해보세요",
        subtitle: "몇 분만에 가입하고 혁신적인 AI 서비스를 경험해보세요",
        button: "무료로 시작하기",
      },
    },
    dashboard: {
      title: "언어 학습 대시보드",
      welcome: "안녕하세요! AI 언어 학습 서비스에 오신 것을 환영합니다.",
      aiChat: {
        title: "AI 언어 튜터",
        description: "AI 튜터와 실시간으로 대화하며 언어를 연습하세요",
        button: "대화 시작",
      },
      documentAnalysis: {
        title: "텍스트 분석",
        description: "텍스트를 업로드하고 문법과 표현을 분석받아보세요",
        button: "분석하기",
      },
      imageGeneration: {
        title: "어휘 학습",
        description: "이미지와 함께 새로운 어휘를 학습해보세요",
        button: "학습하기",
      },
    },
    navigation: {
      home: "홈",
      service: "서비스",
      dashboard: "대시보드",
      library: "라이브러리",
      reports: "보고서",
      settings: "설정",
      auth: "인증",
    },
    common: {
      language: "언어",
      korean: "한국어",
      english: "English",
      spanish: "Español",
    },
    onboarding: {
      title: "언어 학습 시작하기",
      subtitle: "맞춤형 언어 학습을 위한 정보를 입력해주세요",
      age: "나이",
      agePlaceholder: "나이를 입력하세요",
      learningLanguage: "학습 언어",
      selectLanguage: "학습하실 언어를 선택하세요",
      sex: "성별",
      selectSex: "성별을 선택하세요",
      male: "남성",
      female: "여성",
      other: "기타",
      preferNotToSay: "응답하지 않음",
      learningGoals: "학습 목표",
      learningGoalsPlaceholder: "언어 학습의 목표를 자세히 입력해주세요",
      languageLevel: "현재 언어 수준",
      selectLevel: "현재 언어 수준을 선택하세요",
      beginner: "초급",
      elementary: "초중급",
      intermediate: "중급",
      upperIntermediate: "중상급",
      advanced: "상급",
      proficient: "능숙",
      interests: "관심 분야 (복수 선택 가능)",
      interestOptions: {
        culture: "문화",
        business: "비즈니스",
        travel: "여행",
        technology: "기술",
        sports: "스포츠",
        music: "음악",
        movies: "영화",
        cooking: "요리",
        books: "책",
        science: "과학",
        art: "예술",
        games: "게임",
      },
      tutorStyle: "선호하는 튜터 스타일",
      selectTutorStyle: "튜터 스타일을 선택하세요",
      tutorStyles: {
        encouraging: "격려하는",
        challenging: "도전적인",
        patient: "인내심 있는",
        structured: "체계적인",
        conversational: "대화 중심의",
      },
      feedbackStyle: "선호하는 피드백 방식",
      selectFeedbackStyle: "피드백 방식을 선택하세요",
      feedbackStyles: {
        immediate: "즉시 교정",
        summary: "요약 피드백",
        gentle: "부드러운 교정",
        detailed: "상세한 설명",
        motivational: "동기부여 중심",
      },
      complete: "완료하기",
      completing: "완료 중...",
    },
  },
  en: {
    landing: {
      hero: {
        subtitle: "Experience a new world with artificial intelligence",
        startButton: "Get Started",
        learnMoreButton: "Learn More",
      },
      features: {
        title: "Key Features",
        subtitle:
          "Make your daily life more convenient with innovative AI technology",
        smartAI: {
          title: "Smart AI",
          description:
            "We provide more accurate and faster services with cutting-edge artificial intelligence technology",
        },
        fastResponse: {
          title: "Fast Response",
          description: "Get fast and accurate answers in real time",
        },
        security: {
          title: "Secure Protection",
          description:
            "We safely protect your personal information with thorough security systems",
        },
      },
      cta: {
        title: "Start Right Now",
        subtitle: "Sign up in minutes and experience innovative AI services",
        button: "Start for Free",
      },
    },
    dashboard: {
      title: "Language Learning Dashboard",
      welcome: "Welcome to our AI language learning service!",
      aiChat: {
        title: "AI Language Tutor",
        description:
          "Practice your language skills with our AI tutor in real-time",
        button: "Start Conversation",
      },
      documentAnalysis: {
        title: "Text Analysis",
        description: "Upload text and get grammar and expression analysis",
        button: "Analyze",
      },
      imageGeneration: {
        title: "Vocabulary Learning",
        description: "Learn new vocabulary with images and visual aids",
        button: "Start Learning",
      },
    },
    navigation: {
      home: "Home",
      service: "Service",
      dashboard: "Dashboard",
      library: "Library",
      reports: "Reports",
      settings: "Settings",
      auth: "Authentication",
    },
    common: {
      language: "Language",
      korean: "한국어",
      english: "English",
      spanish: "Español",
    },
    onboarding: {
      title: "Start Learning Languages",
      subtitle: "Please provide information for personalized language learning",
      age: "Age",
      agePlaceholder: "Enter your age",
      learningLanguage: "Learning Language",
      selectLanguage: "Select the language you want to learn",
      sex: "Gender",
      selectSex: "Select your gender",
      male: "Male",
      female: "Female",
      other: "Other",
      preferNotToSay: "Prefer not to say",
      learningGoals: "Learning Goals",
      learningGoalsPlaceholder:
        "Please describe your language learning goals in detail",
      languageLevel: "Current Language Level",
      selectLevel: "Select your current language level",
      beginner: "Beginner",
      elementary: "Elementary",
      intermediate: "Intermediate",
      upperIntermediate: "Upper Intermediate",
      advanced: "Advanced",
      proficient: "Proficient",
      interests: "Interests (Select multiple)",
      interestOptions: {
        culture: "Culture",
        business: "Business",
        travel: "Travel",
        technology: "Technology",
        sports: "Sports",
        music: "Music",
        movies: "Movies",
        cooking: "Cooking",
        books: "Books",
        science: "Science",
        art: "Art",
        games: "Games",
      },
      tutorStyle: "Preferred Tutor Style",
      selectTutorStyle: "Select your preferred tutor style",
      tutorStyles: {
        encouraging: "Encouraging",
        challenging: "Challenging",
        patient: "Patient",
        structured: "Structured",
        conversational: "Conversational",
      },
      feedbackStyle: "Preferred Feedback Style",
      selectFeedbackStyle: "Select your preferred feedback style",
      feedbackStyles: {
        immediate: "Immediate Correction",
        summary: "Summary Feedback",
        gentle: "Gentle Correction",
        detailed: "Detailed Explanation",
        motivational: "Motivational Focus",
      },
      complete: "Complete",
      completing: "Completing...",
    },
  },
  es: {
    landing: {
      hero: {
        subtitle: "Experimenta un nuevo mundo con inteligencia artificial",
        startButton: "Comenzar",
        learnMoreButton: "Saber Más",
      },
      features: {
        title: "Características Clave",
        subtitle:
          "Haz tu vida diaria más conveniente con tecnología de IA innovadora",
        smartAI: {
          title: "IA Inteligente",
          description:
            "Proporcionamos servicios más precisos y rápidos con tecnología de inteligencia artificial de vanguardia",
        },
        fastResponse: {
          title: "Respuesta Rápida",
          description: "Obtén respuestas rápidas y precisas en tiempo real",
        },
        security: {
          title: "Protección Segura",
          description:
            "Protegemos tu información personal de manera segura con sistemas de seguridad exhaustivos",
        },
      },
      cta: {
        title: "Comienza Ahora Mismo",
        subtitle:
          "Regístrate en minutos y experimenta servicios de IA innovadores",
        button: "Comenzar Gratis",
      },
    },
    dashboard: {
      title: "Panel de Aprendizaje de Idiomas",
      welcome:
        "¡Bienvenido a nuestro servicio de aprendizaje de idiomas con IA!",
      aiChat: {
        title: "Tutor de IA",
        description:
          "Practica tus habilidades lingüísticas con nuestro tutor de IA en tiempo real",
        button: "Iniciar Conversación",
      },
      documentAnalysis: {
        title: "Análisis de Texto",
        description: "Sube texto y obtén análisis de gramática y expresiones",
        button: "Analizar",
      },
      imageGeneration: {
        title: "Aprendizaje de Vocabulario",
        description: "Aprende nuevo vocabulario con imágenes y ayudas visuales",
        button: "Comenzar a Aprender",
      },
    },
    navigation: {
      home: "Inicio",
      service: "Servicio",
      dashboard: "Panel de Control",
      library: "Biblioteca",
      reports: "Informes",
      settings: "Configuración",
      auth: "Autenticación",
    },
    common: {
      language: "Idioma",
      korean: "한국어",
      english: "English",
      spanish: "Español",
    },
    onboarding: {
      title: "Comenzar a Aprender Idiomas",
      subtitle:
        "Por favor proporciona información para el aprendizaje personalizado de idiomas",
      age: "Edad",
      agePlaceholder: "Ingresa tu edad",
      learningLanguage: "Idioma a Aprender",
      selectLanguage: "Selecciona el idioma que quieres aprender",
      sex: "Género",
      selectSex: "Selecciona tu género",
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      preferNotToSay: "Prefiero no decir",
      learningGoals: "Objetivos de Aprendizaje",
      learningGoalsPlaceholder:
        "Por favor describe tus objetivos de aprendizaje de idiomas en detalle",
      languageLevel: "Nivel Actual del Idioma",
      selectLevel: "Selecciona tu nivel actual del idioma",
      beginner: "Principiante",
      elementary: "Elemental",
      intermediate: "Intermedio",
      upperIntermediate: "Intermedio Alto",
      advanced: "Avanzado",
      proficient: "Competente",
      interests: "Intereses (Selecciona múltiples)",
      interestOptions: {
        culture: "Cultura",
        business: "Negocios",
        travel: "Viajes",
        technology: "Tecnología",
        sports: "Deportes",
        music: "Música",
        movies: "Películas",
        cooking: "Cocina",
        books: "Libros",
        science: "Ciencia",
        art: "Arte",
        games: "Juegos",
      },
      tutorStyle: "Estilo de Tutor Preferido",
      selectTutorStyle: "Selecciona tu estilo de tutor preferido",
      tutorStyles: {
        encouraging: "Alentador",
        challenging: "Desafiante",
        patient: "Paciente",
        structured: "Estructurado",
        conversational: "Conversacional",
      },
      feedbackStyle: "Estilo de Retroalimentación Preferido",
      selectFeedbackStyle:
        "Selecciona tu estilo de retroalimentación preferido",
      feedbackStyles: {
        immediate: "Corrección Inmediata",
        summary: "Retroalimentación Resumida",
        gentle: "Corrección Suave",
        detailed: "Explicación Detallada",
        motivational: "Enfoque Motivacional",
      },
      complete: "Completar",
      completing: "Completando...",
    },
  },
};

export function getTranslation(locale: Locale, key: string) {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function getTranslations(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}
