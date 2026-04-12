import React, { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { getAllLessons } from "../Data/lessonStore";

const LANGUAGE_PRIORITY = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "SQL",
  "PHP",
  "Kotlin",
  "Dart",
  "Swift",
];

const resolvePrimaryLanguage = (course) => {
  const found = LANGUAGE_PRIORITY.find((lang) => course.tags.includes(lang));
  return found || course.tags[0] || "JavaScript";
};

const resolveMonacoLanguage = (language) => {
  const map = {
    HTML: "html",
    CSS: "css",
    JavaScript: "javascript",
    TypeScript: "typescript",
    React: "javascript",
    "Node.js": "javascript",
    Python: "python",
    Java: "java",
    "C#": "csharp",
    SQL: "sql",
    PHP: "php",
    Kotlin: "kotlin",
    Dart: "dart",
    Swift: "swift",
  };
  return map[language] || "javascript";
};

const EnrollForCode = () => {
  const [courses, setCourses] = useState(() => getAllLessons());
  const [courseId, setCourseId] = useState(
    () => getAllLessons()[0]?.id || 1
  );
  useEffect(() => {
    const next = getAllLessons();
    setCourses(next);
    if (!next.find((course) => course.id === Number(courseId))) {
      setCourseId(next[0]?.id || 1);
    }
  }, []);
  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === Number(courseId)),
    [courseId, courses]
  );
  const [lessonIndex, setLessonIndex] = useState(0);
  const [code, setCode] = useState("");
  const [tests, setTests] = useState(
    `test("example", () => {\n  expect(1 + 1).toBe(2);\n});`
  );
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [previewDoc, setPreviewDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "vs-dark"
      : "light";
  });

  const primaryLanguage = useMemo(() => {
    if (!selectedCourse) return "JavaScript";
    return resolvePrimaryLanguage(selectedCourse);
  }, [selectedCourse]);
  const monacoLanguage = useMemo(
    () => resolveMonacoLanguage(primaryLanguage),
    [primaryLanguage]
  );

  const isHtml = primaryLanguage === "HTML";
  const isCss = primaryLanguage === "CSS";
  const isJs = primaryLanguage === "JavaScript";
  const canPreview = isHtml || isCss || isJs;
  const canRunTests = isJs;

  useEffect(() => {
    if (!selectedCourse) return;
    const lesson = selectedCourse.lessons?.[lessonIndex];
    setCode(lesson?.code || "");
    setConsoleOutput([]);
    setTestResults([]);
    setPreviewDoc("");
  }, [selectedCourse, lessonIndex]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const updateTheme = () => {
      setEditorTheme(
        document.documentElement.classList.contains("dark") ? "vs-dark" : "light"
      );
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const runPreview = () => {
    const isDark = editorTheme === "vs-dark";
    const baseStyle = `<style>body{margin:0;padding:16px;font-family:Arial, sans-serif;background:${
      isDark ? "#0f172a" : "#ffffff"
    };color:${isDark ? "#ffffff" : "#0f172a"};}</style>`;

    if (isHtml) {
      const hasHtmlTag = /<html[\s>]/i.test(code) || /<!doctype/i.test(code);
      if (hasHtmlTag) {
        if (/<head[\s>]/i.test(code)) {
          setPreviewDoc(code.replace(/<head[\s>]/i, (match) => `${match}${baseStyle}`));
        } else {
          setPreviewDoc(`${baseStyle}${code}`);
        }
      } else {
        setPreviewDoc(
          `<!doctype html><html><head>${baseStyle}</head><body>${code}</body></html>`
        );
      }
      return;
    }
    if (isCss) {
      setPreviewDoc(
        `<!doctype html><html><head>${baseStyle}<style>${code}</style></head><body><div class="preview-box">Preview Box</div></body></html>`
      );
      return;
    }
    if (isJs) {
      const doc = `<!doctype html><html><head>${baseStyle}</head><body><script>${code}<\/script></body></html>`;
      setPreviewDoc(doc);
      return;
    }
  };

  const runTests = () => {
    const logs = [];
    const results = [];

    const sandboxConsole = {
      log: (...args) => logs.push(args.join(" ")),
      error: (...args) => logs.push(args.join(" ")),
    };

    const expect = (received) => ({
      toBe: (expected) => {
        if (received !== expected) {
          throw new Error(`Expected ${received} to be ${expected}`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(received) !== JSON.stringify(expected)) {
          throw new Error(
            `Expected ${JSON.stringify(received)} to equal ${JSON.stringify(
              expected
            )}`
          );
        }
      },
      toContain: (expected) => {
        if (!received?.includes?.(expected)) {
          throw new Error(`Expected ${received} to contain ${expected}`);
        }
      },
    });

    const test = (name, fn) => {
      try {
        fn();
        results.push({ name, status: "pass" });
      } catch (error) {
        results.push({ name, status: "fail", error: error.message });
      }
    };

    try {
      const runner = new Function(
        "console",
        "test",
        "expect",
        `${code}\n\n${tests}`
      );
      runner(sandboxConsole, test, expect);
    } catch (error) {
      logs.push(`Runtime error: ${error.message}`);
    }

    setConsoleOutput(logs);
    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <Header />

      <section className="bg-white py-12 dark:bg-slate-950">
        <div className="mx-auto w-[80%]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
                Enroll & Practice
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                Write code and run tests in the browser
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Language options are generated from the lesson library. JavaScript
                supports running tests in-browser. Other languages are shown for
                practice and preview.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                value={courseId}
                onChange={(event) => {
                  setCourseId(event.target.value);
                  setLessonIndex(0);
                }}
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name.trim()}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                value={lessonIndex}
                onChange={(event) => setLessonIndex(Number(event.target.value))}
              >
                {selectedCourse?.lessons?.map((lesson, index) => (
                  <option key={lesson.id || index} value={index}>
                    {lesson.title || `Lesson ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
            {selectedCourse?.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Editor
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {primaryLanguage} Practice
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {canPreview && (
                    <button
                      className="rounded-lg bg-blue-800 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-700"
                      type="button"
                      onClick={runPreview}
                    >
                      Run Code
                    </button>
                  )}
                  {canRunTests && (
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/20 dark:text-white/80 dark:hover:text-white"
                      type="button"
                      onClick={runTests}
                    >
                      Run Tests
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50 shadow-inner dark:border-white/10 dark:bg-slate-950">
                <Editor
                  height="260px"
                  language={monacoLanguage}
                  theme={editorTheme}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>

              {canRunTests && (
                <>
                  <p className="mt-6 text-xs font-semibold uppercase text-slate-500">
                    Tests (JavaScript only)
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50 shadow-inner dark:border-white/10 dark:bg-slate-950">
                    <Editor
                      height="180px"
                      language="javascript"
                      theme={editorTheme}
                      value={tests}
                      onChange={(value) => setTests(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        wordWrap: "on",
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-200">
                  Output
                </p>
                {!canPreview && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Preview is not available for {primaryLanguage}. Use the
                    editor to practice code and follow lesson content.
                  </p>
                )}
                {canPreview && (
                  <iframe
                    title="preview"
                    className="mt-4 h-64 w-full rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    sandbox="allow-scripts"
                    srcDoc={previewDoc}
                  />
                )}
              </div>

              <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-200">
                  Console
                </p>
                <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-white">
                  {consoleOutput.length === 0 && (
                    <p>No console output yet.</p>
                  )}
                  {consoleOutput.map((line, index) => (
                    <p key={`${line}-${index}`}>{line}</p>
                  ))}
                </div>
                {canRunTests && (
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Test Results
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      {testResults.length === 0 && (
                        <p className="text-slate-600 dark:text-slate-300">
                          Run tests to see results.
                        </p>
                      )}
                      {testResults.map((result) => (
                        <div
                          key={result.name}
                          className={`rounded-lg border px-3 py-2 ${
                            result.status === "pass"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
                              : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
                          }`}
                        >
                          <p className="font-semibold">
                            {result.status === "pass" ? "PASS" : "FAIL"} •{" "}
                            {result.name}
                          </p>
                          {result.error && (
                            <p className="text-xs">{result.error}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnrollForCode;
