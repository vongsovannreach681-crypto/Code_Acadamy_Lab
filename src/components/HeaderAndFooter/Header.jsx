import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/Logo.png'

const Header = ({ favoritesCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white py-3 shadow-sm dark:bg-slate-950">
        <div className="relative mx-auto w-[80%] rounded-2xl bg-white px-6 py-3 shadow-[0_6px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 dark:bg-slate-900/70 dark:ring-white/10">
          <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full ring-1 ring-slate-200"
              src={logo}
              alt="Logo"
            />
            <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-200">Code</span>
            <span className="text-lg font-semibold text-orange-500">
              Academy
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[18px] font-semibold transition md:text-[18px] ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white'
                }`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/courseNav"
              className={({ isActive }) =>
                `text-[18px] font-semibold transition md:text-[18px] ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white'
                }`
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[18px] font-semibold transition md:text-[18px] ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-indigo-700 shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-100 dark:bg-white/10 dark:text-indigo-200 dark:ring-white/10 dark:hover:bg-white/15 lg:hidden"
              aria-label="Toggle menu"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="hidden items-center gap-3 md:flex">
              <button
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-orange-500 shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-100 dark:bg-white/10 dark:text-amber-300 dark:ring-white/10 dark:hover:bg-white/15"
                aria-label="Toggle theme"
                type="button"
                onClick={toggleTheme}
              >
                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              <Link
                to="/favorites"
                className="relative grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-pink-600 shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-100 dark:bg-white/10 dark:text-pink-300 dark:ring-white/10 dark:hover:bg-white/15"
                aria-label="Favorites"
              >
                <i className="fa-regular fa-heart"></i>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-pink-600 text-[10px] font-semibold text-white">
                  {favoritesCount}
                </span>
              </Link>
              <button
                className="flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 dark:border-white/20 dark:text-indigo-100 dark:hover:bg-white/10"
                type="button"
              >
                Login
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
          </div>

          <div
            className={`mt-3 space-y-2 lg:hidden ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center gap-3 px-3 py-2 md:hidden">
              <button
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-orange-500 shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-100 dark:bg-white/10 dark:text-amber-300 dark:ring-white/10 dark:hover:bg-white/15"
                aria-label="Toggle theme"
                type="button"
                onClick={toggleTheme}
              >
                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              <Link
                to="/favorites"
                className="relative grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-pink-600 shadow-sm ring-1 ring-slate-100 transition hover:bg-slate-100 dark:bg-white/10 dark:text-pink-300 dark:ring-white/10 dark:hover:bg-white/15"
                aria-label="Favorites"
              >
                <i className="fa-regular fa-heart"></i>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-pink-600 text-[10px] font-semibold text-white">
                  {favoritesCount}
                </span>
              </Link>
              <button
                className="flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 dark:border-white/20 dark:text-indigo-100 dark:hover:bg-white/10"
                type="button"
              >
                Login
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-[18px] font-semibold transition ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:bg-slate-50 hover:text-indigo-900 dark:text-indigo-200 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/courseNav"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-[18px] font-semibold transition ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:bg-slate-50 hover:text-indigo-900 dark:text-indigo-200 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-[18px] font-semibold transition ${
                  isActive
                    ? 'text-yellow-500 underline underline-offset-8'
                    : 'text-indigo-700 hover:bg-slate-50 hover:text-indigo-900 dark:text-indigo-200 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
