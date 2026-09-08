
import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import {
  listOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from "../../api/offices.api.js";
import Card from "../../components/ui/Card.jsx";
import { Input, Select } from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorNotice from "../../components/ui/ErrorNotice.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import {
  Building2,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

const LEVELS = ["ward", "municipal", "district", "provincial", "federal"];

const BLANK = {
  nameEn: "",
  nameNe: "",
  level: "ward",
  addressEn: "",
  addressNe: "",
  phone: "",
  email: "",
  latitude: "",
  longitude: "",
  officialLink: "",
};

export default function AdminOffices() {
  const { t } = useLanguage();

  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...BLANK });
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");

    return listOffices()
      .then((res) => setOffices(res.offices || []))
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

  const startEdit = (o) => {
    setForm({
      nameEn: o.name.en,
      nameNe: o.name.ne,
      level: o.level,
      addressEn: o.address.en,
      addressNe: o.address.ne,
      phone: o.phone,
      email: o.email,
      latitude: o.latitude,
      longitude: o.longitude,
      officialLink: o.officialLink,
    });

    setEditingId(o._id);
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
      name: {
        en: form.nameEn,
        ne: form.nameNe,
      },
      level: form.level,
      address: {
        en: form.addressEn,
        ne: form.addressNe,
      },
      phone: form.phone,
      email: form.email,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      officialLink: form.officialLink,
    };

    try {
      if (editingId) {
        await updateOffice(editingId, payload);
      } else {
        await createOffice(payload);
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
      await deleteOffice(id);
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
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
            SewaPath Admin
          </p>

          <h1 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-3xl">
            Offices
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
            Manage government offices and their location information.
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
            <span className="ml-1">{t.admin.addOffice}</span>
          </Button>
        )}
      </div>

      <ErrorNotice message={error} />

      {/* Office form */}
      {showForm && (
        <Card className="mb-8 overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink/[0.018] px-6 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marigold">
                {editingId ? "Edit office" : "New office"}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-ink">
                {editingId
                  ? "Update office details"
                  : "Add a government office"}
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

              <Select
                label="Level"
                value={form.level}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    level: e.target.value,
                  }))
                }
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>

              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    phone: e.target.value,
                  }))
                }
              />

              <Input
                label="Address (English)"
                required
                value={form.addressEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    addressEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Address (Nepali)"
                required
                value={form.addressNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    addressNe: e.target.value,
                  }))
                }
              />

              <Input
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
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
              />

              <Input
                label="Latitude"
                type="number"
                step="any"
                required
                value={form.latitude}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    latitude: e.target.value,
                  }))
                }
              />

              <Input
                label="Longitude"
                type="number"
                step="any"
                required
                value={form.longitude}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    longitude: e.target.value,
                  }))
                }
              />

              <div className="flex items-end gap-3 sm:col-span-2">
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

      {/* Office list heading */}
      <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">All offices</h2>

          <p className="mt-1 text-xs text-ink-faint">
            {offices.length}{" "}
            {offices.length === 1 ? "office" : "offices"}
          </p>
        </div>
      </div>

      {/* Empty state */}
      {offices.length === 0 ? (
        <Card className="rounded-[22px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/5 text-ink-soft">
            <Building2 size={24} strokeWidth={1.7} />
          </div>

          <h3 className="text-lg font-semibold text-ink">
            No offices yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
            Add a government office to make location information available to users.
          </p>

          <Button
            variant="accent"
            size="sm"
            onClick={startCreate}
            className="mt-6 rounded-xl px-5"
          >
            <Plus size={16} strokeWidth={2} />
            <span className="ml-1">{t.admin.addOffice}</span>
          </Button>
        </Card>
      ) : (
        /* Office cards */
        <div className="grid gap-4 sm:grid-cols-2">
          {offices.map((o) => (
            <Card
              key={o._id}
              className="group rounded-[20px] border border-ink/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035] text-ink-soft transition-colors group-hover:border-marigold/20 group-hover:bg-marigold/10 group-hover:text-marigold">
                  <Building2 size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-ink">
                        {o.name.en}
                      </p>

                      <p className="mt-0.5 text-sm text-ink-soft">
                        {o.name.ne}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-ink/10 bg-ink/[0.025] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                      {o.level}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start gap-2 border-t border-ink/10 pt-4">
                    <MapPin
                      size={15}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-ink-faint"
                    />

                    <p className="min-w-0 text-xs leading-5 text-ink-soft">
                      {o.address.en}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(o)}
                      className="h-8 rounded-lg px-2.5 text-ink-soft hover:bg-ink/5 hover:text-ink"
                      aria-label={`Edit ${o.name.en}`}
                    >
                      <Pencil size={14} strokeWidth={1.8} />
                      <span className="ml-1.5 hidden sm:inline">
                        {t.admin.edit}
                      </span>
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(o._id)}
                      className="h-8 rounded-lg px-2.5"
                      aria-label={`Delete ${o.name.en}`}
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                      <span className="ml-1.5 hidden sm:inline">
                        {t.admin.delete}
                      </span>
                    </Button>
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
