import React, { useEffect, useState } from "react";
import { getAllLessons } from "../Data/lessonStore";
import { Link } from "react-router-dom";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { useNavigate } from "react-router-dom";

const CardList = ({ favorites = [], onToggleFavorite, initialVisible = 6 }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(getAllLessons());
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading Data to respond...
      </div>
    );
  }

  return (
    <section className="bg-white py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-[80%]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700/80 dark:text-cyan-300/80">
              Lessons
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Learn with modern, project-based courses
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Choose a path, build real projects, and upgrade your skills.
            </p>
          </div>
          <button className="rounded-lg border border-slate-900/15 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white">
            Browse All
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showAll ? cards : cards.slice(0, initialVisible)).map((card) => {
            const isFavorite = favorites.includes(card.id);
            return (
              <article
                key={card.id}
                className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
              >
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-slate-100 p-3 dark:bg-slate-800">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-[200px] rounded-lg object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                    {card.level}
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
                    onClick={() => onToggleFavorite?.(card.id)}
                  >
                    <i
                      className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}
                    ></i>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                      {card.category}
                    </span>
                    <span>{card.lessonCount} lessons</span>
                    <span>-</span>
                    <span>{card.durationHours} hrs</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{card.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                    {card.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-2 py-1 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      key={card.id}
                      to={`/course/${card.id}`}
                      className="group"
                    >
                      {/* Card content */}
                      <button className="w-full rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-700">
                        Learn Now
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {cards.length > initialVisible && (
          <div className="mt-10 flex justify-center">
            <button
              className="rounded-lg border border-slate-900/15 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/20 dark:text-white/90 dark:hover:border-white/40 dark:hover:text-white"
              onClick={() => setShowAll((prev) => !prev)}
              type="button"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardList;
