import React, { useState } from "react";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import creatorImage from "../assets/Images/Vorng Sovannreach.jpg";
import supportQr from "../assets/Qrcode.png";

const About = () => {
  const [showQr, setShowQr] = useState(false);

  return (
    <>
      <Header />
      <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.12),_transparent_60%)]"></div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-600/20 via-cyan-400/10 to-transparent blur-2xl"></div>
              <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                <img
                  src={creatorImage}
                  alt="Vorng Sovannreach"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/70 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700/80 dark:text-cyan-300/80">
                About The Creator
              </p>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                Vorng Sovannreach
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Student at Setec Institute
              </p>

              <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  I built Code Academy as a learning space where students can
                  explore structured lessons, practice code, and share their own
                  lesson packs in one place. The goal is to make learning
                  programming feel approachable, collaborative, and practical.
                </p>
                <p>
                  This platform reflects my passion for web development and my
                  journey as a student at Setec Institute. I enjoy designing
                  clean interfaces, building useful tools, and helping others
                  learn by sharing resources.
                </p>
                <p>
                  Outside of coding, I like experimenting with UI concepts,
                  learning new technologies, and working on projects that solve
                  real problems for students.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span className="rounded-full border border-slate-200 px-3 py-2 dark:border-white/10">
                  Web Development
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-2 dark:border-white/10">
                  UI/UX
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-2 dark:border-white/10">
                  Learning Design
                </span>
              </div>

              <div className="mt-10 rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300">
                  Support
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
                  <img
                    src={supportQr}
                    alt="Support QR code"
                    className="h-28 w-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-900"
                  />
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      If you want to support this project
                    </p>
                    <p className="mt-2">
                      Please scan the QR code to contribute. Your support helps
                      me keep improving Code Academy.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowQr(true)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                      Support
                      <i className="fa-solid fa-qrcode"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showQr && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Support Code Academy
              </p>
              <button
                type="button"
                onClick={() => setShowQr(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-white/10 dark:text-slate-300"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <img
                src={supportQr}
                alt="Support QR code"
                className="h-[420px] w-[360px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900"
              />
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-300">
              Scan the QR code to support this project.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default About;
