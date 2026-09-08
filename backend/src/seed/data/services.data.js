// The 12-service launch catalog described in the SewaPath proposal (Section 5).
// `categorySlug` and `officeKey` are resolved against categories.data.js / offices.data.js at seed time.

export const services = [
  {
    slug: "birth-registration",
    categorySlug: "civil-registration",
    officeKey: "ward-office",
    title: { en: "Birth Registration", ne: "जन्म दर्ता" },
    summary: {
      en: "Register a child’s birth to get a birth certificate, the first legal proof of identity.",
      ne: "बालबालिकाको जन्म दर्ता गरी जन्म दर्ता प्रमाणपत्र प्राप्त गर्नुहोस्, जुन पहिचानको पहिलो कानूनी प्रमाण हो।",
    },
    keywords: [
      "birth certificate",
      "newborn",
      "child registration",
      "जन्म दर्ता",
      "जन्म प्रमाणपत्र",
      "नयाँ बच्चा",
    ],
    feeInfo: {
      en: "Free within 35 days of birth; late fee applies afterwards.",
      ne: "जन्मेको ३५ दिनभित्र निःशुल्क; ढिलो गरे शुल्क लाग्छ।",
    },
    timeInfo: {
      en: "Usually same day at the ward office.",
      ne: "सामान्यतया वडा कार्यालयमै सोही दिन।",
    },

    officialLink: "https://donidcr.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Is the child under 35 days old, or are you ready to pay a late fee?",
          ne: "बच्चा ३५ दिनभन्दा कम उमेरको छ, वा ढिलो शुल्क तिर्न तयार हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Birth registration always remains possible, but you may need extra supporting documents for a late registration. Visit your ward office to ask about the late-registration process.",
          ne: "जन्म दर्ता जहिले पनि सम्भव छ, तर ढिलो दर्ताका लागि थप कागजात चाहिन सक्छ। ढिलो दर्ता प्रक्रियाका बारे वडा कार्यालयमा सोध्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Do you have the parents’ citizenship certificates or passports available?",
          ne: "बाबु-आमाको नागरिकता वा राहदानी उपलब्ध छ?",
        },
        reasonNo: {
          en: "At least one parent’s identity document is required to register a birth. Please arrange this before visiting the ward office.",
          ne: "जन्म दर्ताका लागि कम्तीमा एक अभिभावकको परिचयपत्र आवश्यक पर्छ। वडा कार्यालय जानुअघि यो तयार गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Birth notification / hospital discharge slip",
          ne: "जन्म सूचना वा अस्पताल डिस्चार्ज पर्ची",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Parents’ citizenship certificates",
          ne: "बाबु-आमाको नागरिकता प्रमाणपत्र",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Parents’ marriage certificate",
          ne: "बाबु-आमाको विवाह दर्ता प्रमाणपत्र",
        },
        isMandatory: false,
        note: {
          en: "Requested by some wards to confirm the family relationship.",
          ne: "केही वडाले पारिवारिक सम्बन्ध पुष्टि गर्न माग्न सक्छन्।",
        },
      },
    ],

    journey: [
      {
        title: { en: "Collect documents", ne: "कागजात तयार गर्नुहोस्" },
        description: {
          en: "Gather the hospital slip and both parents’ citizenship certificates.",
          ne: "अस्पताल पर्ची र बाबु-आमा दुवैको नागरिकता प्रमाणपत्र संकलन गर्नुहोस्।",
        },
      },
      {
        title: { en: "Visit the ward office", ne: "वडा कार्यालय जानुहोस्" },
        description: {
          en: "Go to the ward office where the family currently resides.",
          ne: "परिवार हाल बसोबास गरेको वडा कार्यालयमा जानुहोस्।",
        },
      },
      {
        title: { en: "Fill the registration form", ne: "दर्ता फारम भर्नुहोस्" },
        description: {
          en: "A ward staff member will help you fill the birth registration form.",
          ne: "वडा कर्मचारीले जन्म दर्ता फारम भर्न सघाउँछन्।",
        },
      },
      {
        title: { en: "Collect the certificate", ne: "प्रमाणपत्र लिनुहोस्" },
        description: {
          en: "The birth certificate is usually issued the same day.",
          ne: "जन्म प्रमाणपत्र सामान्यतया सोही दिन जारी हुन्छ।",
        },
      },
    ],
  },

  {
    slug: "marriage-registration",
    categorySlug: "civil-registration",
    officeKey: "ward-office",
    title: { en: "Marriage Registration", ne: "विवाह दर्ता" },
    summary: {
      en: "Legally register a marriage between two consenting adults.",
      ne: "दुई सहमत वयस्क व्यक्तिबीचको विवाहलाई कानूनी रूपमा दर्ता गर्नुहोस्।",
    },
    keywords: [
      "marriage certificate",
      "wedding registration",
      "विवाह दर्ता",
      "विवाह प्रमाणपत्र",
    ],
    feeInfo: {
      en: "Small government fee set by the local ward.",
      ne: "स्थानीय वडाले तोकेको सामान्य शुल्क।",
    },
    timeInfo: {
      en: "Usually completed the same day.",
      ne: "सामान्यतया सोही दिन सम्पन्न हुन्छ।",
    },

    officialLink: "https://donidcr.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are both individuals at least 20 years old?",
          ne: "दुवै व्यक्ति कम्तीमा २० वर्ष उमेरका हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Nepali law sets a minimum marriage age of 20 for both partners. Registration cannot proceed until this is met.",
          ne: "नेपाली कानूनले विवाहको न्यूनतम उमेर दुवैका लागि २० वर्ष तोकेको छ। यो पुगेपछि मात्र दर्ता सम्भव हुन्छ।",
        },
      },
      {
        prompt: {
          en: "Do both individuals have their citizenship certificates?",
          ne: "दुवै व्यक्तिसँग नागरिकता प्रमाणपत्र छ?",
        },
        reasonNo: {
          en: "A citizenship certificate is required for both people. If either doesn’t have one yet, start with the citizenship process first.",
          ne: "दुवैको नागरिकता प्रमाणपत्र आवश्यक पर्छ। कसैसँग नभएमा पहिले नागरिकता प्रक्रिया पूरा गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Citizenship certificates of both individuals",
          ne: "दुवै व्यक्तिको नागरिकता प्रमाणपत्र",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Passport-size photos (2 each)",
          ne: "पासपोर्ट साइजको फोटो (प्रत्येकको २)",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Two witnesses with citizenship certificates",
          ne: "नागरिकता भएका दुई साक्षी",
        },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: { en: "Arrange witnesses", ne: "साक्षी तयार गर्नुहोस्" },
        description: {
          en: "Bring two adult witnesses who can vouch for the marriage.",
          ne: "विवाहको पुष्टि गर्न दुई वयस्क साक्षी ल्याउनुहोस्।",
        },
      },
      {
        title: {
          en: "Visit the ward office together",
          ne: "सँगै वडा कार्यालय जानुहोस्",
        },
        description: {
          en: "Both individuals must appear in person with their documents.",
          ne: "दुवै व्यक्ति आफ्नो कागजातसहित उपस्थित हुनुपर्छ।",
        },
      },
      {
        title: {
          en: "Sign the marriage register",
          ne: "विवाह दर्ता किताबमा हस्ताक्षर गर्नुहोस्",
        },
        description: {
          en: "Ward staff records the marriage in the civil registration book.",
          ne: "वडा कर्मचारीले विवाहलाई दर्ता किताबमा अभिलेख गर्छन्।",
        },
      },
      {
        title: {
          en: "Collect the marriage certificate",
          ne: "विवाह प्रमाणपत्र लिनुहोस्",
        },
        description: {
          en: "The certificate is issued once the entry is complete.",
          ne: "अभिलेख पूरा भएपछि प्रमाणपत्र जारी हुन्छ।",
        },
      },
    ],
  },

  {
    slug: "migration-registration",
    categorySlug: "identity-residency",
    officeKey: "ward-office",
    title: { en: "Migration Registration", ne: "बसाइँ सराइ दर्ता" },
    summary: {
      en: "Officially record that you have moved from one ward or district to another.",
      ne: "तपाईं एक वडा वा जिल्लाबाट अर्कोमा बसाइँ सरेको आधिकारिक रूपमा अभिलेख गर्नुहोस्।",
    },
    keywords: [
      "moved district",
      "relocation",
      "migration certificate",
      "बसाइँ सराइ",
      "ठेगाना सारेको",
    ],
    feeInfo: {
      en: "Small fixed fee at the ward office.",
      ne: "वडा कार्यालयमा तोकिएको सामान्य शुल्क।",
    },
    timeInfo: {
      en: "Same day at both the old and new ward.",
      ne: "पुरानो र नयाँ दुवै वडामा सोही दिन।",
    },

    officialLink: "https://donidcr.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Have you actually shifted your permanent residence to a new ward or district?",
          ne: "तपाईंले साँच्चै आफ्नो स्थायी बसोबास नयाँ वडा वा जिल्लामा सारेको हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Migration registration is only for a genuine, permanent change of residence. A short visit does not need this.",
          ne: "बसाइँ सराइ दर्ता स्थायी बसोबास परिवर्तन गरेको अवस्थामा मात्र आवश्यक पर्छ। छोटो भ्रमणका लागि यो चाहिँदैन।",
        },
      },
      {
        prompt: {
          en: "Do you have your family registration certificate (or citizenship) from the old address?",
          ne: "पुरानो ठेगानाको परिवारको लगत वा नागरिकता प्रमाणपत्र छ?",
        },
        reasonNo: {
          en: "Your old ward’s family registration record is needed to migrate the entry. Collect it from your previous ward office first.",
          ne: "दर्ता सार्नका लागि पुरानो वडाको परिवारको लगत आवश्यक पर्छ। पहिले पुरानो वडा कार्यालयबाट यो लिनुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Family registration certificate from previous ward",
          ne: "अघिल्लो वडाको परिवारको लगत प्रमाणपत्र",
        },
        isMandatory: true,
      },
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: {
          en: "Reason-for-migration letter or ward recommendation",
          ne: "बसाइँ सराइको कारण खुलेको पत्र वा वडा सिफारिस",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: {
          en: "Get a migration-out certificate",
          ne: "बसाइँ सराइ गएको प्रमाणपत्र लिनुहोस्",
        },
        description: {
          en: "Visit your old ward office and request a migration-out record.",
          ne: "पुरानो वडा कार्यालयमा गई बसाइँ सराइ गएको लगत माग्नुहोस्।",
        },
      },
      {
        title: {
          en: "Visit your new ward office",
          ne: "नयाँ वडा कार्यालय जानुहोस्",
        },
        description: {
          en: "Submit the migration-out certificate at your new address’s ward.",
          ne: "नयाँ ठेगानाको वडामा बसाइँ सराइ गएको प्रमाणपत्र बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Register as a migrated-in resident",
          ne: "बसाइँ सरी आएको बासिन्दाको रूपमा दर्ता हुनुहोस्",
        },
        description: {
          en: "The new ward adds your family to its local registry.",
          ne: "नयाँ वडाले तपाईंको परिवारलाई स्थानीय लगतमा समावेश गर्छ।",
        },
      },
    ],
  },

  {
    slug: "citizenship-recommendation",
    categorySlug: "identity-residency",
    officeKey: "ward-office",
    title: { en: "Citizenship Recommendation", ne: "नागरिकता सिफारिस" },
    summary: {
      en: "Get a ward recommendation letter, the first step toward applying for a citizenship certificate.",
      ne: "नागरिकता प्रमाणपत्रका लागि आवेदन दिनुअघिको पहिलो चरण, वडा सिफारिस पत्र प्राप्त गर्नुहोस्।",
    },
    keywords: [
      "citizenship",
      "nagarikta",
      "id card",
      "नागरिकता",
      "सिफारिस पत्र",
    ],
    feeInfo: {
      en: "Nominal ward fee; the citizenship certificate itself is free.",
      ne: "वडाको सामान्य शुल्क; नागरिकता प्रमाणपत्र स्वयं निःशुल्क छ।",
    },
    timeInfo: {
      en: "Recommendation same day; District Administration Office processing may take longer.",
      ne: "सिफारिस सोही दिन; जिल्ला प्रशासन कार्यालयको प्रक्रिया केही समय लाग्न सक्छ।",
    },

    officialLink: "https://moha.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you at least 16 years old?",
          ne: "तपाईं कम्तीमा १६ वर्ष उमेरको हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Citizenship by descent can be applied for from age 16. Below that age, this service does not apply yet.",
          ne: "वंशजको आधारमा नागरिकताका लागि १६ वर्ष उमेरदेखि आवेदन दिन मिल्छ। सो भन्दा कम उमेरमा यो सेवा लागू हुँदैन।",
        },
      },
      {
        prompt: {
          en: "Do you have at least one parent’s citizenship certificate, or a grandparent’s if a parent’s is unavailable?",
          ne: "तपाईंसँग कम्तीमा एक अभिभावकको नागरिकता छ, वा अभिभावकको नभए हजुरबा/हजुरआमाको छ?",
        },
        reasonNo: {
          en: "Citizenship by descent needs proof of a parent’s (or grandparent’s) citizenship. Speak with your ward office about alternative supporting evidence.",
          ne: "वंशजको नागरिकताका लागि अभिभावक (वा हजुरबा/हजुरआमा) को नागरिकता प्रमाण चाहिन्छ। वैकल्पिक प्रमाणका बारे वडा कार्यालयमा सोध्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Birth certificate", ne: "जन्म दर्ता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: {
          en: "Parent’s (or grandparent’s) citizenship certificate",
          ne: "अभिभावक (वा हजुरबा/हजुरआमा) को नागरिकता प्रमाणपत्र",
        },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photos", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: true,
      },
      {
        name: {
          en: "Character/relationship witness from the ward",
          ne: "वडाको सम्बन्ध/चरित्र साक्षी",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: { en: "Get a ward recommendation", ne: "वडा सिफारिस लिनुहोस्" },
        description: {
          en: "Submit your documents to the ward office for a recommendation letter.",
          ne: "सिफारिस पत्रका लागि वडा कार्यालयमा कागजात बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Visit the District Administration Office",
          ne: "जिल्ला प्रशासन कार्यालय जानुहोस्",
        },
        description: {
          en: "Submit the recommendation and documents at the DAO for verification.",
          ne: "प्रमाणीकरणका लागि सिफारिस र कागजात जिल्ला प्रशासन कार्यालयमा बुझाउनुहोस्।",
        },
      },
      {
        title: { en: "Biometric capture", ne: "बायोमेट्रिक विवरण लिनुहोस्" },
        description: {
          en: "Your photo, fingerprints, and signature are recorded.",
          ne: "तपाईंको फोटो, औंठाछाप र हस्ताक्षर लिइन्छ।",
        },
      },
      {
        title: {
          en: "Collect the citizenship certificate",
          ne: "नागरिकता प्रमाणपत्र लिनुहोस्",
        },
        description: {
          en: "Once approved, collect your certificate from the DAO.",
          ne: "स्वीकृत भएपछि जिल्ला प्रशासन कार्यालयबाट प्रमाणपत्र लिनुहोस्।",
        },
      },
    ],
  },

  {
    slug: "business-registration",
    categorySlug: "business-tax",
    officeKey: "municipal-office",
    title: { en: "Business Registration", ne: "व्यवसाय दर्ता" },
    summary: {
      en: "Register a new small business or firm with your local municipality.",
      ne: "नयाँ साना व्यवसाय वा फर्मलाई स्थानीय नगरपालिकामा दर्ता गर्नुहोस्।",
    },
    keywords: [
      "firm registration",
      "shop registration",
      "trade license",
      "व्यवसाय दर्ता",
      "पसल दर्ता",
    ],
    feeInfo: {
      en: "Fee varies by business type and capital; check with the municipality.",
      ne: "व्यवसायको प्रकार र पूँजी अनुसार शुल्क फरक हुन्छ; नगरपालिकामा सोध्नुहोस्।",
    },
    timeInfo: {
      en: "Typically 1–3 working days.",
      ne: "सामान्यतया १–३ कार्यदिन।",
    },

    // Fixed: DOTM was incorrect for a municipal business registration service.
    officialLink: "https://nepalgunjmun.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you at least 18 years old and hold a Nepali citizenship certificate?",
          ne: "तपाईं कम्तीमा १८ वर्ष उमेरको र नेपाली नागरिकता भएको हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Business registration under your own name requires being an adult citizen. A guardian may need to register on your behalf.",
          ne: "आफ्नै नाममा व्यवसाय दर्ता गर्न वयस्क नागरिक हुनुपर्छ। अभिभावकले तपाईंको तर्फबाट दर्ता गर्नुपर्न सक्छ।",
        },
      },
      {
        prompt: {
          en: "Do you have a fixed business location or rental/ownership proof for it?",
          ne: "तपाईंसँग निश्चित व्यवसाय स्थान वा भाडा/स्वामित्व प्रमाण छ?",
        },
        reasonNo: {
          en: "A verifiable business address is required for registration. Arrange a rental agreement or land ownership document first.",
          ne: "दर्ताका लागि प्रमाणित हुने व्यवसाय ठेगाना आवश्यक पर्छ। पहिले भाडा सम्झौता वा जग्गा स्वामित्वको कागजात तयार गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photos", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: true,
      },
      {
        name: {
          en: "Proof of business location (rent deed or land ownership)",
          ne: "व्यवसाय स्थानको प्रमाण (घरभाडा सम्झौता वा जग्गाधनी प्रमाण)",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Ward recommendation for the business",
          ne: "व्यवसायका लागि वडा सिफारिस",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: { en: "Get a ward recommendation", ne: "वडा सिफारिस लिनुहोस्" },
        description: {
          en: "Some municipalities ask for a ward-level recommendation first.",
          ne: "केही नगरपालिकाले पहिले वडा तहको सिफारिस माग्छन्।",
        },
      },
      {
        title: {
          en: "Submit application to the municipality",
          ne: "नगरपालिकामा आवेदन बुझाउनुहोस्",
        },
        description: {
          en: "File the business registration form with your documents.",
          ne: "कागजातसहित व्यवसाय दर्ता फारम बुझाउनुहोस्।",
        },
      },
      {
        title: { en: "Pay the registration fee", ne: "दर्ता शुल्क तिर्नुहोस्" },
        description: {
          en: "Fee depends on the nature and scale of the business.",
          ne: "शुल्क व्यवसायको प्रकार र आकार अनुसार हुन्छ।",
        },
      },
      {
        title: {
          en: "Collect your registration certificate",
          ne: "दर्ता प्रमाणपत्र लिनुहोस्",
        },
        description: {
          en: "Use this certificate to open a bank account and register for PAN.",
          ne: "यो प्रमाणपत्रले बैंक खाता खोल्न र PAN दर्ताका लागि प्रयोग गर्न सकिन्छ।",
        },
      },
    ],
  },

  {
    slug: "pan-registration-guidance",
    categorySlug: "business-tax",
    officeKey: "inland-revenue-office",
    title: { en: "PAN Registration Guidance", ne: "PAN दर्ता मार्गदर्शन" },
    summary: {
      en: "Get a Permanent Account Number (PAN) for your business or professional tax purposes.",
      ne: "व्यवसाय वा व्यावसायिक करका लागि स्थायी लेखा नम्बर (PAN) प्राप्त गर्नुहोस्।",
    },
    keywords: ["pan card", "tax number", "ird", "प्यान दर्ता", "कर दर्ता"],
    feeInfo: {
      en: "No fee to register for a PAN.",
      ne: "PAN दर्ता गर्न कुनै शुल्क लाग्दैन।",
    },
    timeInfo: {
      en: "Usually issued the same day.",
      ne: "सामान्यतया सोही दिन जारी हुन्छ।",
    },

    officialLink: "https://ird.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Do you have a registered business, or are you starting professional/consulting work that needs to be taxed?",
          ne: "तपाईंसँग दर्ता भएको व्यवसाय छ, वा कर लाग्ने व्यावसायिक/परामर्श कार्य सुरु गर्दै हुनुहुन्छ?",
        },
        reasonNo: {
          en: "A PAN is for taxable business or professional income. If you don’t have a registered business yet, start with Business Registration first.",
          ne: "PAN करयोग्य व्यवसाय वा व्यावसायिक आम्दानीका लागि हो। दर्ता भएको व्यवसाय नभएमा पहिले व्यवसाय दर्ता गर्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Do you have your business registration certificate and citizenship certificate?",
          ne: "तपाईंसँग व्यवसाय दर्ता प्रमाणपत्र र नागरिकता प्रमाणपत्र छ?",
        },
        reasonNo: {
          en: "Both documents are required to register for a PAN at the Inland Revenue Office.",
          ne: "आन्तरिक राजस्व कार्यालयमा PAN दर्ता गर्न दुवै कागजात आवश्यक पर्छ।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Business registration certificate",
          ne: "व्यवसाय दर्ता प्रमाणपत्र",
        },
        isMandatory: true,
      },
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photo", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: {
          en: "Fill the PAN application",
          ne: "PAN आवेदन फारम भर्नुहोस्",
        },
        description: {
          en: "Available at the Inland Revenue Office or its online portal.",
          ne: "आन्तरिक राजस्व कार्यालय वा अनलाइन पोर्टलमा उपलब्ध।",
        },
      },
      {
        title: {
          en: "Submit documents at the Inland Revenue Office",
          ne: "आन्तरिक राजस्व कार्यालयमा कागजात बुझाउनुहोस्",
        },
        description: {
          en: "Hand in the form with your business and identity documents.",
          ne: "व्यवसाय र परिचयका कागजातसहित फारम बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Receive your PAN certificate",
          ne: "PAN प्रमाणपत्र प्राप्त गर्नुहोस्",
        },
        description: {
          en: "Keep this number for all future tax filing.",
          ne: "भविष्यको कर विवरणका लागि यो नम्बर सुरक्षित राख्नुहोस्।",
        },
      },
    ],
  },

  {
    slug: "social-security-allowance",
    categorySlug: "social-security",
    officeKey: "ward-office",
    title: { en: "Social Security Allowance", ne: "सामाजिक सुरक्षा भत्ता" },
    summary: {
      en: "Apply for a monthly government allowance for senior citizens, single women, or persons with disabilities.",
      ne: "ज्येष्ठ नागरिक, एकल महिला वा अपाङ्गता भएका व्यक्तिका लागि मासिक सरकारी भत्ताका लागि आवेदन दिनुहोस्।",
    },
    keywords: [
      "old age allowance",
      "elderly pension",
      "disability allowance",
      "सामाजिक सुरक्षा भत्ता",
      "वृद्ध भत्ता",
    ],
    feeInfo: { en: "Free to apply.", ne: "आवेदन दिन निःशुल्क।" },
    timeInfo: {
      en: "Approved allowances are distributed quarterly.",
      ne: "स्वीकृत भत्ता त्रैमासिक रूपमा वितरण हुन्छ।",
    },

    officialLink: "https://mowcsc.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Do you meet at least one category: age 68+, a single woman, or a person with a disability?",
          ne: "तपाईं कम्तीमा एउटा वर्गमा पर्नुहुन्छ: ६८+ उमेर, एकल महिला, वा अपाङ्गता भएको व्यक्ति?",
        },
        reasonNo: {
          en: "This allowance is limited to senior citizens, single women, and persons with disabilities as defined by the Social Security Act. Check with your ward for other support programs.",
          ne: "यो भत्ता सामाजिक सुरक्षा ऐनमा तोकिएअनुसार ज्येष्ठ नागरिक, एकल महिला र अपाङ्गता भएका व्यक्तिका लागि मात्र हो। अन्य सहयोग कार्यक्रमका लागि वडामा सोध्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Are you registered as a permanent resident in this ward?",
          ne: "तपाईं यस वडामा स्थायी बासिन्दाको रूपमा दर्ता हुनुहुन्छ?",
        },
        reasonNo: {
          en: "The allowance is applied for through your permanent ward of residence. Complete Migration Registration first if you have recently moved.",
          ne: "भत्ताका लागि आफ्नो स्थायी वडाबाटै आवेदन दिनुपर्छ। भर्खरै बसाइँ सरेको भए पहिले बसाइँ सराइ दर्ता गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photos", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: true,
      },
      {
        name: {
          en: "Disability card (if applying under disability category)",
          ne: "अपाङ्गता परिचयपत्र (अपाङ्गता वर्गमा आवेदन दिने भए)",
        },
        isMandatory: false,
      },
      {
        name: { en: "Bank account details", ne: "बैंक खाताको विवरण" },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: {
          en: "Collect the application form",
          ne: "आवेदन फारम लिनुहोस्",
        },
        description: {
          en: "Available free of cost at your ward office.",
          ne: "वडा कार्यालयमा निःशुल्क उपलब्ध।",
        },
      },
      {
        title: {
          en: "Submit form and documents",
          ne: "फारम र कागजात बुझाउनुहोस्",
        },
        description: {
          en: "Hand in the completed form with supporting documents.",
          ne: "भरिएको फारम सहायक कागजातसहित बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Get listed in the ward register",
          ne: "वडाको लगतमा नाम दर्ता गराउनुहोस्",
        },
        description: {
          en: "Your name is added to the social security beneficiary list.",
          ne: "तपाईंको नाम सामाजिक सुरक्षा लाभग्राही सूचीमा थपिन्छ।",
        },
      },
      {
        title: { en: "Receive the allowance", ne: "भत्ता प्राप्त गर्नुहोस्" },
        description: {
          en: "Paid quarterly to your bank account or in cash at the ward.",
          ne: "त्रैमासिक रूपमा बैंक खातामा वा वडामा नगदमा भुक्तानी हुन्छ।",
        },
      },
    ],
  },

  {
    slug: "agriculture-subsidy",
    categorySlug: "agriculture",
    officeKey: "agriculture-knowledge-center",
    title: { en: "Agriculture Subsidy", ne: "कृषि अनुदान" },
    summary: {
      en: "Apply for government subsidy on seeds, fertilizer, equipment, or irrigation for your farm.",
      ne: "आफ्नो खेतीका लागि बीउ, मल, उपकरण वा सिँचाइमा सरकारी अनुदानका लागि आवेदन दिनुहोस्।",
    },
    keywords: [
      "farm subsidy",
      "krishi anudan",
      "fertilizer subsidy",
      "कृषि अनुदान",
      "बीउ अनुदान",
    ],
    feeInfo: {
      en: "Free to apply; subsidy amount varies by scheme.",
      ne: "आवेदन दिन निःशुल्क; अनुदान रकम योजना अनुसार फरक हुन्छ।",
    },
    timeInfo: {
      en: "Depends on the subsidy program cycle, often seasonal.",
      ne: "अनुदान कार्यक्रमको चक्र अनुसार, प्रायः मौसमी।",
    },

    officialLink: "https://moald.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you a registered farmer with land you own or lease for farming?",
          ne: "तपाईं आफ्नो वा भाडामा लिएको जग्गामा खेती गर्ने दर्ता भएको किसान हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Subsidies are provided to registered farmers actively cultivating land. Register as a farmer at your Agriculture Knowledge Centre first.",
          ne: "अनुदान सक्रिय रूपमा खेती गर्ने दर्ता भएका किसानलाई दिइन्छ। पहिले कृषि ज्ञान केन्द्रमा किसानको रूपमा दर्ता गर्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Do you have your citizenship certificate and land ownership/lease proof?",
          ne: "तपाईंसँग नागरिकता र जग्गाधनी वा भाडा सम्झौताको प्रमाण छ?",
        },
        reasonNo: {
          en: "These documents confirm your identity and farming location for the subsidy program.",
          ne: "यी कागजातले अनुदान कार्यक्रमका लागि तपाईंको परिचय र खेती स्थान पुष्टि गर्छन्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: {
          en: "Land ownership certificate or lease agreement",
          ne: "जग्गाधनी प्रमाणपत्र वा भाडा सम्झौता",
        },
        isMandatory: true,
      },
      {
        name: { en: "Farmer registration card", ne: "किसान परिचयपत्र" },
        isMandatory: false,
      },
      {
        name: { en: "Bank account details", ne: "बैंक खाताको विवरण" },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: {
          en: "Register as a farmer",
          ne: "किसानको रूपमा दर्ता गर्नुहोस्",
        },
        description: {
          en: "If not already registered, sign up at the Agriculture Knowledge Centre.",
          ne: "पहिले नै दर्ता नभएको भए कृषि ज्ञान केन्द्रमा दर्ता गर्नुहोस्।",
        },
      },
      {
        title: {
          en: "Apply for the subsidy scheme",
          ne: "अनुदान योजनाका लागि आवेदन दिनुहोस्",
        },
        description: {
          en: "Submit the application form with your documents.",
          ne: "कागजातसहित आवेदन फारम बुझाउनुहोस्।",
        },
      },
      {
        title: { en: "Site verification", ne: "स्थल निरीक्षण" },
        description: {
          en: "An agriculture officer may visit your farmland to verify the application.",
          ne: "कृषि अधिकारीले तपाईंको खेतबारी निरीक्षण गर्न आउन सक्छन्।",
        },
      },
      {
        title: { en: "Receive the subsidy", ne: "अनुदान प्राप्त गर्नुहोस्" },
        description: {
          en: "Subsidy is disbursed as cash, discounted inputs, or reimbursement.",
          ne: "अनुदान नगद, छुट दरमा सामग्री, वा प्रतिपूर्तिको रूपमा वितरण हुन्छ।",
        },
      },
    ],
  },

  {
    slug: "agricultural-training",
    categorySlug: "agriculture",
    officeKey: "agriculture-knowledge-center",
    title: { en: "Agricultural Training", ne: "कृषि तालिम" },
    summary: {
      en: "Enroll in free technical training on modern farming, livestock, or horticulture practices.",
      ne: "आधुनिक खेती, पशुपालन वा बागवानी अभ्यासमा निःशुल्क प्राविधिक तालिममा सहभागी हुनुहोस्।",
    },
    keywords: [
      "farmer training",
      "krishi talim",
      "kisan training",
      "कृषि तालिम",
      "किसान तालिम",
    ],
    feeInfo: {
      en: "Free; some programs cover travel allowance.",
      ne: "निःशुल्क; केही कार्यक्रमले यातायात भत्ता समेत दिन्छन्।",
    },
    timeInfo: {
      en: "Training batches are scheduled seasonally.",
      ne: "तालिम समूह मौसम अनुसार तालिका बनाइन्छ।",
    },

    officialLink: "https://moald.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you actively engaged in or planning to start farming, livestock, or horticulture?",
          ne: "तपाईं खेती, पशुपालन वा बागवानीमा सक्रिय हुनुहुन्छ वा सुरु गर्ने योजनामा हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Training slots are prioritized for active or aspiring farmers. Speak with your local Agriculture Knowledge Centre about upcoming general-orientation sessions.",
          ne: "तालिम स्थान सक्रिय वा नयाँ किसानहरूलाई प्राथमिकतामा दिइन्छ। आगामी सामान्य अभिमुखीकरण सत्रका बारे कृषि ज्ञान केन्द्रमा सोध्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photo", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: true,
      },
      {
        name: {
          en: "Farmer registration card, if available",
          ne: "किसान परिचयपत्र, भए",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: {
          en: "Check the training schedule",
          ne: "तालिम तालिका बुझ्नुहोस्",
        },
        description: {
          en: "Visit or call the Agriculture Knowledge Centre for the next batch.",
          ne: "अर्को समूहका लागि कृषि ज्ञान केन्द्रमा सम्पर्क गर्नुहोस्।",
        },
      },
      {
        title: { en: "Register for a batch", ne: "समूहमा दर्ता गर्नुहोस्" },
        description: {
          en: "Submit your name and documents to reserve a seat.",
          ne: "स्थान सुरक्षित गर्न आफ्नो नाम र कागजात बुझाउनुहोस्।",
        },
      },
      {
        title: { en: "Attend the training", ne: "तालिममा सहभागी हुनुहोस्" },
        description: {
          en: "Sessions typically run over a few days.",
          ne: "सत्रहरू सामान्यतया केही दिन चल्छन्।",
        },
      },
      {
        title: {
          en: "Receive a training certificate",
          ne: "तालिम प्रमाणपत्र प्राप्त गर्नुहोस्",
        },
        description: {
          en: "Useful for future subsidy or credit applications.",
          ne: "भविष्यको अनुदान वा ऋण आवेदनका लागि उपयोगी।",
        },
      },
    ],
  },

  {
    slug: "disaster-loss-reporting",
    categorySlug: "disaster-relief",
    officeKey: "ward-office",
    title: { en: "Disaster Loss Reporting", ne: "विपद् क्षति प्रतिवेदन" },
    summary: {
      en: "Report property, crop, or livestock loss from a flood, fire, landslide, or other disaster to claim relief.",
      ne: "बाढी, आगलागी, पहिरो वा अन्य विपद्बाट भएको सम्पत्ति, बाली वा पशुधनको क्षति राहतका लागि प्रतिवेदन गर्नुहोस्।",
    },
    keywords: [
      "flood relief",
      "disaster relief",
      "fire damage report",
      "विपद् राहत",
      "क्षति प्रतिवेदन",
    ],
    feeInfo: { en: "Free to report.", ne: "प्रतिवेदन गर्न निःशुल्क।" },
    timeInfo: {
      en: "Report as soon as possible, ideally within a few days of the incident.",
      ne: "घटना भएको केही दिनभित्र सकेसम्म चाँडो प्रतिवेदन गर्नुहोस्।",
    },

    officialLink: "https://drr.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Did the loss happen within your current ward’s area?",
          ne: "क्षति तपाईंको हालको वडा क्षेत्रभित्रै भएको हो?",
        },
        reasonNo: {
          en: "Loss reports are filed with the ward where the damage occurred, not necessarily where you live. Contact that ward office directly.",
          ne: "क्षति प्रतिवेदन क्षति भएको वडामा दर्ता गरिन्छ, तपाईं बसेको वडामा नभई। सोही वडा कार्यालयमा सम्पर्क गर्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Can you provide photos or other evidence of the damage?",
          ne: "तपाईंसँग क्षतिको फोटो वा अन्य प्रमाण छ?",
        },
        reasonNo: {
          en: "Evidence speeds up verification, but you can still file an initial report and add evidence later when a ward representative visits.",
          ne: "प्रमाणले प्रमाणीकरण छिटो बनाउँछ, तर वडा प्रतिनिधि निरीक्षणमा आउँदा पछि प्रमाण थप्न सकिने गरी प्रारम्भिक प्रतिवेदन दिन सकिन्छ।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: { en: "Photos of the damage", ne: "क्षतिको फोटो" },
        isMandatory: false,
      },
      {
        name: {
          en: "Land ownership certificate (for property/crop loss)",
          ne: "जग्गाधनी प्रमाणपत्र (सम्पत्ति/बाली क्षतिका लागि)",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: {
          en: "Report to your ward immediately",
          ne: "तुरुन्त वडामा सूचना दिनुहोस्",
        },
        description: {
          en: "Call or visit the ward office to log the incident.",
          ne: "घटना अभिलेख गर्न वडा कार्यालयमा फोन गर्नुहोस् वा भ्रमण गर्नुहोस्।",
        },
      },
      {
        title: { en: "Site assessment", ne: "स्थल मूल्याङ्कन" },
        description: {
          en: "A ward or district team assesses the extent of the loss.",
          ne: "वडा वा जिल्ला टोलीले क्षतिको मात्रा मूल्याङ्कन गर्छ।",
        },
      },
      {
        title: {
          en: "Submit a formal loss claim",
          ne: "औपचारिक क्षति दाबी बुझाउनुहोस्",
        },
        description: {
          en: "Fill the relief claim form with any supporting evidence.",
          ne: "सहायक प्रमाणसहित राहत दाबी फारम भर्नुहोस्।",
        },
      },
      {
        title: {
          en: "Receive relief support",
          ne: "राहत सहयोग प्राप्त गर्नुहोस्",
        },
        description: {
          en: "Relief may be cash, materials, or reconstruction support depending on the disaster.",
          ne: "विपद् अनुसार राहत नगद, सामग्री वा पुनर्निर्माण सहयोगको रूपमा दिइन्छ।",
        },
      },
    ],
  },

  {
    slug: "ward-recommendation",
    categorySlug: "ward-municipal",
    officeKey: "ward-office",
    title: { en: "Ward Recommendation", ne: "वडा सिफारिस" },
    summary: {
      en: "Get a general-purpose recommendation letter from your ward for banking, scholarships, employment, or other needs.",
      ne: "बैंकिङ, छात्रवृत्ति, रोजगारी वा अन्य आवश्यकताका लागि वडाबाट सामान्य प्रयोजनको सिफारिस पत्र प्राप्त गर्नुहोस्।",
    },
    keywords: [
      "ward recommendation letter",
      "sifarish",
      "letter of recommendation",
      "वडा सिफारिस",
      "सिफारिस पत्र",
    ],
    feeInfo: {
      en: "Small fixed fee set by the ward.",
      ne: "वडाले तोकेको सामान्य शुल्क।",
    },
    timeInfo: {
      en: "Usually issued the same day.",
      ne: "सामान्यतया सोही दिन जारी हुन्छ।",
    },

    officialLink: "https://nepalgunjmun.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you a permanent resident of this ward, or can a family member confirm your residence here?",
          ne: "तपाईं यस वडाको स्थायी बासिन्दा हुनुहुन्छ, वा परिवारको सदस्यले यहाँको बसोबास पुष्टि गर्न सक्नुहुन्छ?",
        },
        reasonNo: {
          en: "A ward can only issue recommendations for its own registered residents. If you’ve recently moved, complete Migration Registration first.",
          ne: "वडाले आफ्नो दर्ता भएका बासिन्दाका लागि मात्र सिफारिस दिन सक्छ। भर्खरै सरेको भए पहिले बसाइँ सराइ दर्ता गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: {
          en: "Reason for the recommendation (e.g. bank, scholarship)",
          ne: "सिफारिसको कारण (जस्तै: बैंक, छात्रवृत्ति)",
        },
        isMandatory: true,
      },
      {
        name: { en: "Passport-size photo", ne: "पासपोर्ट साइजको फोटो" },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: { en: "Fill the request form", ne: "अनुरोध फारम भर्नुहोस्" },
        description: {
          en: "State the exact purpose you need the letter for.",
          ne: "पत्र चाहिनुको ठ्याक्कै उद्देश्य उल्लेख गर्नुहोस्।",
        },
      },
      {
        title: {
          en: "Submit at the ward office",
          ne: "वडा कार्यालयमा बुझाउनुहोस्",
        },
        description: {
          en: "Provide your citizenship and any supporting document.",
          ne: "नागरिकता र सहायक कागजात बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Collect the recommendation letter",
          ne: "सिफारिस पत्र लिनुहोस्",
        },
        description: {
          en: "Signed and stamped, ready to submit wherever it’s needed.",
          ne: "हस्ताक्षर र छाप लागेको, आवश्यक ठाउँमा बुझाउन तयार।",
        },
      },
    ],
  },

  {
    slug: "house-construction-map-approval",
    categorySlug: "construction-housing",
    officeKey: "urban-development-office",
    title: {
      en: "House Construction / Map Approval Guidance",
      ne: "घर निर्माण / नक्सा पास मार्गदर्शन",
    },
    summary: {
      en: "Get your house design (naksa) approved before starting construction on your land.",
      ne: "आफ्नो जग्गामा निर्माण सुरु गर्नुअघि घरको डिजाइन (नक्सा) पास गराउनुहोस्।",
    },
    keywords: [
      "naksa pass",
      "map approval",
      "building permit",
      "नक्सा पास",
      "घर नक्सा",
    ],
    feeInfo: {
      en: "Fee depends on plot size and building type; check with the municipal or urban development office.",
      ne: "शुल्क जग्गाको क्षेत्रफल र भवनको प्रकार अनुसार हुन्छ; नगरपालिका वा शहरी विकास कार्यालयमा सोध्नुहोस्।",
    },
    timeInfo: {
      en: "Typically a few weeks depending on plan complexity.",
      ne: "नक्साको जटिलता अनुसार सामान्यतया केही हप्ता लाग्छ।",
    },

    // For your Nepalgunj-focused catalog, map approval is handled through the local municipality.
    officialLink: "https://nepalgunjmun.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Do you hold ownership of the land (or written consent from the owner)?",
          ne: "तपाईंसँग जग्गाको स्वामित्व छ (वा जग्गाधनीको लिखित सहमति छ)?",
        },
        reasonNo: {
          en: "Map approval requires proof of ownership or the owner’s written consent to build. This must be arranged before applying.",
          ne: "नक्सा पासका लागि स्वामित्वको प्रमाण वा जग्गाधनीको निर्माणका लागि लिखित सहमति आवश्यक पर्छ। आवेदन दिनुअघि यो तयार गर्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Do you have a building design prepared by a registered engineer or architect?",
          ne: "तपाईंसँग दर्ता भएको इन्जिनियर वा वास्तुकारले तयार गरेको भवन डिजाइन छ?",
        },
        reasonNo: {
          en: "Map approval requires a design certified by a registered engineer. Consult one to prepare your building plan first.",
          ne: "नक्सा पासका लागि दर्ता भएको इन्जिनियरले प्रमाणित गरेको डिजाइन आवश्यक पर्छ। पहिले इन्जिनियरसँग सल्लाह गरी नक्सा तयार गर्नुहोस्।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Land ownership certificate (lalpurja)",
          ne: "जग्गाधनी प्रमाणपत्र (लालपुर्जा)",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Building design/map by a registered engineer",
          ne: "दर्ता भएको इन्जिनियरद्वारा तयार भवन नक्सा",
        },
        isMandatory: true,
      },
      {
        name: { en: "Citizenship certificate", ne: "नागरिकता प्रमाणपत्र" },
        isMandatory: true,
      },
      {
        name: {
          en: "Land tax clearance certificate",
          ne: "मालपोत तिरेको प्रमाणपत्र",
        },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: {
          en: "Prepare your design with an engineer",
          ne: "इन्जिनियरसँग नक्सा तयार गर्नुहोस्",
        },
        description: {
          en: "Hire a registered engineer to draft a compliant building plan.",
          ne: "नियमसम्मत भवन योजना तयार गर्न दर्ता भएको इन्जिनियर लगाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Submit the map for approval",
          ne: "पास गर्न नक्सा बुझाउनुहोस्",
        },
        description: {
          en: "File the design and land documents at the urban development or municipal office.",
          ne: "शहरी विकास वा नगरपालिका कार्यालयमा नक्सा र जग्गाका कागजात बुझाउनुहोस्।",
        },
      },
      {
        title: { en: "Site inspection", ne: "स्थल निरीक्षण" },
        description: {
          en: "An officer may visit the plot to verify the plan matches the site.",
          ne: "योजना जग्गासँग मिल्छ कि भनी अधिकारीले निरीक्षण गर्न सक्छन्।",
        },
      },
      {
        title: {
          en: "Receive the approved map",
          ne: "पास भएको नक्सा प्राप्त गर्नुहोस्",
        },
        description: {
          en: "Construction can legally begin only after this approval.",
          ne: "यो स्वीकृतिपछि मात्र कानूनी रूपमा निर्माण सुरु गर्न सकिन्छ।",
        },
      },
    ],
  },

  {
    slug: "driving-licence-registration",
    categorySlug: "transportation",
    officeKey: "transport-management-office",

    title: {
      en: "New Driving Licence Registration",
      ne: "नयाँ सवारी चालक अनुमतिपत्र दर्ता",
    },

    summary: {
      en: "Apply for a new Nepali driving licence through the Department of Transport Management, from online application and biometric verification to the written and practical examinations.",
      ne: "यातायात व्यवस्था विभागमार्फत नयाँ सवारी चालक अनुमतिपत्रका लागि अनलाइन आवेदनदेखि बायोमेट्रिक दर्ता, लिखित परीक्षा र प्रयोगात्मक परीक्षासम्मको प्रक्रिया पूरा गर्नुहोस्।",
    },

    keywords: [
      "new driving licence",
      "new driving license",
      "driving licence registration",
      "driving licence application",
      "driving license application",
      "new license",
      "driving test",
      "written test",
      "practical trial",
      "biometric",
      "transport management office",
      "सवारी चालक अनुमतिपत्र",
      "नयाँ लाइसेन्स",
      "ड्राइभिङ लाइसेन्स",
      "लाइसेन्स आवेदन",
      "लिखित परीक्षा",
      "प्रयोगात्मक परीक्षा",
      "ट्रायल",
      "बायोमेट्रिक",
      "यातायात व्यवस्था कार्यालय",
    ],

    feeInfo: {
      en: "Government fees apply according to the selected licence category and applicable process. Check the official transport office notice for the current amount.",
      ne: "छनोट गरिएको लाइसेन्स वर्ग र लागू प्रक्रियाअनुसार सरकारी शुल्क लाग्छ। हालको शुल्कका लागि सम्बन्धित यातायात कार्यालयको आधिकारिक सूचना हेर्नुहोस्।",
    },

    timeInfo: {
      en: "Processing time depends on online quota availability, office visit date, biometric verification, written examination, practical trial, and licence printing schedules.",
      ne: "समय अनलाइन कोटा उपलब्धता, कार्यालय भ्रमण मिति, बायोमेट्रिक दर्ता, लिखित परीक्षा, प्रयोगात्मक परीक्षा र लाइसेन्स छपाइको तालिकामा निर्भर हुन्छ।",
    },

    officialLink: "https://dotm.gov.np",

    eligibility: [
  {
    type: "age",
    vehicleCategories: ["A", "K"],
    minimumAge: 16,
    prompt: {
      en: "Are you at least 16 years old?",
      ne: "तपाईं कम्तीमा १६ वर्ष उमेर पूरा गर्नुभएको छ?",
    },
    reasonNo: {
      en: "You must be at least 16 years old.",
      ne: "तपाईं कम्तीमा १६ वर्ष उमेर पूरा गरेको हुनुपर्छ।",
    },
  },

  {
    type: "age",
    vehicleCategories: ["B"],
    minimumAge: 18,
    prompt: {
      en: "Are you at least 18 years old?",
      ne: "तपाईं कम्तीमा १८ वर्ष उमेर पूरा गर्नुभएको छ?",
    },
    reasonNo: {
      en: "You must be at least 18 years old.",
      ne: "तपाईं कम्तीमा १८ वर्ष उमेर पूरा गरेको हुनुपर्छ।",
    },
  },

  {
    type: "age",
    vehicleCategories: ["C", "C1", "D", "E", "F", "G"],
    minimumAge: 21,
    prompt: {
      en: "Are you at least 21 years old?",
      ne: "तपाईं कम्तीमा २१ वर्ष उमेर पूरा गर्नुभएको छ?",
    },
    reasonNo: {
      en: "You must be at least 21 years old for this vehicle category.",
      ne: "यस सवारी वर्गका लागि तपाईं कम्तीमा २१ वर्ष उमेर पूरा भएको हुनुपर्छ।",
    },
  },

  {
    type: "health",
    vehicleCategories: ["A", "K", "B", "C", "C1", "D", "E", "F", "G"],
    prompt: {
      en: "Do you meet the required health conditions?",
      ne: "तपाईं आवश्यक स्वास्थ्यसम्बन्धी योग्यता पूरा गर्नुहुन्छ?",
    },
    reasonNo: {
      en: "You do not meet the required health conditions.",
      ne: "तपाईं आवश्यक स्वास्थ्यसम्बन्धी योग्यता पूरा गर्नुहुन्न।",
    },
  },

  {
    type: "document",
    vehicleCategories: ["A", "K", "B", "C", "C1", "D", "E", "F", "G"],
    prompt: {
      en: "Do you have the required identity document?",
      ne: "तपाईंसँग आवश्यक परिचयपत्र छ?",
    },
    reasonNo: {
      en: "The required identity document is needed.",
      ne: "आवश्यक परिचयपत्र आवश्यक हुन्छ।",
    },
  },
],
    documents: [
      {
        name: {
          en: "Nepali citizenship certificate",
          ne: "नेपाली नागरिकताको प्रमाणपत्र",
        },
        isMandatory: true,
      },

      {
        name: {
          en: "Scanned copy of the original citizenship certificate for online application",
          ne: "अनलाइन आवेदनका लागि सक्कल नागरिकता प्रमाणपत्रको स्क्यान गरिएको प्रतिलिपि",
        },
        isMandatory: true,
      },

      {
        name: {
          en: "Medical/health certificate",
          ne: "स्वास्थ्य/निरोगिताको प्रमाणपत्र",
        },
        isMandatory: true,
      },
    ],

    journey: [
      {
        title: {
          en: "Create your online applicant profile",
          ne: "अनलाइन आवेदक प्रोफाइल बनाउनुहोस्",
        },

        description: {
          en: "Create an applicant profile using your own mobile number and provide your personal details accurately.",
          ne: "आफ्नै मोबाइल नम्बर प्रयोग गरी आवेदक प्रोफाइल बनाउनुहोस् र व्यक्तिगत विवरण सही रूपमा भर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Choose the licence category and office",
          ne: "लाइसेन्स वर्ग र कार्यालय छनोट गर्नुहोस्",
        },

        description: {
          en: "Select the vehicle category you are eligible for and choose a Transport Management Office or Service Office where an application quota is available.",
          ne: "आफू योग्य भएको सवारी वर्ग छनोट गरी आवेदन कोटा उपलब्ध भएको यातायात व्यवस्था कार्यालय वा सेवा कार्यालय छनोट गर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Submit the online application",
          ne: "अनलाइन आवेदन बुझाउनुहोस्",
        },

        description: {
          en: "Enter your details correctly, upload the required scanned identity document, and submit the application for the selected office visit date.",
          ne: "आफ्नो विवरण सही रूपमा भरी आवश्यक स्क्यान गरिएको परिचयपत्र अपलोड गरी छनोट गरिएको कार्यालय भ्रमण मितिका लागि आवेदन बुझाउनुहोस्।",
        },
      },

      {
        title: {
          en: "Complete biometric verification",
          ne: "बायोमेट्रिक दर्ता पूरा गर्नुहोस्",
        },

        description: {
          en: "Visit the selected transport office on the assigned date with your original citizenship and complete document verification and biometric registration.",
          ne: "तोकिएको मितिमा सक्कल नागरिकतासहित सम्बन्धित यातायात कार्यालयमा उपस्थित भई कागजात रुजु तथा बायोमेट्रिक दर्ता पूरा गर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Take the written examination",
          ne: "लिखित परीक्षा दिनुहोस्",
        },

        description: {
          en: "Attend the written examination for your selected vehicle category according to the schedule published by the responsible office.",
          ne: "सम्बन्धित कार्यालयले प्रकाशित गरेको तालिकाअनुसार छनोट गरिएको सवारी वर्गको लिखित परीक्षा दिनुहोस्।",
        },
      },

      {
        title: {
          en: "Take the practical driving trial",
          ne: "प्रयोगात्मक सवारी परीक्षा दिनुहोस्",
        },

        description: {
          en: "After passing the required written examination, attend the practical trial at the designated examination centre according to the published schedule.",
          ne: "आवश्यक लिखित परीक्षा उत्तीर्ण गरेपछि प्रकाशित तालिकाअनुसार तोकिएको परीक्षा केन्द्रमा प्रयोगात्मक सवारी परीक्षा दिनुहोस्।",
        },
      },

      {
        title: {
          en: "Complete the licence issuance process",
          ne: "लाइसेन्स जारी गर्ने प्रक्रिया पूरा गर्नुहोस्",
        },

        description: {
          en: "After successfully completing the required examinations, follow the responsible office instructions for applicable payment, licence processing, and collection or printing.",
          ne: "आवश्यक परीक्षा सफलतापूर्वक पूरा गरेपछि लागू हुने राजस्व, लाइसेन्स प्रक्रिया तथा प्राप्ति वा छपाइसम्बन्धी सम्बन्धित कार्यालयको निर्देशन पालना गर्नुहोस्।",
        },
      },
    ],
  },

  {
    slug: "driving-licence-renewal",
    categorySlug: "transportation",
    officeKey: "transport-management-office",

    title: {
      en: "Driving Licence Renewal",
      ne: "सवारी चालक अनुमतिपत्र नवीकरण",
    },

    summary: {
      en: "Get guidance on applying for a Nepali driving license, including eligibility, documents, written test, and practical trial.",
      ne: "नेपाली सवारी चालक अनुमतिपत्रका लागि आवेदन, आवश्यक कागजात, लिखित परीक्षा र प्रयोगात्मक परीक्षाबारे मार्गदर्शन प्राप्त गर्नुहोस्।",
    },

    keywords: [
      "driving license",
      "driver license",
      "license application",
      "driving test",
      "trial",
      "सवारी चालक अनुमतिपत्र",
      "ड्राइभिङ लाइसेन्स",
      "लाइसेन्स",
    ],

    feeInfo: {
      en: "Government fees apply depending on the license category and process.",
      ne: "लाइसेन्सको वर्ग र प्रक्रियाअनुसार सरकारी शुल्क लाग्छ।",
    },

    timeInfo: {
      en: "Processing time varies depending on appointment availability and test schedules.",
      ne: "समय उपलब्धता र परीक्षाको तालिका अनुसार प्रक्रिया पूरा हुन केही समय लाग्न सक्छ।",
    },

    officialLink: "https://dotm.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Are you old enough to apply for the vehicle category you want?",
          ne: "तपाईंले आवेदन दिन चाहेको सवारीको वर्गका लागि आवश्यक उमेर पूरा गर्नुभएको छ?",
        },
        reasonNo: {
          en: "Minimum age requirements vary by vehicle category. Check the current requirements before applying.",
          ne: "सवारीको वर्गअनुसार न्यूनतम उमेर फरक हुन्छ। आवेदन दिनुअघि हालको उमेरसम्बन्धी आवश्यकताहरू जाँच गर्नुहोस्।",
        },
      },
      {
        prompt: {
          en: "Do you have the required identity documents and medical/health documentation if applicable?",
          ne: "तपाईंसँग आवश्यक परिचयपत्र र लागू भएमा स्वास्थ्यसम्बन्धी कागजात छन्?",
        },
        reasonNo: {
          en: "Required documents must be prepared before submitting the license application.",
          ne: "लाइसेन्स आवेदन दिनुअघि आवश्यक कागजातहरू तयार गर्नुपर्छ।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Citizenship certificate or accepted identity document",
          ne: "नागरिकता प्रमाणपत्र वा स्वीकृत परिचयपत्र",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Passport-size photographs",
          ne: "पासपोर्ट साइजको फोटो",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Medical/health certificate, if required",
          ne: "आवश्यक भए स्वास्थ्य प्रमाणपत्र",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: {
          en: "Check eligibility and category",
          ne: "योग्यता र सवारी वर्ग जाँच गर्नुहोस्",
        },
        description: {
          en: "Choose the appropriate vehicle category and confirm that you meet the required age and other eligibility requirements.",
          ne: "उपयुक्त सवारी वर्ग छनोट गरी आवश्यक उमेर तथा अन्य योग्यता पूरा भएको सुनिश्चित गर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Submit the online application",
          ne: "अनलाइन आवेदन बुझाउनुहोस्",
        },
        description: {
          en: "Create your applicant profile, select the eligible vehicle category and an available transport office, then submit the online application.",
          ne: "आवेदक प्रोफाइल बनाई योग्य सवारी वर्ग र उपलब्ध यातायात कार्यालय छनोट गरी अनलाइन आवेदन बुझाउनुहोस्।",
        },
      },

      {
        title: {
          en: "Visit the transport office for verification and biometric registration",
          ne: "रुजु तथा बायोमेट्रिक दर्ताका लागि यातायात कार्यालय जानुहोस्",
        },
        description: {
          en: "Visit the selected transport office on the assigned date with your original citizenship certificate. Complete document verification, photograph capture, signature, and biometric registration.",
          ne: "तोकिएको मितिमा सक्कल नागरिकता प्रमाणपत्रसहित सम्बन्धित यातायात कार्यालयमा उपस्थित भई कागजात रुजु, फोटो खिचाउने, हस्ताक्षर र बायोमेट्रिक दर्ता पूरा गर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Take the written examination",
          ne: "लिखित परीक्षा दिनुहोस्",
        },
        description: {
          en: "Attend and pass the written examination for your selected vehicle category according to the published schedule.",
          ne: "प्रकाशित तालिकाअनुसार आफूले छनोट गरेको सवारी वर्गको लिखित परीक्षा दिनुहोस् र उत्तीर्ण गर्नुहोस्।",
        },
      },

      {
        title: {
          en: "Take the practical driving trial",
          ne: "प्रयोगात्मक सवारी परीक्षा दिनुहोस्",
        },
        description: {
          en: "After passing the written examination, attend the practical driving trial at the designated examination centre according to the applicable schedule and requirements.",
          ne: "लिखित परीक्षा उत्तीर्ण गरेपछि लागू तालिका र आवश्यकताअनुसार तोकिएको परीक्षा केन्द्रमा प्रयोगात्मक सवारी परीक्षा दिनुहोस्।",
        },
      },

      {
        title: {
          en: "Complete the licence issuance process",
          ne: "लाइसेन्स जारी गर्ने प्रक्रिया पूरा गर्नुहोस्",
        },
        description: {
          en: "After successfully completing the required examinations, follow the transport office instructions for the applicable payment, processing, and collection or printing of your driving licence.",
          ne: "आवश्यक परीक्षा सफलतापूर्वक पूरा गरेपछि लागू हुने राजस्व, प्रक्रिया तथा लाइसेन्स प्राप्ति वा छपाइका लागि यातायात कार्यालयको निर्देशन पालना गर्नुहोस्।",
        },
      },
    ],
  },

  {
    slug: "vehicle-registration-renewal",
    categorySlug: "transportation",
    officeKey: "transport-management-office",

    title: {
      en: "Vehicle Registration / Blue Book Renewal",
      ne: "सवारी दर्ता / ब्लूबुक नवीकरण",
    },

    summary: {
      en: "Get guidance on registering a vehicle and renewing its registration or Blue Book at the transport office.",
      ne: "यातायात कार्यालयमा सवारी दर्ता तथा सवारी दर्ता प्रमाणपत्र (ब्लूबुक) नवीकरण गर्ने प्रक्रियाबारे मार्गदर्शन प्राप्त गर्नुहोस्।",
    },

    keywords: [
      "vehicle registration",
      "blue book",
      "bluebook renewal",
      "vehicle renewal",
      "transport office",
      "सवारी दर्ता",
      "ब्लूबुक",
      "ब्लूबुक नवीकरण",
      "सवारी नवीकरण",
    ],

    feeInfo: {
      en: "Registration and renewal fees vary by vehicle type and applicable government charges.",
      ne: "सवारीको प्रकार र लागू सरकारी शुल्कअनुसार दर्ता तथा नवीकरण शुल्क फरक हुन्छ।",
    },

    timeInfo: {
      en: "Usually depends on document verification, tax payment, and transport office workload.",
      ne: "कागजात प्रमाणीकरण, कर भुक्तानी र यातायात कार्यालयको कार्यभारअनुसार समय लाग्छ।",
    },

    officialLink: "https://dotm.gov.np",

    eligibility: [
      {
        prompt: {
          en: "Do you have valid ownership documents for the vehicle?",
          ne: "तपाईंसँग सवारीको वैध स्वामित्वसम्बन्धी कागजात छन्?",
        },
        reasonNo: {
          en: "Vehicle registration or renewal requires proof of ownership and other supporting documents.",
          ne: "सवारी दर्ता वा नवीकरणका लागि स्वामित्वको प्रमाण तथा अन्य आवश्यक कागजात चाहिन्छ।",
        },
      },
      {
        prompt: {
          en: "Are the required vehicle taxes and fees ready to be paid?",
          ne: "आवश्यक सवारी कर तथा शुल्क तिर्न तयार हुनुहुन्छ?",
        },
        reasonNo: {
          en: "Applicable vehicle taxes and government fees generally need to be settled before the registration or renewal can be completed.",
          ne: "दर्ता वा नवीकरण पूरा गर्न लागू हुने सवारी कर तथा सरकारी शुल्क भुक्तानी गर्नुपर्ने हुन्छ।",
        },
      },
    ],

    documents: [
      {
        name: {
          en: "Vehicle registration certificate / Blue Book",
          ne: "सवारी दर्ता प्रमाणपत्र / ब्लूबुक",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Citizenship certificate or accepted identity document",
          ne: "नागरिकता प्रमाणपत्र वा स्वीकृत परिचयपत्र",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Proof of vehicle insurance",
          ne: "सवारी बीमाको प्रमाण",
        },
        isMandatory: true,
      },
      {
        name: {
          en: "Tax payment or renewal receipt, if applicable",
          ne: "लागू भए कर भुक्तानी वा नवीकरण रसिद",
        },
        isMandatory: false,
      },
    ],

    journey: [
      {
        title: {
          en: "Prepare vehicle documents",
          ne: "सवारीका कागजात तयार गर्नुहोस्",
        },
        description: {
          en: "Collect the Blue Book, ownership documents, insurance, and other required paperwork.",
          ne: "ब्लूबुक, स्वामित्वसम्बन्धी कागजात, बीमा तथा अन्य आवश्यक कागजात संकलन गर्नुहोस्।",
        },
      },
      {
        title: {
          en: "Clear applicable taxes and fees",
          ne: "लागू कर तथा शुल्क तिर्नुहोस्",
        },
        description: {
          en: "Pay the applicable vehicle tax and government charges before completing the renewal.",
          ne: "नवीकरण पूरा गर्नुअघि लागू हुने सवारी कर तथा सरकारी शुल्क तिर्नुहोस्।",
        },
      },
      {
        title: {
          en: "Visit the transport office",
          ne: "यातायात कार्यालय जानुहोस्",
        },
        description: {
          en: "Submit your vehicle documents for registration or renewal.",
          ne: "दर्ता वा नवीकरणका लागि सवारीका कागजात बुझाउनुहोस्।",
        },
      },
      {
        title: {
          en: "Complete verification",
          ne: "प्रमाणीकरण पूरा गर्नुहोस्",
        },
        description: {
          en: "Transport officials verify the documents and vehicle information as required.",
          ne: "यातायात अधिकारीहरूले आवश्यकताअनुसार कागजात तथा सवारी विवरण प्रमाणीकरण गर्छन्।",
        },
      },
      {
        title: {
          en: "Receive updated registration",
          ne: "अद्यावधिक दर्ता प्रमाणपत्र प्राप्त गर्नुहोस्",
        },
        description: {
          en: "Collect the updated Blue Book or registration record after the process is completed.",
          ne: "प्रक्रिया पूरा भएपछि अद्यावधिक ब्लूबुक वा दर्ता अभिलेख प्राप्त गर्नुहोस्।",
        },
      },
    ],
  },
];
