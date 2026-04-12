import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import LessonData from "../Data/LessonData.json";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
const pdfFiles = import.meta.glob("../assets/PDF/*.pdf", {
  eager: true,
  as: "url",
});
const CourseDetails = () => {
  const { id } = useParams();
  const course = LessonData.find((lesson) => lesson.id === Number(id));

  if (!course) {
    return (
      <div className="py-10 text-center text-slate-500">Course not found.</div>
    );
  }
  const lessons = course.lessons || [];
  const baseUrl = import.meta.env.BASE_URL || "/";
  const publicPdfUrl = course.pdf
    ? `${baseUrl}PDF/${encodeURIComponent(course.pdf)}`
    : null;
  const pdfUrl = course.pdf
    ? pdfFiles[`../assets/PDF/${course.pdf}`] || publicPdfUrl
    : null;
  const [activeLessonId, setActiveLessonId] = useState(
    lessons.length ? lessons[0].id : null
  );
  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) || lessons[0];

  return (
    <>
      {/* header */}
       
      <section className="bg-white text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto w-[80%] py-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="transition bg-blue-800 p-2 text-white rounded-lg hover:text-slate-900 dark:hover:text-white">
                <Link to="/App"><i class="fa-solid fa-arrow-left"></i> Back to Courses</Link>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {course.name}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div className="space-y-8">
              <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                      {course.category}
                    </span>
                    <span>{course.lessonCount} lessons</span>
                    <span>-</span>
                    <span>{course.durationHours} hrs</span>
                  </div>
                  <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                    {course.name}
                  </h1>
                  <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                    {course.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {course.tags.map((tag) => (
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    What you will learn
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>Build practical projects to reinforce every topic.</li>
                    <li>Understand core concepts with guided exercises.</li>
                    <li>Ship a portfolio-ready final assignment.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Course format
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>Short lessons with checkpoints</li>
                    <li>Live coding labs and quizzes</li>
                    <li>Mentor feedback on key tasks</li>
                  </ul>
                </div>
              </div>

              {lessons.length > 0 && (
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="lg:w-1/3">
                      <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Lessons
                      </p>
                      <div className="mt-4 space-y-2">
                        {lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                              lesson.id === activeLesson?.id
                                ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200"
                                : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20"
                            }`}
                            type="button"
                            onClick={() => setActiveLessonId(lesson.id)}
                          >
                            {lesson.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Lesson content
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">
                        {activeLesson?.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                        {activeLesson?.content}
                      </p>
                      <div className="mt-4 rounded-xl border border-slate-200/70 bg-slate-50 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200">
                        <pre className="whitespace-pre-wrap break-words text-xs leading-5">
                          {activeLesson?.code}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pdfUrl && (
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Course PDF
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        View the full document or download it for offline
                        reading.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/30"
                      >
                        Open PDF
                      </a>
                      <a
                        href={pdfUrl}
                        download
                        className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-900">
                    <iframe
                      title={`${course.name} PDF`}
                      src={pdfUrl}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Course access
                </p>
                <p className="mt-3 text-3xl font-semibold">Free</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Includes labs, resources, and certificate of completion.
                </p>
                <Link to="/Enroll">
                <button className="mt-5 w-full rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700">
                  Enroll Now
                </button>
                </Link>
                <button className="mt-3 w-full rounded-lg border border-slate-900/15 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white">
                  Save to Favorites
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Includes
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>{course.lessonCount} on-demand lessons</li>
                  <li>Downloadable starter files</li>
                  <li>Completion certificate</li>
                  <li>Community support</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* footer */}
        
    </>
  );
};

export default CourseDetails;
