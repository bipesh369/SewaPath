
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardCheck,
  FileText,
  ListChecks,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { getServiceById } from "../../api/services.api.js";

import {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../api/eligibility.api.js";

import {
  listDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../../api/documents.api.js";

import {
  listSteps,
  createStep,
  updateStep,
  deleteStep,
} from "../../api/journey.api.js";

import Card from "../../components/ui/Card.jsx";
import { Input, Textarea } from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorNotice from "../../components/ui/ErrorNotice.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function EditableList({
  title,
  items,
  blankForm,
  renderFields,
  onCreate,
  onUpdate,
  onDelete,
  icon: Icon,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);

  const startCreate = () => {
    setForm({ ...blankForm });
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (item, formFromItem) => {
    setForm(formFromItem(item));
    setEditingId(item._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...blankForm });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await onUpdate(editingId, form);
    } else {
      await onCreate(form);
    }

    closeForm();
  };

  return (
    <section className="mb-10 last:mb-0">
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink-soft shadow-sm">
            <Icon size={19} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-ink-faint">
              {items.length}{" "}
              {items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {!showForm && (
          <Button
            size="sm"
            variant="accent"
            onClick={startCreate}
            className="rounded-xl px-4 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus size={15} strokeWidth={2} />
            <span className="ml-1">Add</span>
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-5 overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink/[0.018] px-6 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marigold">
                {editingId ? "Edit" : "New"}
              </p>

              <h3 className="mt-1 text-base font-semibold text-ink">
                {editingId ? "Update content" : "Add content"}
              </h3>
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
            <form
              onSubmit={submit}
              className="grid gap-5 sm:grid-cols-2"
            >
              {renderFields(form, setForm)}

              <div className="flex items-end gap-3 sm:col-span-2">
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  className="rounded-xl px-5 font-semibold"
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={closeForm}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Items */}
      {items.length === 0 ? (
        <Card className="rounded-[20px] border border-dashed border-ink/15 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-ink-soft">
            <Icon size={21} strokeWidth={1.7} />
          </div>

          <p className="text-sm font-medium text-ink">
            Nothing added yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <Card
              key={item._id}
              className="group rounded-[20px] border border-ink/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.035] text-xs font-semibold text-ink-soft">
                  {i + 1}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  {renderFields.summary ? renderFields.summary(item) : null}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      startEdit(item, renderFields.toForm)
                    }
                    className="h-8 rounded-lg px-2.5 text-ink-soft hover:bg-ink/5 hover:text-ink"
                    aria-label="Edit"
                  >
                    <Pencil size={14} strokeWidth={1.8} />

                    <span className="ml-1.5 hidden sm:inline">
                      Edit
                    </span>
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item._id)}
                    className="h-8 rounded-lg px-2.5"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} strokeWidth={1.8} />

                    <span className="ml-1.5 hidden sm:inline">
                      Delete
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AdminServiceDetail() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = () =>
    Promise.all([
      listQuestions(id),
      listDocuments(id),
      listSteps(id),
    ]).then(([q, d, s]) => {
      setQuestions(q.questions || []);
      setDocuments(d.documents || []);
      setSteps(s.steps || []);
    });

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getServiceById(id),
      listQuestions(id),
      listDocuments(id),
      listSteps(id),
    ])
      .then(([svc, q, d, s]) => {
        setService(svc.service);
        setQuestions(q.questions || []);
        setDocuments(d.documents || []);
        setSteps(s.steps || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const guard =
    (fn) =>
    async (...args) => {
      try {
        await fn(...args);
        await reload();
      } catch (err) {
        setError(err.message);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Spinner label="Loading…" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-10">
        <ErrorNotice message={error || "Service not found."} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Subtle background */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="mb-10">
        <Link
          to="/admin/services"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition-all duration-200 hover:border-ink/20 hover:bg-ink/[0.025] hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={1.9} />
          <span>Back to services</span>
        </Link>

        <div className="rounded-[24px] border border-ink/10 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
            Service content
          </p>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
            {service.title.en}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
            Manage eligibility questions, documents and journey steps for this
            service.
          </p>
        </div>
      </header>

      <ErrorNotice message={error} />

      {/* Eligibility */}
      <EditableList
        title="Eligibility questions"
        icon={ClipboardCheck}
        items={questions}
        blankForm={{
          promptEn: "",
          promptNe: "",
          reasonNoEn: "",
          reasonNoNe: "",
        }}
        onCreate={guard((form) =>
          createQuestion(id, {
            prompt: {
              en: form.promptEn,
              ne: form.promptNe,
            },
            reasonNo: {
              en: form.reasonNoEn,
              ne: form.reasonNoNe,
            },
          })
        )}
        onUpdate={guard((qid, form) =>
          updateQuestion(id, qid, {
            prompt: {
              en: form.promptEn,
              ne: form.promptNe,
            },
            reasonNo: {
              en: form.reasonNoEn,
              ne: form.reasonNoNe,
            },
          })
        )}
        onDelete={guard((qid) => deleteQuestion(id, qid))}
        renderFields={Object.assign(
          (form, setForm) => (
            <>
              <Textarea
                label="Question (English)"
                required
                rows={2}
                value={form.promptEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    promptEn: e.target.value,
                  }))
                }
              />

              <Textarea
                label="Question (Nepali)"
                required
                rows={2}
                value={form.promptNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    promptNe: e.target.value,
                  }))
                }
              />

              <Textarea
                label='If answered "no" (English)'
                rows={2}
                value={form.reasonNoEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    reasonNoEn: e.target.value,
                  }))
                }
              />

              <Textarea
                label='If answered "no" (Nepali)'
                rows={2}
                value={form.reasonNoNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    reasonNoNe: e.target.value,
                  }))
                }
              />
            </>
          ),
          {
            summary: (q) => (
              <div>
                <p className="text-sm font-medium leading-6 text-ink">
                  {q.prompt.en}
                </p>

                {q.prompt.ne && (
                  <p className="mt-1 text-xs leading-5 text-ink-faint">
                    {q.prompt.ne}
                  </p>
                )}
              </div>
            ),

            toForm: (q) => ({
              promptEn: q.prompt.en,
              promptNe: q.prompt.ne,
              reasonNoEn: q.reasonNo?.en || "",
              reasonNoNe: q.reasonNo?.ne || "",
            }),
          }
        )}
      />

      {/* Documents */}
      <EditableList
        title="Required documents"
        icon={FileText}
        items={documents}
        blankForm={{
          nameEn: "",
          nameNe: "",
          noteEn: "",
          noteNe: "",
          isMandatory: true,
        }}
        onCreate={guard((form) =>
          createDocument(id, {
            name: {
              en: form.nameEn,
              ne: form.nameNe,
            },
            note: {
              en: form.noteEn,
              ne: form.noteNe,
            },
            isMandatory: form.isMandatory,
          })
        )}
        onUpdate={guard((did, form) =>
          updateDocument(id, did, {
            name: {
              en: form.nameEn,
              ne: form.nameNe,
            },
            note: {
              en: form.noteEn,
              ne: form.noteNe,
            },
            isMandatory: form.isMandatory,
          })
        )}
        onDelete={guard((did) => deleteDocument(id, did))}
        renderFields={Object.assign(
          (form, setForm) => (
            <>
              <Input
                label="Document name (English)"
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
                label="Document name (Nepali)"
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
                label="Note (English)"
                value={form.noteEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    noteEn: e.target.value,
                  }))
                }
              />

              <Input
                label="Note (Nepali)"
                value={form.noteNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    noteNe: e.target.value,
                  }))
                }
              />

              <label className="flex items-center gap-3 rounded-xl border border-ink/10 bg-ink/[0.018] px-4 py-3 text-sm font-medium text-ink-soft sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.isMandatory}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isMandatory: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-ink/20"
                />

                Mandatory
              </label>
            </>
          ),
          {
            summary: (d) => (
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-ink">
                    {d.name.en}
                  </p>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                      d.isMandatory
                        ? "bg-marigold/10 text-marigold"
                        : "bg-ink/5 text-ink-faint"
                    }`}
                  >
                    {d.isMandatory ? "Required" : "Optional"}
                  </span>
                </div>

                {d.name.ne && (
                  <p className="mt-1 text-xs leading-5 text-ink-faint">
                    {d.name.ne}
                  </p>
                )}
              </div>
            ),

            toForm: (d) => ({
              nameEn: d.name.en,
              nameNe: d.name.ne,
              noteEn: d.note?.en || "",
              noteNe: d.note?.ne || "",
              isMandatory: d.isMandatory,
            }),
          }
        )}
      />

      {/* Journey */}
      <EditableList
        title="Journey steps"
        icon={ListChecks}
        items={steps}
        blankForm={{
          titleEn: "",
          titleNe: "",
          descriptionEn: "",
          descriptionNe: "",
        }}
        onCreate={guard((form) =>
          createStep(id, {
            title: {
              en: form.titleEn,
              ne: form.titleNe,
            },
            description: {
              en: form.descriptionEn,
              ne: form.descriptionNe,
            },
          })
        )}
        onUpdate={guard((sid, form) =>
          updateStep(id, sid, {
            title: {
              en: form.titleEn,
              ne: form.titleNe,
            },
            description: {
              en: form.descriptionEn,
              ne: form.descriptionNe,
            },
          })
        )}
        onDelete={guard((sid) => deleteStep(id, sid))}
        renderFields={Object.assign(
          (form, setForm) => (
            <>
              <Input
                label="Step title (English)"
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
                label="Step title (Nepali)"
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
                label="Description (English)"
                required
                rows={2}
                value={form.descriptionEn}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    descriptionEn: e.target.value,
                  }))
                }
              />

              <Textarea
                label="Description (Nepali)"
                required
                rows={2}
                value={form.descriptionNe}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    descriptionNe: e.target.value,
                  }))
                }
              />
            </>
          ),
          {
            summary: (s) => (
              <div>
                <p className="text-sm font-medium leading-6 text-ink">
                  {s.title.en}
                </p>

                {s.description?.en && (
                  <p className="mt-1 text-xs leading-5 text-ink-soft">
                    {s.description.en}
                  </p>
                )}
              </div>
            ),

            toForm: (s) => ({
              titleEn: s.title.en,
              titleNe: s.title.ne,
              descriptionEn: s.description.en,
              descriptionNe: s.description.ne,
            }),
          }
        )}
      />
    </div>
  );
}
