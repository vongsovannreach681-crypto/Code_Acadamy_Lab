import React from 'react'
import kbBothRaksa from '../assets/Images/K.Both Raksa.jpg'
import sokPhanna from '../assets/Images/Sok Phanna.JPG'
import sokRaksa from '../assets/Images/Sok Raksa.jpg'
import sotSaron from '../assets/Images/Sot Saron.jpg'
import vorngSovannreach from '../assets/Images/Vorng Sovannreach.jpg'

const StudentReview = () => {
  const reviews = [
    {
      name: 'K. Both Raksa',
      image: kbBothRaksa,
      role: 'Frontend Learner',
      quote: 'Clear lessons and real projects made everything click.',
    },
    {
      name: 'Sok Phanna',
      image: sokPhanna,
      role: 'Fullstack Track',
      quote: 'The labs and mentor feedback pushed me to ship faster.',
    },
    {
      name: 'Sok Raksa',
      image: sokRaksa,
      role: 'Backend Learner',
      quote: 'The roadmap kept me focused and confident each week.',
    },
    {
      name: 'Sot Saron',
      image: sotSaron,
      role: 'UI/UX Explorer',
      quote: 'Design + code challenges helped me build a portfolio.',
    },
    {
      name: 'Vorng Sovannreach',
      image: vorngSovannreach,
      role: 'React Developer',
      quote: 'The community support made learning feel less lonely.',
    },
  ]

  return (
    <section className="bg-white py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-[80%]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
              Reviews
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Students who learned by building
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Real feedback from learners who shipped projects and leveled up.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden">
        <div className="review-track px-[10%]">
          {[...reviews, ...reviews].map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="group w-[540px] shrink-0 rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-cyan-400 opacity-80 blur-sm"></div>
                  <img
                    src={review.image}
                    alt={review.name}
                    className="relative h-24 w-24 rounded-full border-2 border-white object-cover shadow-lg dark:border-slate-900"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700/70 dark:text-cyan-200/70">
                      Student review
                    </p>
                    <div className="flex gap-1 text-amber-400">
                      <i className="fa-solid fa-star text-xs"></i>
                      <i className="fa-solid fa-star text-xs"></i>
                      <i className="fa-solid fa-star text-xs"></i>
                      <i className="fa-solid fa-star text-xs"></i>
                      <i className="fa-solid fa-star text-xs"></i>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    “{review.quote}”
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold">{review.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {review.role}
                      </p>
                    </div>
                    <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition group-hover:border-blue-200 group-hover:text-blue-700 dark:border-white/10 dark:text-slate-300 dark:group-hover:border-cyan-400/40 dark:group-hover:text-cyan-200">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
      </div>
    </section>
  )
}

export default StudentReview
