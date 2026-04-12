import React from "react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-500/20"></div>
        <div className="hero-float-delay absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]"></div>
      </div>

      <div className="relative mx-auto flex w-[90%] flex-col gap-10 sm:w-[85%] lg:w-[80%] lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1">
          <span className="hero-fade-up inline-flex items-center gap-2 rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-700 ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-cyan-200 dark:ring-white/15">
            Code Academy
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-300"></span>
          </span>

          <h1 className="hero-fade-up-delay mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Build modern apps{" "}
            <span className="text-cyan-700 dark:text-cyan-300">faster</span>{" "}
            with a coding-first learning path
          </h1>

          <p className="hero-fade-up-delay-2 mt-4 max-w-xl text-base text-slate-700 dark:text-slate-200 sm:text-lg">
            Learn by shipping real projects. Master React, APIs, and UI systems
            with hands-on challenges, live feedback, and a community that ships.
          </p>

          <div className="hero-fade-up-delay-3 mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700">
              Start Learning
            </button>
            <button className="rounded-lg border border-slate-900/15 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white">
              View Courses
            </button>
            <div className="ml-2 hidden items-center gap-2 text-xs text-slate-500 dark:text-slate-300 sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              120+ Coding Labs
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="hero-fade-up-delay-2 rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur sm:p-5 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span className="ml-3 text-xs text-slate-500 dark:text-slate-300">
                Live coding lab
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-slate-900/10 bg-slate-100 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  hero-banner.tsx
                </span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] font-semibold text-cyan-700 dark:text-cyan-200">
                  Running
                </span>
              </div>
              <pre className="text-xs leading-5 text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words sm:text-sm">
                    {`hero-banner.tsx
                    Running
                    const hero = {
                    title: "Create a modern web app",
                    skills: ["React", "API", "Design"],
                    status: "shipping"
                    }`}
              </pre>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-200">
              <div className="rounded-lg border border-slate-900/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">
                  Projects shipped
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  48
                </p>
              </div>
              <div className="rounded-lg border border-slate-900/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">
                  Weekly challenges
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
