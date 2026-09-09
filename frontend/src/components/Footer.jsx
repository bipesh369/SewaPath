import { useLanguage } from "../i18n/LanguageContext.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
  const { lang } = useLanguage();

  const content = {
    en: {
      description:
        "Your guide to government services in Nepal. Search for a government service or describe what you need. SewaPath helps you understand the eligibility, required documents, process, and office location.",
      findService: "Find a Service",
      getStarted: "Get Started",

      services: "Services",
      serviceLinks: [
        "Citizenship & national ID",
        "Passport Services",
        "Driving licence",
        "Land & property",
        "Business registration",
        "Social security",
      ],

      howItWorks: "How SewaPath Works",
      howLinks: [
        "Find a service",
        "Understand the requirements",
        "Know where to go",
      ],

      contact: "Contact",
      location: "Nepalgunj, Banke, Lumbini Province",
      email: "hello@sewapath.example.np",
      hours: "Sun–Fri, 10 AM – 5 PM",

      copyright:
        "Simplifying access to government services.",
      developedBy:
        "Developed by Bipesh Junior Tharu · B.Sc. CSIT, Sixth Semester",
    },

    ne: {
      description:
        "सेवापथले नेपालका सरकारी सेवाहरू खोज्न र बुझ्न नागरिकलाई सहयोग गर्छ। आफ्नो आवश्यकता खोज्नुहोस् वा वर्णन गर्नुहोस्, र हामी तपाईंलाई आवश्यक योग्यता, कागजात, प्रक्रिया र कार्यालयको स्थान बुझ्न मद्दत गर्छौं।",
      findService: "सेवा खोज्नुहोस्",
      getStarted: "सुरु गर्नुहोस्",

      services: "सेवाहरू",
      serviceLinks: [
        "नागरिकता तथा राष्ट्रिय परिचयपत्र",
        "राहदानी सेवाहरू",
        "सवारी चालक अनुमतिपत्र",
        "जग्गा तथा सम्पत्ति",
        "व्यवसाय दर्ता",
        "सामाजिक सुरक्षा",
      ],

      howItWorks: "सेवापथले कसरी काम गर्छ",
      howLinks: [
        "सेवा खोज्नुहोस्",
        "आवश्यकता बुझ्नुहोस्",
        "कहाँ जाने थाहा पाउनुहोस्",
      ],

      contact: "सम्पर्क",
      location: "नेपालगञ्ज, बाँके, लुम्बिनी प्रदेश",
      email: "hello@sewapath.example.np",
      hours: "आइत–शुक्र, बिहान १० – बेलुका ५ बजे",

      copyright: "सरकारी सेवामा पहुँच सरल बनाउँदै।",
      developedBy:
        "बिपेश जुनियर थारुद्वारा विकसित · B.Sc. CSIT, छैटौं सेमेस्टर",
    },
  };

  const c = content[lang];

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-ink/10 bg-white">
      {/* Subtle background detail */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
      >
        <div
          className="
            absolute inset-0
            [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          {/* SewaPath */}
          <div className="md:pr-6">
            <div className="mb-4">
              <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                SewaPath
              </h2>
            </div>

            <p className="text-sm leading-6 text-ink-soft">
              {c.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium">
              <Link
                to="/services"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                {c.findService}
              </Link>

              <span className="text-ink-faint">·</span>

              <Link
                to="/services"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                {c.getStarted}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              {c.services}
            </h3>

            <div className="space-y-2.5 text-sm text-ink-soft">
              {c.serviceLinks.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          {/* How SewaPath Works */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              {c.howItWorks}
            </h3>

            <div className="space-y-2.5 text-sm text-ink-soft">
              {c.howLinks.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              {c.contact}
            </h3>

            <div className="space-y-2.5 text-sm leading-6 text-ink-soft">
              <p>{c.location}</p>
              <p>{c.email}</p>
              <p>{c.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-ink/10 pt-6">
          <div className="flex flex-col gap-3 text-xs leading-5 text-ink-faint md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} SewaPath. {c.copyright}
            </p>

            <p>{c.developedBy}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}