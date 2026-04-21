import React, { useMemo, useState } from "react";
import { z } from "zod";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { getAllLessons, getNextLessonId, saveLesson } from "../Data/lessonStore";
import { getCurrentUser } from "../utils/auth";

const emptyLesson = {
  title: "",
  content: "",
  code: "",
};

const createEmptyForm = () => ({
  name: "",
  category: "",
  level: "Beginner",
  durationHours: "",
  summary: "",
  tags: "",
  imageUrl: "",
  pdfUrl: "",
  lessons: [{ ...emptyLesson }],
});

const urlField = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) =>
      !value ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:"),
    { message: "Use a valid URL (http/https) or upload a file." }
  );

const lessonSchema = z
  .object({
    title: z.string().trim(),
    content: z.string().trim(),
    code: z.string().trim(),
  })
  .refine((lesson) => lesson.title || lesson.content || lesson.code, {
    message: "Add a title, content, or code snippet.",
    path: ["title"],
  });

const formSchema = z.object({
  name: z.string().trim().min(2, "Course name is required."),
  category: z.string().trim().min(2, "Category is required."),
  level: z.string().trim().min(1, "Level is required."),
  durationHours: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(0, "Duration must be 0 or more.").optional()
  ),
  summary: z
    .string()
    .trim()
    .min(10, "Summary should be at least 10 characters."),
  tags: z.string().optional(),
  imageUrl: urlField,
  pdfUrl: urlField,
  lessons: z.array(lessonSchema).min(1, "Add at least one lesson."),
});

