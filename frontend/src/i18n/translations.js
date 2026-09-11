// UI copy in both languages. Content coming from the API (service titles,
// eligibility questions, etc.) is already bilingual and picked with `pick()`.

export const translations = {
  en: {
    appName: "SewaPath",
    tagline: "Find the right government service, without the guesswork.",

    nav: {
      home: "Home",
      services: "All Services",
      dashboard: "My dashboard",
      login: "Sign in",
      register: "Create account",
      logout: "Sign out",
      admin: "Admin",
    },

    home: {
  eyebrow: "Find the Right Government Service",

  heroTitle:
    "Tell us what you need. We’ll guide you through the process.",

  heroSubtitle:
    "Describe what you need. SewaPath finds the service, office, documents, and steps.",

  heroPlaceholder: "Birth Registration",
  heroButton: "Find a service",

  orBrowse: "Browse services by category",
  browseServices: "Explore all services",

  servicesCount: "312+ government services",
  provincesCount: "All 7 provinces",

  popularServices: "Popular services",
  popularServicesSubtitle: "Explore the services people use most.",

  browseByCategory: "Browse by category",
  categorySubtitle: "Explore services based on what you need.",
  exploreServices: "Explore services",

  howItWorks: "How it works",

  step1Title: "Tell us what you need",
  step1Body:
    "Search in plain Nepali or English. No need to know the office name.",

  step2Title: "Check eligibility & documents",
  step2Body:
    "Answer a few simple questions and see exactly what you need to bring.",

  step3Title: "Follow your path",
  step3Body:
    "Find the responsible office, its location, and the official link.",
},

    services: {
      title: "All services",
      searchPlaceholder: "Search for a service…",
      allCategories: "All categories",
      noResults:
        "No services found. Try different keywords or browse by category.",
      resultsCount: (n) => `${n} service${n === 1 ? "" : "s"}`,
    },

    detail: {
      overview: "Overview",
      eligibility: "Eligibility",
      documents: "Documents needed",
      journey: "Step-by-step journey",
      office: "Responsible office",
      fee: "Fee",
      time: "Typical processing time",
      officialLink: "Official source",
      save: "Save this service",
      saved: "Saved",
      unsave: "Remove from saved",
      checkEligibility: "Check my eligibility",
      answerYes: "Yes",
      answerNo: "No",
      eligibleResult: "You appear eligible. Here’s what to prepare.",
      notEligibleResult:
        "Based on your answers, this service may not apply to you yet.",
      alternatives: "You might consider instead:",
      mandatory: "Required",
      optional: "If applicable",
      lastVerified: "Last verified",
      getDirections: "Get directions",
    },

    auth: {
      loginTitle: "Sign in to SewaPath",
      registerTitle: "Create your SewaPath account",
      name: "Full name",
      email: "Email address",
      password: "Password",
      loginButton: "Sign in",
      registerButton: "Create account",
      noAccount: "New to SewaPath?",
      hasAccount: "Already have an account?",
      createOne: "Create an account",
      signInInstead: "Sign in instead",
    },

    dashboard: {
      title: "My dashboard",
      savedServices: "Saved services",
      noSaved:
        "You haven’t saved any services yet. Browse services and save the ones you need.",
      browseServices: "Browse services",
    },

    admin: {
      title: "Admin dashboard",
      services: "Services",
      categories: "Categories",
      offices: "Offices",
      addService: "Add service",
      addCategory: "Add category",
      addOffice: "Add office",
      edit: "Edit",
      delete: "Delete",
      save: "Save changes",
      cancel: "Cancel",
      confirmDelete: "Delete this item? This action cannot be undone.",
    },

    common: {
      loading: "Loading…",
      error: "Something went wrong. Please try again.",
      back: "Back",
      language: "नेपाली",
    },
  },

  ne: {
    appName: "सेवापथ",
    tagline: "सही सरकारी सेवा सजिलै पत्ता लगाउनुहोस्।",

    nav: {
      home: "गृहपृष्ठ",
      services: "सबै सेवाहरू",
      dashboard: "मेरो ड्यासबोर्ड",
      login: "लगइन",
      register: "खाता खोल्नुहोस्",
      logout: "लगआउट",
      admin: "एडमिन",
    },

    home: {
  eyebrow: "सही सरकारी सेवा खोज्नुहोस्",

  heroTitle:
    "तपाईंलाई के चाहिएको हो भन्नुहोस्। हामी सही प्रक्रिया देखाउँछौं।",

  heroSubtitle:
    "आफ्नै शब्दमा लेख्नुहोस्। सेवापथले सही सेवा, कार्यालय, कागजात र चरणहरू पत्ता लगाउन मद्दत गर्छ।",

  heroPlaceholder: "जन्म दर्ता",
  heroButton: "सेवा खोज्नुहोस्",

  orBrowse: "वर्गअनुसार सेवा खोज्नुहोस्",
  browseServices: "सबै सेवाहरू हेर्नुहोस्",

  servicesCount: "३१२+ सरकारी सेवाहरू",
  provincesCount: "सबै ७ प्रदेश",

  popularServices: "लोकप्रिय सेवाहरू",
  popularServicesSubtitle: "मानिसहरूले धेरै प्रयोग गर्ने सेवाहरू हेर्नुहोस्।",

  browseByCategory: "वर्गअनुसार हेर्नुहोस्",
  categorySubtitle: "तपाईंलाई आवश्यक सेवाअनुसार खोज्नुहोस्।",
  exploreServices: "सेवाहरू हेर्नुहोस्",

  howItWorks: "यसरी काम गर्छ",

  step1Title: "तपाईंलाई के चाहिन्छ भन्नुहोस्",
  step1Body:
    "नेपाली वा अंग्रेजीमा खोज्नुहोस्। कार्यालयको नाम थाहा हुनुपर्दैन।",

  step2Title: "योग्यता र कागजात जाँच्नुहोस्",
  step2Body:
    "केही सरल प्रश्नको जवाफ दिनुहोस् र आवश्यक कागजात थाहा पाउनुहोस्।",

  step3Title: "आफ्नो प्रक्रिया पूरा गर्नुहोस्",
  step3Body:
    "सम्बन्धित कार्यालय, यसको स्थान र आधिकारिक लिंक पाउनुहोस्।",
},

    services: {
      title: "सबै सेवाहरू",
      searchPlaceholder: "सेवा खोज्नुहोस्…",
      allCategories: "सबै वर्ग",
      noResults:
        "तपाईंको खोजसँग मिल्ने सेवा फेला परेन। फरक शब्द प्रयोग गर्नुहोस् वा वर्गअनुसार सेवा हेर्नुहोस्।",
      resultsCount: (n) => `${n} सेवा`,
    },

    detail: {
      overview: "सारांश",
      eligibility: "योग्यता",
      documents: "आवश्यक कागजात",
      journey: "चरणबद्ध प्रक्रिया",
      office: "सम्बन्धित कार्यालय",
      fee: "शुल्क",
      time: "लाग्ने समय",
      officialLink: "आधिकारिक स्रोत",
      save: "सेवा सुरक्षित गर्नुहोस्",
      saved: "सुरक्षित गरियो",
      unsave: "सुरक्षित सेवाबाट हटाउनुहोस्",
      checkEligibility: "मेरो योग्यता जाँच्नुहोस्",
      answerYes: "हो",
      answerNo: "होइन",
      eligibleResult:
        "तपाईं योग्य देखिनुहुन्छ। तयार गर्नुपर्ने कागजात र जानकारी यहाँ हेर्नुहोस्।",
      notEligibleResult:
        "तपाईंको जवाफअनुसार, यो सेवा हाल तपाईंका लागि लागू नहुन सक्छ।",
      alternatives: "वैकल्पिक सेवाहरू",
      mandatory: "आवश्यक",
      optional: "लागू भएमा",
      lastVerified: "अन्तिम पटक प्रमाणित",
      getDirections: "बाटो हेर्नुहोस्",
    },

    auth: {
      loginTitle: "सेवापथमा लगइन गर्नुहोस्",
      registerTitle: "सेवापथमा खाता खोल्नुहोस्",
      name: "पूरा नाम",
      email: "इमेल ठेगाना",
      password: "पासवर्ड",
      loginButton: "लगइन",
      registerButton: "खाता खोल्नुहोस्",
      noAccount: "सेवापथमा नयाँ हुनुहुन्छ?",
      hasAccount: "पहिले नै खाता छ?",
      createOne: "खाता खोल्नुहोस्",
      signInInstead: "लगइन",
    },

    dashboard: {
      title: "मेरो ड्यासबोर्ड",
      savedServices: "सुरक्षित सेवाहरू",
      noSaved:
        "तपाईंले अझै कुनै सेवा सुरक्षित गर्नुभएको छैन। सेवाहरू हेर्नुहोस् र आफूलाई आवश्यक सेवा सुरक्षित गर्नुहोस्।",
      browseServices: "सेवाहरू हेर्नुहोस्",
    },

    admin: {
      title: "एडमिन ड्यासबोर्ड",
      services: "सेवाहरू",
      categories: "वर्गहरू",
      offices: "कार्यालयहरू",
      addService: "सेवा थप्नुहोस्",
      addCategory: "वर्ग थप्नुहोस्",
      addOffice: "कार्यालय थप्नुहोस्",
      edit: "सम्पादन गर्नुहोस्",
      delete: "मेटाउनुहोस्",
      save: "परिवर्तन सुरक्षित गर्नुहोस्",
      cancel: "रद्द गर्नुहोस्",
      confirmDelete:
        "यो सामग्री मेटाउने हो? मेटाएपछि यसलाई फिर्ता ल्याउन सकिँदैन।",
    },

    common: {
      loading: "लोड हुँदै…",
      error: "केही समस्या भयो। फेरि प्रयास गर्नुहोस्।",
      back: "पछाडि",
      language: "English",
    },
  },
};

// Pick the right language out of a bilingual { en, ne } field from the API.
export function pick(field, lang) {
  if (!field) return "";
  return field[lang] || field.en || field.ne || "";
}
