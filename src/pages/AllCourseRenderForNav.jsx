import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { getAllLessons } from "../Data/lessonStore";

const AllCourseRenderForNav = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getAllLessons());
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(courses.map((course) => course.category));
    return ["All", ...Array.from(unique)];
  }, [courses]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;
      const matchesSearch =
        term.length === 0 ||
        course.name.toLowerCase().includes(term) ||
        course.summary.toLowerCase().includes(term) ||
        course.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, courses]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(id);
      const next = isFavorite ? prev.filter((item) => item !== id) : [...prev, id];

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(next));
        const meta = JSON.parse(localStorage.getItem("favoritesMeta") || "{}");
        if (!isFavorite) {
          meta[id] = new Date().toISOString();
        } else {
          delete meta[id];
        }
        localStorage.setItem("favoritesMeta", JSON.stringify(meta));
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <Header favoritesCount={favorites.length} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.12),_transparent_55%)]"></div>
        <div className="relative mx-auto w-[80%] py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
            Course Library
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            All courses in one place.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Browse every track, filter by category, and search the topics you
            want to master.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              className="rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700"
              type="button"
            >
              Browse All Courses
            </button>
            <Link
              to="/favorites"
              className="rounded-lg border border-slate-900/15 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white"
            >
              View Favorites
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-[80%]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
                All Courses
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Browse every learning track in one place
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Filter by category or search by topic to discover the right fit.
              </p>
            </div>
            <div className="relative w-full max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                className="w-full rounded-2xl border border-slate-200/70 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-400"
                placeholder="Search courses, tags, or topics..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-800 text-white shadow-lg shadow-blue-900/30"
                      : "border border-slate-200/70 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                  }`}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} in{" "}
            {activeCategory === "All" ? "all tracks" : activeCategory}.
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              (() => {
                const isFavorite = favorites.includes(course.id);
                return (
              <article
                key={course.id}
                className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
              >
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-slate-100 p-3 dark:bg-slate-800">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="h-[200px] w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                    {course.level}
                  </div>
                  <button
                    className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full shadow-sm transition hover:scale-105 ${
                      isFavorite
                        ? "bg-pink-600 text-white"
                        : "bg-white/90 text-pink-600 dark:bg-slate-900/80 dark:text-pink-300"
                    }`}
                    type="button"
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    aria-pressed={isFavorite}
                    onClick={() => toggleFavorite(course.id)}
                  >
                    <i
                      className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}
                    ></i>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                      {course.category}
                    </span>
                    <span>{course.lessonCount} lessons</span>
                    <span>-</span>
                    <span>{course.durationHours} hrs</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{course.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                    {course.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-2 py-1 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link to={`/course/${course.id}`} className="group">
                      <button className="w-full rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700">
                        Learn Now
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
                );
              })()
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300/70 bg-white/70 p-10 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
              No courses match your search. Try a different keyword or select a
              new category.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllCourseRenderForNav;
