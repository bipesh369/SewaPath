
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { pick } from "../i18n/translations.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getServiceBySlug } from "../api/services.api.js";
import {
  listQuestions,
  checkEligibility,
} from "../api/eligibility.api.js";
import { listDocuments } from "../api/documents.api.js";
import { listSteps } from "../api/journey.api.js";
import {
  saveService,
  unsaveService,
  listSavedServices,
} from "../api/savedServices.api.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";
import StepPath from "../components/StepPath.jsx";
import OfficeMap from "../components/OfficeMap.jsx";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Heart,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const TABS = [
  "overview",
  "eligibility",
  "documents",
  "journey",
  "office",
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    setTab("overview");
    setAnswers({});
    setResult(null);

    getServiceBySlug(slug)
      .then(async ({ service: svc }) => {
        setService(svc);

        const [qRes, dRes, sRes] = await Promise.all([
          listQuestions(svc._id),
          listDocuments(svc._id),
          listSteps(svc._id),
        ]);

        setQuestions(qRes.questions);
        setDocuments(dRes.documents);
        setSteps(sRes.steps);

        if (user) {
          const { saved } = await listSavedServices();
          setIsSaved(
            saved.some((s) => s.service?._id === svc._id),
          );
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, user]);

  const allAnswered = useMemo(
    () =>
      questions.length > 0 &&
      questions.every((q) => answers[q._id]),
    [questions, answers],
  );

  const handleCheck = async () => {
    setChecking(true);

    try {
      const res = await checkEligibility(service._id, answers);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  };

  const toggleSave = async () => {
    setSaveBusy(true);

    try {
      if (isSaved) {
        await unsaveService(service._id);
        setIsSaved(false);
      } else {
        await saveService(service._id);
        setIsSaved(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaveBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Spinner label={t.common.loading} />
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <ErrorNotice message={error} />
      </div>
    );
  }

  if (!service) return null;

  const tabLabel = {
    overview: t.detail.overview,
    eligibility: t.detail.eligibility,
    documents: t.detail.documents,
    journey: t.detail.journey,
    office: t.detail.office,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafaf9]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-280px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_68%)] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-5 py-10 sm:py-14">
        {/* Back */}
        <Link
          to="/services"
          className="mb-7 inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition-all duration-200 hover:border-ink/20 hover:bg-ink/[0.025] hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={1.9} />
          {t.common.back}
        </Link>

        {/* Service Header */}
        <section className="overflow-hidden rounded-[26px] border border-ink/10 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                {service.category && (
                  <Badge
                    tone="marigold"
                    className="mb-4"
                  >
                    {pick(service.category.name, lang)}
                  </Badge>
                )}

                <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
                  {pick(service.title, lang)}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
                  {pick(service.summary, lang)}
                </p>
              </div>

              {user && (
                <Button
                  variant={isSaved ? "outline" : "accent"}
                  size="sm"
                  onClick={toggleSave}
                  disabled={saveBusy}
                  className="shrink-0 rounded-xl font-semibold"
                >
                  <Heart
                    size={15}
                    strokeWidth={1.9}
                    fill={isSaved ? "currentColor" : "none"}
                  />
                  <span className="ml-1.5">
                    {isSaved
                      ? t.detail.unsave
                      : t.detail.save}
                  </span>
                </Button>
              )}
            </div>
          </div>

          {/* Service quick information */}
          <div className="grid border-t border-ink/10 bg-ink/[0.018] sm:grid-cols-3">
            <div className="flex items-center gap-3 px-6 py-4 sm:px-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink-soft shadow-sm ring-1 ring-ink/10">
                <FileText size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                  Service
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink">
                  Government service
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-ink/10 px-6 py-4 sm:border-l sm:border-t-0 sm:px-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink-soft shadow-sm ring-1 ring-ink/10">
                <ShieldCheck size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                  Information
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink">
                  Verified details
                </p>
              </div>
            </div>

            {service.office && (
              <div className="flex items-center gap-3 border-t border-ink/10 px-6 py-4 sm:border-l sm:border-t-0 sm:px-7">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink-soft shadow-sm ring-1 ring-ink/10">
                  <MapPin size={16} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    Office
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-ink">
                    {pick(service.office.name, lang)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tabs */}
        <nav className="sticky top-3 z-20 mt-7 rounded-2xl border border-ink/10 bg-white/90 p-1.5 shadow-sm backdrop-blur">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tab === key
                    ? "bg-ink text-paper shadow-sm"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {tabLabel[key]}
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-8">
          {error && <ErrorNotice message={error} />}

          {/* Overview */}
          {tab === "overview" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {service.feeInfo?.[lang] && (
                  <Card className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ink/[0.035] text-ink-soft">
                      <FileText size={18} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                      {t.detail.fee}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-ink">
                      {pick(service.feeInfo, lang)}
                    </p>
                  </Card>
                )}

                {service.timeInfo?.[lang] && (
                  <Card className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ink/[0.035] text-ink-soft">
                      <Clock3 size={18} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                      {t.detail.time}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-ink">
                      {pick(service.timeInfo, lang)}
                    </p>
                  </Card>
                )}
              </div>

              {service.officialLink && (
                <Card className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.035] text-ink-soft">
                        <ExternalLink size={18} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                          {t.detail.officialLink}
                        </h3>

                        <p className="mt-2 break-all text-sm text-ink-soft">
                          {service.officialLink}
                        </p>
                      </div>
                    </div>

                    <a
                      href={service.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-ink/[0.025] px-4 py-2.5 text-sm font-semibold text-ink-soft transition-all duration-200 hover:border-ink/20 hover:bg-white hover:text-ink"
                    >
                      Open official site
                      <ExternalLink size={14} strokeWidth={1.8} />
                    </a>
                  </div>
                </Card>
              )}

              {service.lastVerifiedAt && (
                <div className="flex items-center gap-2 px-1 text-xs text-ink-faint">
                  <CheckCircle2 size={13} strokeWidth={1.8} />
                  <span>
                    {t.detail.lastVerified}:{" "}
                    {new Date(
                      service.lastVerifiedAt,
                    ).toLocaleDateString(
                      lang === "ne" ? "ne-NP" : "en-US",
                    )}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Eligibility */}
          {tab === "eligibility" && (
            <div>
              {questions.length === 0 ? (
                <Card className="rounded-[20px] border border-dashed border-ink/15 bg-white px-6 py-14 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-ink-soft">
                    <ShieldCheck size={21} strokeWidth={1.7} />
                  </div>

                  <p className="text-sm font-medium text-ink">
                    {t.services.noResults}
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <Card
                      key={q._id}
                      className="rounded-[20px] border border-ink/10 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.045] text-xs font-semibold text-ink-soft">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-medium leading-6 text-ink">
                            {pick(q.prompt, lang)}
                          </p>

                          <div className="mt-4 flex gap-2">
                            {["yes", "no"].map((val) => (
                              <button
                                key={val}
                                onClick={() => {
                                  setAnswers((a) => ({
                                    ...a,
                                    [q._id]: val,
                                  }));
                                  setResult(null);
                                }}
                                className={`rounded-xl border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                                  answers[q._id] === val
                                    ? "border-ink bg-ink text-paper shadow-sm"
                                    : "border-ink/10 bg-ink/[0.02] text-ink-soft hover:border-ink/20 hover:bg-white hover:text-ink"
                                }`}
                              >
                                {val === "yes"
                                  ? t.detail.answerYes
                                  : t.detail.answerNo}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="pt-1">
                    <Button
                      variant="accent"
                      disabled={!allAnswered || checking}
                      onClick={handleCheck}
                      className="rounded-xl px-5 font-semibold"
                    >
                      {checking
                        ? t.common.loading
                        : t.detail.checkEligibility}
                    </Button>
                  </div>

                  {result && (
                    <Card
                      className={`rounded-[20px] p-6 shadow-sm ${
                        result.eligible
                          ? "border border-moss/30 bg-moss-light"
                          : "border border-rust/25 bg-rust-light"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CheckCircle2
                            size={20}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {result.eligible
                              ? t.detail.eligibleResult
                              : t.detail.notEligibleResult}
                          </p>

                          {!result.eligible && result.reason && (
                            <p className="mt-2 text-sm leading-6">
                              {pick(result.reason, lang)}
                            </p>
                          )}

                          {!result.eligible &&
                            result.alternativeServices?.length > 0 && (
                              <div className="mt-5">
                                <p className="mb-2 text-sm font-semibold">
                                  {t.detail.alternatives}
                                </p>

                                <ul className="space-y-2">
                                  {result.alternativeServices.map(
                                    (alt) => (
                                      <li key={alt._id}>
                                        <Link
                                          to={`/services/${alt.slug}`}
                                          className="text-sm font-medium underline underline-offset-2"
                                        >
                                          {pick(
                                            alt.title,
                                            lang,
                                          )}
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Documents */}
          {tab === "documents" && (
            <div>
              {documents.length === 0 ? (
                <Card className="rounded-[20px] border border-dashed border-ink/15 bg-white px-6 py-14 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-ink-soft">
                    <FileText size={21} strokeWidth={1.7} />
                  </div>

                  <p className="text-sm font-medium text-ink">
                    {t.services.noResults}
                  </p>
                </Card>
              ) : (
                <ul className="space-y-3">
                  {documents.map((doc, index) => (
                    <li key={doc._id}>
                      <Card className="rounded-[20px] border border-ink/10 bg-white p-5 shadow-sm transition-all duration-200 hover:border-ink/15 hover:shadow-md sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.035] text-xs font-semibold text-ink-soft">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-ink">
                              {pick(doc.name, lang)}
                            </p>

                            {doc.note?.[lang] && (
                              <p className="mt-1.5 text-sm leading-6 text-ink-soft">
                                {pick(doc.note, lang)}
                              </p>
                            )}
                          </div>

                          <Badge
                            tone={
                              doc.isMandatory
                                ? "rust"
                                : "neutral"
                            }
                          >
                            {doc.isMandatory
                              ? t.detail.mandatory
                              : t.detail.optional}
                          </Badge>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Journey */}
          {tab === "journey" && (
            <Card className="rounded-[22px] border border-ink/10 bg-white p-5 shadow-sm sm:p-7">
              <StepPath
                steps={steps}
                renderStep={(step) => (
                  <div>
                    <h3 className="font-semibold text-ink">
                      {pick(step.title, lang)}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      {pick(step.description, lang)}
                    </p>
                  </div>
                )}
              />
            </Card>
          )}

          {/* Office */}
          {tab === "office" && service.office && (
            <div className="space-y-4">
              <Card className="rounded-[22px] border border-ink/10 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.035] text-ink-soft">
                    <MapPin size={19} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-ink">
                      {pick(service.office.name, lang)}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-ink-soft">
                      {pick(service.office.address, lang)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                      {service.office.phone && (
                        <span>{service.office.phone}</span>
                      )}

                      {service.office.email && (
                        <span>{service.office.email}</span>
                      )}
                    </div>

                    {service.office.officialLink && (
                      <a
                        href={service.office.officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft underline underline-offset-2 transition-colors hover:text-ink"
                      >
                        {t.detail.officialLink}
                        <ExternalLink
                          size={13}
                          strokeWidth={1.8}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-[22px] border border-ink/10 bg-white p-0 shadow-sm">
                <OfficeMap
                  office={service.office}
                  label={pick(
                    service.office.name,
                    lang,
                  )}
                />
              </Card>

              <a
                href={`https://www.openstreetmap.org/?mlat=${service.office.latitude}&mlon=${service.office.longitude}#map=16/${service.office.latitude}/${service.office.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:text-ink hover:shadow-md"
              >
                <MapPin size={15} strokeWidth={1.8} />
                {t.detail.getDirections}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
