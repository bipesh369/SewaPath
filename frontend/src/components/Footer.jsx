import { useLanguage } from "../i18n/LanguageContext.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-ink/10 bg-white">
      {/* Subtle background detail */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
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

            {lang === "ne" ? (
              <p className="text-sm leading-6 text-ink-soft">
                सेवापथले नेपालका सरकारी सेवाहरू खोज्न र बुझ्न नागरिकलाई सहयोग
                गर्छ। आफ्नो आवश्यकता खोज्नुहोस् वा वर्णन गर्नुहोस्, र हामी
                तपाईंलाई आवश्यक योग्यता, कागजात र कार्यालय देखाउनेछौँ।
              </p>
            ) : (
              <p className="text-sm leading-6 text-ink-soft">
                Your guide to government services in Nepal. Search for a
                government service or describe what you need. SewaPath helps you
                understand the eligibility, required documents, process, and
                office location.
              </p>
            )}

            <p className="mt-5 text-sm font-medium text-ink-soft">
              Find a Service <span className="mx-1 text-ink-faint">·</span>{" "}
              Get Started
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              SERVICES
            </h3>

            <div className="space-y-2.5 text-sm text-ink-soft">
              <p>Citizenship &amp; national ID</p>
              <p>Passport Services</p>
              <p>Driving licence</p>
              <p>Land &amp; property</p>
              <p>Business registration</p>
              <p>Social security</p>
            </div>
          </div>

          {/* How SewaPath Works */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              HOW SEWAPATH WORKS
            </h3>

            <div className="space-y-2.5 text-sm text-ink-soft">
              <p>Find a service</p>
              <p>Understand the requirements</p>
              <p>Know where to go</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              CONTACT
            </h3>

            <div className="space-y-2.5 text-sm leading-6 text-ink-soft">
              <p>Nepalgunj, Banke, Lumbini Province</p>
              <p>hello@sewapath.example.np</p>
              <p>Sun–Fri, 10 AM – 5 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-ink/10 pt-6">
          <div className="flex flex-col gap-3 text-xs leading-5 text-ink-faint md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} SewaPath. Simplifying access to
              government services.
            </p>

            <p>
              Developed by Bipesh Junior Tharu · B.Sc. CSIT, Sixth Semester
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}