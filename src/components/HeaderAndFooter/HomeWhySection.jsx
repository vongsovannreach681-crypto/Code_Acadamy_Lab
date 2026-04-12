import React from 'react'

const HomeWhySection = () => {
  const features = [
    {
      title: 'Why choose us',
      description:
        'We teach by building. Every lesson ends with a real project so you grow skills that translate directly to work.',
      items: ['Project-first learning', 'Clear, guided paths', 'Mentor support'],
      accent: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'What we provide',
      description:
        'Everything you need to ship confidently — from structured content to feedback and community.',
      items: ['Live coding labs', 'Code reviews', 'Career-ready portfolio'],
      accent: 'from-amber-400/20 to-rose-400/20',
    },
  ]

  const stats = [
    { label: 'Active students', value: '2,400+' },
    { label: 'Course hours', value: '180+' },
    { label: 'Projects shipped', value: '48' },
    { label: 'Mentors', value: '24' },
  ]

  return (
    <section className="bg-white py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white sm:py-20">
      <div className="mx-auto w-[80%]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
              Why us
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A modern learning experience designed for real-world shipping
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              We blend structured learning, rapid feedback, and a community that
              builds together. You stay focused, motivated, and shipping.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              Next cohort starts soon
            </p>
            <p className="mt-1">Secure your spot early and get onboarding help.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {features.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`}
              ></div>
              <div className="relative">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-700 dark:bg-cyan-300"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-6 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeWhySection
