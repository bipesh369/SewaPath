
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from "../../api/services.api.js";
import { listCategories } from "../../api/categories.api.js";
import { listOffices } from "../../api/offices.api.js";
import Card from "../../components/ui/Card.jsx";
import {
  Input,
  Textarea,
  Select,
} from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorNotice from "../../components/ui/ErrorNotice.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  X,
} from "lucide-react";

const BLANK = {
  slug: "",
  titleEn: "",
  titleNe: "",
  summaryEn: "",
  summaryNe: "",
  category: "",
  office: "",
  keywords: "",
  feeEn: "",
  feeNe: "",
  timeEn: "",
  timeNe: "",
  officialLink: "",
  isActive: true,
};

export default function AdminServices() {
  const { t } = useLanguage();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...BLANK });
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");

    return Promise.all([
      listServices({ includeInactive: "true" }),
      listCategories(),
      listOffices(),
    ])
      .then(([s, c, o]) => {
        setServices(s.services || []);
        setCategories(c.categories || []);
        setOffices(o.offices || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setForm({
      ...BLANK,
      category: categories[0]?._id || "",
      office: offices[0]?._id || "",
    });

    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const startEdit = (svc) => {
    setForm({
      slug: svc.slug,
      titleEn: svc.title.en,
      titleNe: svc.title.ne,
      summaryEn: svc.summary.en,
      summaryNe: svc.summary.ne,
      category: svc.category?._id || "",
      office: svc.office?._id || "",
      keywords: (svc.keywords || []).join(", "),
      feeEn: svc.feeInfo?.en || "",
      feeNe: svc.feeInfo?.ne || "",
      timeEn: svc.timeInfo?.en || "",
      timeNe: svc.timeInfo?.ne || "",
      officialLink: svc.officialLink || "",
      isActive: svc.isActive,
    });

    setEditingId(svc._id);
    setShowForm(true);
    setError("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...BLANK });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      slug: form.slug,
      title: {
        en: form.titleEn,
        ne: form.titleNe,
      },
      summary: {
        en: form.summaryEn,
        ne: form.summaryNe,
      },
      category: form.category,
      office: form.office,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      feeInfo: {
        en: form.feeEn,
        ne: form.feeNe,
      },
      timeInfo: {
        en: form.timeEn,
        ne: form.timeNe,
      },
      officialLink: form.officialLink,
      isActive: form.isActive,
    };

    try {
      if (editingId) {
        await updateService(editingId, payload);
      } else {
        await createService(payload);
      }

      closeForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.admin.confirmDelete)) return;

    try {
      await deleteService(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Spinner label={t.common.loading} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="mb-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
              SewaPath Admin
            </p>

            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
              Services
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
              Manage government services, their requirements and official information.
            </p>
          </div>

          {!showForm && (
            <Button
              variant="accent"
              size="sm"
              onClick={startCreate}
              className="shrink-0 rounded-xl px-4 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Plus size={16} strokeWidth={2} />
              <span className="ml-1">{t.admin.addService}</span>
            </Button>
          )}
        </div>
      </header>

      <ErrorNotice message={error} />

      {/* Create / Edit form */}
      {showForm && (
        <Card className="mb-9 overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
          {/* Form header */}
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink/[0.018] px-6 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink-soft shadow-sm">
                {editingId ? (
                  <Pencil size={18} strokeWidth={1.8} />
                ) : (
                  <FileText size={18} strokeWidth={1.8} />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marigold">
                  {editingId ? "Edit service" : "New service"}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-ink">
                  {editingId
                    ? "Update service details"
                    : "Create a government service"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={closeForm}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-7 sm:px-7">
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 sm:grid-cols-2"
            >
              <Input
                label="Slug"
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    slug: e.target.value,
                  }))
                }
              />

              {/* Active status */}
              <label className="flex min-h-[42px] items-center gap-3 rounded-xl border border-ink/10 bg-ink/[0.018] px-4 py-2.5 transition-colors hover:bg-ink/[0.03]">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isActive: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-ink/20 accent-marigold"
                />

                <span>
                  <span className="block text-sm font-medium text-ink">
                    Active / published
                  </span>
                  <span className="block text-xs text-ink-faint">
                    Visible to service users
                  </span>
                </span>
              </label>

              <Input
                label="Title (English)"
                required
                value={form.titleEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    titleEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Title (Nepali)"
                required
                value={form.titleNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    titleNe: e.target.value,
                  }))
                }
              />

              <Textarea
                label="Summary (English)"
                required
                rows={2}
                value={form.summaryEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    summaryEn: e.target.value,
                  }))
                }
              />

              <Textarea
                label="Summary (Nepali)"
                required
                rows={2}
                value={form.summaryNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    summaryNe: e.target.value,
                  }))
                }
              />

              <Select
                label="Category"
                required
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value,
                  }))
                }
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name.en}
                  </option>
                ))}
              </Select>

              <Select
                label="Responsible office"
                required
                value={form.office}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    office: e.target.value,
                  }))
                }
              >
                {offices.map((o) => (
                  <option key={o._id} value={o._id}>
                    {o.name.en}
                  </option>
                ))}
              </Select>

              <Input
                label="Keywords (comma-separated)"
                value={form.keywords}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    keywords: e.target.value,
                  }))
                }
                className="sm:col-span-2"
              />

              <Input
                label="Fee info (English)"
                value={form.feeEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    feeEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Fee info (Nepali)"
                value={form.feeNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    feeNe: e.target.value,
                  }))
                }
              />

              <Input
                label="Time info (English)"
                value={form.timeEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    timeEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Time info (Nepali)"
                value={form.timeNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    timeNe: e.target.value,
                  }))
                }
              />

              <Input
                label="Official link"
                value={form.officialLink}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    officialLink: e.target.value,
                  }))
                }
                className="sm:col-span-2"
              />

              {/* Form actions */}
              <div className="flex items-center gap-3 border-t border-ink/10 pt-5 sm:col-span-2">
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  className="rounded-xl px-5 font-semibold shadow-sm"
                >
                  {t.admin.save}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={closeForm}
                  className="rounded-xl"
                >
                  {t.admin.cancel}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Service list header */}
      <div className="mb-5 flex items-end justify-between border-b border-ink/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            All services
          </h2>

          <p className="mt-1 text-xs text-ink-faint">
            {services.length}{" "}
            {services.length === 1 ? "service" : "services"}
          </p>
        </div>
      </div>

      {/* Services */}
      {services.length === 0 ? (
        <Card className="rounded-[22px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-ink-soft">
            <FileText size={21} strokeWidth={1.7} />
          </div>

          <p className="text-sm font-medium text-ink">
            No services added yet.
          </p>

          <p className="mt-1 text-xs text-ink-faint">
            Create your first government service to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <Card
              key={svc._id}
              className="group overflow-hidden rounded-[20px] border border-ink/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]"
            >
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Service information */}
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035] text-ink-soft">
                    <FileText size={18} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">
                        {svc.title.en}
                      </p>

                      {svc.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-900/10 bg-emerald-900/[0.045] px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                          <CheckCircle2 size={11} strokeWidth={2} />
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full border border-rust/10 bg-rust/[0.05] px-2 py-0.5 text-[11px] font-semibold text-rust">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-faint">
                      <span>
                        {svc.category?.name?.en || "No category"}
                      </span>

                      <span aria-hidden="true">·</span>

                      <span>{svc.slug}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <Link
                    to={`/admin/services/${svc._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-ink/[0.025] px-3.5 py-2 text-sm font-semibold text-ink-soft transition-all duration-200 hover:border-ink/20 hover:bg-white hover:text-ink"
                  >
                    <Settings2 size={15} strokeWidth={1.8} />
                    <span>Manage content</span>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(svc)}
                    className="rounded-xl"
                  >
                    <Pencil size={15} strokeWidth={1.8} />
                    <span className="ml-1.5">
                      {t.admin.edit}
                    </span>
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(svc._id)}
                    className="rounded-xl"
                  >
                    <Trash2 size={15} strokeWidth={1.8} />
                    <span className="ml-1.5">
                      {t.admin.delete}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Small metadata strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 bg-ink/[0.012] px-5 py-3 text-xs text-ink-faint">
                <span>
                  Office:{" "}
                  <span className="font-medium text-ink-soft">
                    {svc.office?.name?.en || "Not assigned"}
                  </span>
                </span>

                {svc.officialLink && (
                  <a
                    href={svc.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    Official link
                    <ExternalLink size={12} strokeWidth={1.8} />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