const mapZodErrors = (issues) => {
  const output = {};

  const setPath = (target, path, message) => {
    let current = target;
    for (let i = 0; i < path.length; i += 1) {
      const key = path[i];
      const isLast = i === path.length - 1;
      if (isLast) {
        if (current[key]) return;
        current[key] = message;
        return;
      }
      if (current[key] == null) {
        current[key] = typeof path[i + 1] === "number" ? [] : {};
      }
      current = current[key];
    }
  };

  issues.forEach((issue) => {
    if (!issue.path.length) {
      output.form = issue.message;
      return;
    }
    setPath(output, issue.path, issue.message);
  });

  return output;
};
const PostLesson = () => {
  const [form, setForm] = useState(createEmptyForm);
  const [imageName, setImageName] = useState("");
  const [imageData, setImageData] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [pdfData, setPdfData] = useState("");
  const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const lessonCount = useMemo(() => form.lessons.length, [form.lessons.length]);

  const updateForm = (name, value) => {
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
  if (Object.keys(errors).length > 0) {
    setErrors({});
  }
};

  const handleLessonChange = (index, field, value) => {
  setForm((prev) => {
    const nextLessons = prev.lessons.map((lesson, lessonIndex) =>
      lessonIndex === index ? { ...lesson, [field]: value } : lesson
    );
    return { ...prev, lessons: nextLessons };
  });
  if (Object.keys(errors).length > 0) {
    setErrors({});
  }
};

  const addLesson = () => {
    setForm((prev) => ({
      ...prev,
      lessons: [...prev.lessons, { ...emptyLesson }],
    }));
  };

  const removeLesson = (index) => {
    setForm((prev) => {
      if (prev.lessons.length === 1) return prev;
      return {
        ...prev,
        lessons: prev.lessons.filter((_, lessonIndex) => lessonIndex !== index),
      };
    });
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      if (type === "image") {
        setImageData(result);
      }
      if (type === "pdf") {
        setPdfData(result);
      }
      if (type === "image") {
        setImageName(file.name);
      }
      if (type === "pdf") {
        setPdfName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const normalizeLessons = (lessons) => {
    return lessons
      .map((lesson, index) => ({
        id: index + 1,
        title: lesson.title.trim(),
        content: lesson.content.trim(),
        code: lesson.code.trim(),
      }))
      .filter((lesson) => lesson.title || lesson.content || lesson.code);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);
    setErrors({});

    const user = getCurrentUser();
    if (!user) {
      const message = "You can't upload lessons right now. Please login first.";
      setErrors({ form: message });
      window.alert(message);
      return;
    }

    const validation = formSchema.safeParse(form);
    if (!validation.success) {
      setErrors(mapZodErrors(validation.error.issues));
      return;
    }

    const normalizedLessons = normalizeLessons(form.lessons);
    const allLessons = getAllLessons();
    const payload = {
      id: getNextLessonId(allLessons),
      name: form.name.trim(),
      category: form.category.trim(),
      level: form.level.trim() || "Beginner",
      durationHours: Number(form.durationHours) || 0,
      lessonCount: normalizedLessons.length,
      summary: form.summary.trim(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      image: imageData || form.imageUrl.trim(),
      pdf: pdfData || form.pdfUrl.trim(),
      lessons: normalizedLessons,
      authorId: user?.id || null,
      authorName: user?.name || "Anonymous",
    };

    saveLesson(payload);
    setSubmitted(true);
    setPreview(payload);
    window.alert("Lesson uploaded successfully.");
  };

  const handleReset = () => {
    setForm(createEmptyForm());
    setImageName("");
    setImageData("");
    setPdfName("");
    setPdfData("");
    setSubmitted(false);
    setPreview(null);
    setErrors({});
  };

  return (
    <>
      <Header />
      <section className="relative overflow-hidden bg-slate-50 py-14 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.12),_transparent_60%)]"></div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700/80 dark:text-cyan-300/80">
                  Sharing
                </p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Share a new lesson pack
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                  Fill in the details below. Your lesson will be stored locally
                  and added to the course list.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                Lessons in this pack: {lessonCount}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                    <i className="fa-solid fa-pen-nib"></i>
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">Course details</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Core information learners will see first.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Course name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      placeholder="e.g. UX Design Basics"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-rose-500">{errors.name}</p>
                    )}
                  
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Category
                    </label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(event) =>
                        updateForm("category", event.target.value)
                      }
                      placeholder="Frontend, Backend, etc."
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                      required
                    />
                    {errors.category && (
                      <p className="mt-2 text-xs text-rose-500">{errors.category}</p>
                    )}
                  
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Level
                    </label>
                    <select
                      value={form.level}
                      onChange={(event) =>
                        updateForm("level", event.target.value)
                      }
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.durationHours}
                      onChange={(event) =>
                        updateForm("durationHours", event.target.value)
                      }
                      placeholder="8"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                    />
                    {errors.durationHours && (
                      <p className="mt-2 text-xs text-rose-500">{errors.durationHours}</p>
                    )}
                  
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Summary
                    </label>
                    <textarea
                      rows="3"
                      value={form.summary}
                      onChange={(event) =>
                        updateForm("summary", event.target.value)
                      }
                      placeholder="Short overview of what learners will gain."
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                      required
                    />
                    {errors.summary && (
                      <p className="mt-2 text-xs text-rose-500">{errors.summary}</p>
                    )}
                  
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(event) => updateForm("tags", event.target.value)}
                      placeholder="HTML, UI, Forms"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">
                    <i className="fa-solid fa-photo-film"></i>
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">Media upload</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add a cover image and optional PDF handout.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={form.imageUrl}
                      onChange={(event) =>
                        updateForm("imageUrl", event.target.value)
                      }
                      placeholder="https://..."
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                    />
                    {errors.imageUrl && (
                      <p className="mt-2 text-xs text-rose-500">{errors.imageUrl}</p>
                    )}
                    
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Or upload an image file below.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFileUpload(event, "image")}
                      className="block w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    />
                    {imageName && (
                      <p className="mt-2 text-xs text-slate-500">
                        Uploaded: {imageName}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      PDF URL
                    </label>
                    <input
                      type="text"
                      value={form.pdfUrl}
                      onChange={(event) =>
                        updateForm("pdfUrl", event.target.value)
                      }
                      placeholder="https://..."
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                    />
                    {errors.pdfUrl && (
                      <p className="mt-2 text-xs text-rose-500">{errors.pdfUrl}</p>
                    )}
                    
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Or upload a PDF file below.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(event) => handleFileUpload(event, "pdf")}
                      className="block w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    />
                    {pdfName && (
                      <p className="mt-2 text-xs text-slate-500">
                        Uploaded: {pdfName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                      <i className="fa-solid fa-layer-group"></i>
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold">Lessons</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Add multiple lessons with content and code.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addLesson}
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/20 dark:text-white/80 dark:hover:text-white"
                  >
                    Add Lesson
                  </button>
                </div>
                {typeof errors.lessons === "string" && (
                  <p className="mt-3 text-xs text-rose-500">{errors.lessons}</p>
                )}
                <div className="mt-4 space-y-5">
                  {form.lessons.map((lesson, index) => (
                    <div
                      key={`lesson-${index}`}
                      className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                          Lesson {index + 1}
                        </p>
                        {form.lessons.length > 1 && (
                          <button
                            type="button"
                            className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                            onClick={() => removeLesson(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="mt-3 grid gap-3">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(event) =>
                            handleLessonChange(
                              index,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="Lesson title"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                        />
                        {errors.lessons?.[index]?.title && (
                          <p className="mt-2 text-xs text-rose-500">{errors.lessons[index].title}</p>
                        )}
                        
                        <textarea
                          rows="3"
                          value={lesson.content}
                          onChange={(event) =>
                            handleLessonChange(
                              index,
                              "content",
                              event.target.value
                            )
                          }
                          placeholder="Lesson content"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                        />
                        <textarea
                          rows="3"
                          value={lesson.code}
                          onChange={(event) =>
                            handleLessonChange(
                              index,
                              "code",
                              event.target.value
                            )
                          }
                          placeholder="Code snippet"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 text-sm text-slate-600 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Submit
                </p>
                <p className="mt-2">
                  When you publish, the lesson will be saved to your browser and
                  appear in the course list.
                </p>
                {errors.form && (
                  <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                    {errors.form}
                  </div>
                )}
                {submitted && (
                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    Lesson saved! Check the course list to see it.
                  </div>
                )}
                {Object.keys(errors).length > 0 && (
                  <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                    Please fix the highlighted fields before submitting.
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Publish Lesson
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/20 dark:text-white/80 dark:hover:text-white"
                  >
                    Reset Form
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Preview
                </p>
                {preview ? (
                  <div className="mt-4 space-y-4">
                    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-900">
                      {preview.image && (
                        <img
                          src={preview.image}
                          alt={preview.name}
                          className="h-40 w-full object-contain"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {preview.name}
                        </h3>
                        <p className="mt-2 text-xs text-slate-500">
                          {preview.category} • {preview.level}
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          {preview.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          {preview.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-slate-200 px-2 py-1 dark:border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                      <pre className="whitespace-pre-wrap break-words">
                        {JSON.stringify(preview, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Publish a lesson to preview it here.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PostLesson;


































