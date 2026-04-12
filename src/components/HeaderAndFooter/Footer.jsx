import React from 'react'

const Footer = () => {
  const links = [
    {
      title: 'Programs',
      items: ['Frontend Track', 'Backend Track', 'Fullstack Track', 'UI/UX Labs'],
    },
    {
      title: 'Resources',
      items: ['Community', 'Mentors', 'Success Stories', 'Blog'],
    },
    {
      title: 'Company',
      items: ['About Us', 'Careers', 'Contact', 'Support'],
    },
  ]

  return (
    <footer className="bg-white text-slate-900 transition-colors duration-500 dark:bg-black dark:text-white">
      <div className="mx-auto w-[80%] py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
              Code Academy
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Build skills that launch careers.
            </h3>
            <p className="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-300">
              Learn by shipping real projects, supported by mentors and a
              community that keeps you accountable.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700">
                Start Learning
              </button>
              <button className="rounded-lg border border-slate-900/15 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white">
                Talk to Us
              </button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="transition hover:text-slate-900 dark:hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200/70 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Code Academy. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="transition hover:text-slate-900 dark:hover:text-white">
              Privacy Policy
            </span>
            <span className="transition hover:text-slate-900 dark:hover:text-white">
              Terms
            </span>
            <span className="transition hover:text-slate-900 dark:hover:text-white">
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
