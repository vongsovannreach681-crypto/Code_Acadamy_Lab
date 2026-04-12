import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LessonData from '../Data/LessonData.json'
import Header from '../components/HeaderAndFooter/Header'
import Footer from '../components/HeaderAndFooter/Footer'

const FavoritePage = ({ favorites = [] }) => {
  const [localIds, setLocalIds] = useState(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  const ids = favorites.length ? favorites : localIds

  const favoritesMeta = useMemo(() => {
    if (typeof window === 'undefined') return {}
    return JSON.parse(localStorage.getItem('favoritesMeta') || '{}')
  }, [ids])

  const [query, setQuery] = useState('')

  const favoriteCourses = LessonData.filter((lesson) => ids.includes(lesson.id))
  const filteredCourses = favoriteCourses.filter((course) =>
    course.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  const removeFavorite = (id) => {
    const next = ids.filter((item) => item !== id)
    const meta = JSON.parse(localStorage.getItem('favoritesMeta') || '{}')
    delete meta[id]
    localStorage.setItem('favorites', JSON.stringify(next))
    localStorage.setItem('favoritesMeta', JSON.stringify(meta))
    setLocalIds(next)
  }

  const formatTime = (iso) => {
    if (!iso) return 'Unknown'
    return new Date(iso).toLocaleString()
  }

  return (
    <>
      <Header favoritesCount={ids.length} />
      <section className="bg-white py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto w-[80%]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
                Favorites
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                Your saved courses
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Keep track of the lessons you want to learn next.
              </p>
            </div>
            <Link
              to="/"
              className="rounded-lg border border-slate-900/15 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white"
            >
              Back to Home
            </Link>
          </div>

          {favoriteCourses.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200/70 bg-slate-50/60 p-8 text-center text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <p className="text-lg font-semibold">No favorites yet</p>
              <p className="mt-2 text-sm">
                Browse courses and tap the heart to save your favorites.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Search
                  </label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by course name"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                  />
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-slate-200/70 bg-slate-50/60 p-6 text-center text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <p className="text-sm">No results found for “{query}”.</p>
                </div>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
                >
                  <Link to={`/course/${course.id}`}>
                    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-slate-100 p-3 dark:bg-slate-800">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-full w-full object-contain transition duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                        {course.category}
                      </span>
                      <span>{course.lessonCount} lessons</span>
                      <span>-</span>
                      <span>{course.durationHours} hrs</span>
                    </div>
                    <Link to={`/course/${course.id}`}>
                      <h3 className="mt-2 text-base font-semibold hover:text-blue-700 dark:hover:text-cyan-300">
                        {course.name}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                      {course.summary}
                    </p>
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      First saved: {formatTime(favoritesMeta[course.id])}
                    </p>
                    <div className="mt-4">
                      <Link
                        to={`/course/${course.id}`}
                        className="block w-full rounded-lg bg-blue-800 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                      <button
                        className="mt-3 w-full rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700 dark:border-rose-400/30 dark:text-rose-300 dark:hover:border-rose-400/60"
                        type="button"
                        onClick={() => removeFavorite(course.id)}
                      >
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default FavoritePage
