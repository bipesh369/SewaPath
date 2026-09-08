
import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categories.api.js";
import Card from "../../components/ui/Card.jsx";
import { Input } from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorNotice from "../../components/ui/ErrorNotice.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import { Folder, Pencil, Plus, Trash2, X } from "lucide-react";

const BLANK = {
  slug: "",
  nameEn: "",
  nameNe: "",
  icon: "folder",
  order: 0,
};

export default function AdminCategories() {
  const { t } = useLanguage();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...BLANK });
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");

    return listCategories()
      .then((res) => setCategories(res.categories || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setForm({ ...BLANK });
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const startEdit = (cat) => {
    setForm({
      slug: cat.slug,
      nameEn: cat.name.en,
      nameNe: cat.name.ne,
      icon: cat.icon,
      order: cat.order,
    });

    setEditingId(cat._id);
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
      name: {
        en: form.nameEn,
        ne: form.nameNe,
      },
      icon: form.icon,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await createCategory(payload);
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
      await deleteCategory(id);
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
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_70%)] blur-3xl" />

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
            SewaPath Admin
          </p>

          <h1 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-3xl">
            Categories
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
            Manage the categories used to organize government services.
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
            <span className="ml-1">{t.admin.addCategory}</span>
          </Button>
        )}
      </div>

      <ErrorNotice message={error} />

      {showForm && (
        <Card className="mb-8 overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink/[0.018] px-6 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marigold">
                {editingId ? "Edit category" : "New category"}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-ink">
                {editingId ? "Update category details" : "Create a category"}
              </h2>
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

          <div className="px-6 py-7 sm:px-7">
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
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

              <Input
                label="Icon keyword"
                value={form.icon}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    icon: e.target.value,
                  }))
                }
              />

              <Input
                label="Name (English)"
                required
                value={form.nameEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    nameEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Name (Nepali)"
                required
                value={form.nameNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    nameNe: e.target.value,
                  }))
                }
              />

              <Input
                label="Order"
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    order: e.target.value,
                  }))
                }
              />

              <div className="flex items-end gap-3">
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  className="rounded-xl px-5 font-semibold"
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

      <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            All categories
          </h2>

          <p className="mt-1 text-xs text-ink-faint">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>
      </div>

      {categories.length === 0 ? (
        <Card className="rounded-[22px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/5 text-ink-soft">
            <Folder size={24} strokeWidth={1.7} />
          </div>

          <h3 className="text-lg font-semibold text-ink">
            No categories yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
            Create a category to start organizing government services.
          </p>

          <Button
            variant="accent"
            size="sm"
            onClick={startCreate}
            className="mt-6 rounded-xl px-5"
          >
            <Plus size={16} strokeWidth={2} />
            <span className="ml-1">{t.admin.addCategory}</span>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => (
            <Card
              key={cat._id}
              className="group rounded-[20px] border border-ink/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035] text-ink-soft transition-colors group-hover:border-marigold/20 group-hover:bg-marigold/10 group-hover:text-marigold">
                  <Folder size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-ink">
                        {cat.name.en}
                      </p>

                      <p className="mt-0.5 text-sm text-ink-soft">
                        {cat.name.ne}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-ink/10 bg-ink/[0.025] px-2.5 py-1 text-[11px] font-medium text-ink-faint">
                      #{cat.order}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="truncate rounded-md bg-ink/[0.035] px-2 py-1 font-mono text-[11px] text-ink-faint">
                      {cat.slug}
                    </span>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(cat)}
                        className="h-8 rounded-lg px-2.5 text-ink-soft hover:bg-ink/5 hover:text-ink"
                        aria-label={`Edit ${cat.name.en}`}
                      >
                        <Pencil size={14} strokeWidth={1.8} />
                        <span className="ml-1.5 hidden sm:inline">
                          {t.admin.edit}
                        </span>
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(cat._id)}
                        className="h-8 rounded-lg px-2.5"
                        aria-label={`Delete ${cat.name.en}`}
                      >
                        <Trash2 size={14} strokeWidth={1.8} />
                        <span className="ml-1.5 hidden sm:inline">
                          {t.admin.delete}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

