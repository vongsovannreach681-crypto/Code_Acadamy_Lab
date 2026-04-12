import React, { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { getCurrentUser } from "../utils/auth";

const questionSets = {
  Frontend: [
    {
      id: 1,
      question: "Which HTML element is used for the largest heading?",
      options: ["<h6>", "<h1>", "<header>"],
      answer: 1,
    },
    {
      id: 2,
      question: "Which CSS property is used to change text color?",
      options: ["font-style", "text-color", "color"],
      answer: 2,
    },
    {
      id: 3,
      question: "Which keyword declares a block-scoped variable in JavaScript?",
      options: ["var", "let", "function"],
      answer: 1,
    },
    {
      id: 4,
      question: "Which React hook is used to manage state?",
      options: ["useMemo", "useState", "useEffect"],
      answer: 1,
    },
    {
      id: 5,
      question: "Which array method creates a new array?",
      options: ["map", "push", "sort"],
      answer: 0,
    },
  ],
  Backend: [
    {
      id: 1,
      question: "Which HTTP method is typically used to create new data?",
      options: ["GET", "POST", "DELETE"],
      answer: 1,
    },
    {
      id: 2,
      question: "Which status code means a request succeeded?",
      options: ["200", "404", "500"],
      answer: 0,
    },
    {
      id: 3,
      question: "Which database type is MongoDB?",
      options: ["Relational", "NoSQL", "In-memory"],
      answer: 1,
    },
    {
      id: 4,
      question: "Which Node.js framework is commonly used for APIs?",
      options: ["Express", "Laravel", "Django"],
      answer: 0,
    },
    {
      id: 5,
      question: "Which header usually carries a JWT token?",
      options: ["Authorization", "Content-Type", "Accept"],
      answer: 0,
    },
  ],
  Mobile: [
    {
      id: 1,
      question: "Which language is commonly used for Android apps?",
      options: ["Kotlin", "Swift", "Ruby"],
      answer: 0,
    },
    {
      id: 2,
      question: "Which language is commonly used for iOS apps?",
      options: ["Swift", "Go", "PHP"],
      answer: 0,
    },
    {
      id: 3,
      question: "Flutter uses which language?",
      options: ["Dart", "Java", "C++"],
      answer: 0,
    },
    {
      id: 4,
      question: "React Native is based on which library?",
      options: ["React", "Vue", "Svelte"],
      answer: 0,
    },
    {
      id: 5,
      question: "Which tool manages Android builds?",
      options: ["Gradle", "Webpack", "Vite"],
      answer: 0,
    },
  ],
};

const Certificate = () => {
  const user = getCurrentUser();
  const [name, setName] = useState(user?.name || "");
  const [track, setTrack] = useState("Frontend");
  const [answers, setAnswers] = useState(() =>
    questionSets[track].map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const questions = questionSets[track];

  const score = useMemo(() => {
    return answers.reduce((total, value, index) => {
      if (value === questions[index].answer) return total + 1;
      return total;
    }, 0);
  }, [answers]);

  const allAnswered = answers.every((value) => value !== null);
  const passed = submitted && score === questions.length;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    if (score === questions.length) {
      setShowPopup(true);
    }
  };

  const generateCertificate = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(245, 248, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(3);
    doc.rect(36, 36, pageWidth - 72, pageHeight - 72);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(15, 23, 42);
    doc.text("Certificate of Completion", pageWidth / 2, 140, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("This certifies that", pageWidth / 2, 190, {
      align: "center",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(30, 64, 175);
    doc.text(name || "Student", pageWidth / 2, 235, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(71, 85, 105);
    doc.text(
      "has successfully completed the Code Academy quiz challenge.",
      pageWidth / 2,
      275,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.text(`Score: ${score}/${questions.length}`, pageWidth / 2, 310, {
      align: "center",
    });

    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, pageWidth / 2, 335, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text("Code Academy", pageWidth - 120, pageHeight - 70);

    doc.save("certificate.pdf");
  };

  return (
    <>
      <Header />
      <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.12),_transparent_60%)]"></div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700/80 dark:text-cyan-300/80">
                Certificate
              </p>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                Earn your certificate
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Complete the 5-question quiz to unlock your PDF certificate.
                You must answer all questions correctly.
              </p>

              <div className="mt-6 space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Choose track
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(questionSets).map((option) => {
                    const isActive = track === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setTrack(option);
                          setAnswers(questionSets[option].map(() => null));
                          setSubmitted(false);
                          setShowPopup(false);
                        }}
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                          isActive
                            ? "bg-blue-800 text-white shadow-lg shadow-blue-900/30"
                            : "border border-slate-200/70 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Your name on certificate
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Status
                </p>
                <p className="mt-2">
                  {submitted
                    ? passed
                      ? "Quiz passed. You can download your certificate."
                      : "Quiz submitted. You need all correct answers to pass."
                    : "Complete the quiz to unlock your certificate."}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Score: {score}/{questions.length}
                </p>
                <button
                  type="button"
                  onClick={generateCertificate}
                  disabled={!passed}
                  className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition ${
                    passed
                      ? "bg-blue-800 shadow-blue-900/30 hover:-translate-y-0.5 hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none"
                  }`}
                >
                  Download Certificate PDF
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
            >
              <h2 className="text-lg font-semibold">Quiz (5 questions)</h2>
              <div className="mt-4 space-y-5">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {index + 1}. {question.question}
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={option}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                            answers[index] === optionIndex
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200"
                              : "border-slate-200/70 bg-white/90 dark:border-white/10 dark:bg-slate-900/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={answers[index] === optionIndex}
                            onChange={() =>
                              setAnswers((prev) => {
                                const next = [...prev];
                                next[index] = optionIndex;
                                return next;
                              })
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={!allAnswered}
                className={`mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  allAnswered
                    ? "bg-slate-900 shadow-slate-900/30 hover:-translate-y-0.5 hover:bg-slate-800"
                    : "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none"
                }`}
              >
                Submit Quiz
              </button>
            </form>
          </div>
        </div>
      </section>
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Certificate unlocked
              </p>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-white/10 dark:text-slate-300"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Great job! You answered all questions correctly. Download your
              certificate now.
            </p>
            <button
              type="button"
              onClick={generateCertificate}
              className="mt-5 w-full rounded-2xl bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Download Certificate PDF
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Certificate;
