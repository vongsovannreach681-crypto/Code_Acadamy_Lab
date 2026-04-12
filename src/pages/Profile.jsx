import React, { useMemo, useState } from "react";
import Header from "../components/HeaderAndFooter/Header";
import Footer from "../components/HeaderAndFooter/Footer";
import { getCurrentUser } from "../utils/auth";
import { getAllLessons } from "../Data/lessonStore";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "lessons", label: "My Lessons" },
  { id: "favorites", label: "Favorites" },
  { id: "history", label: "History" },
];

const Profile = () => {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  }));
  const [avatarName, setAvatarName] = useState("");
  const [notice, setNotice] = useState("");

  const [lessonsList, setLessonsList] = useState(() => getAllLessons());
  const [favoriteIds, setFavoriteIds] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [historyEntries, setHistoryEntries] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("viewHistory");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed
      .filter((entry) => (user ? entry.userId === user.id : entry.userId == null))
      .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
  });

  const myLessons = useMemo(
    () => lessonsList.filter((lesson) => lesson.authorId === user?.id),
    [lessonsList, user]
  );
  const favoriteLessons = useMemo(
    () => lessonsList.filter((lesson) => favoriteIds.includes(lesson.id)),
    [lessonsList, favoriteIds]
  );
  const historyLessons = useMemo(
    () =>
      historyEntries
        .map((entry) => ({
          ...lessonsList.find((lesson) => lesson.id === entry.lessonId),
          viewedAt: entry.viewedAt,
        }))
        .filter(Boolean),
    [historyEntries, lessonsList]
  );

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      setProfile((prev) => ({ ...prev, avatar: result }));
      setAvatarName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    if (!user) return;
    const updated = {
      ...user,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
    };
    localStorage.setItem("authUser", JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem("authUsers") || "[]");
    const next = users.map((item) => (item.id === user.id ? updated : item));
    localStorage.setItem("authUsers", JSON.stringify(next));
    setNotice("Profile updated successfully.");
  };

  const removeMyLesson = (lessonId) => {
    setLessonsList((prev) => prev.filter((lesson) => lesson.id !== lessonId));
    const stored = JSON.parse(localStorage.getItem("userLessons") || "[]");
    const next = stored.filter((lesson) => lesson.id !== lessonId);
    localStorage.setItem("userLessons", JSON.stringify(next));
    setNotice("Lesson removed.");
  };

  const removeFavorite = (lessonId) => {
    const next = favoriteIds.filter((id) => id !== lessonId);
    setFavoriteIds(next);
    const meta = JSON.parse(localStorage.getItem("favoritesMeta") || "{}");
    delete meta[lessonId];
    localStorage.setItem("favorites", JSON.stringify(next));
    localStorage.setItem("favoritesMeta", JSON.stringify(meta));
    setNotice("Favorite removed.");
  };

  const removeHistory = (lessonId, viewedAt) => {
    const next = historyEntries.filter(
      (entry) => !(entry.lessonId === lessonId && entry.viewedAt === viewedAt)
    );
    setHistoryEntries(next);
    localStorage.setItem("viewHistory", JSON.stringify(next));
    setNotice("History entry removed.");
  };

  if (!user) {
    return (
      <>
        <Header />
        <section className="bg-white py-16 text-slate-900 dark:bg-slate-950 dark:text-white">
          <div className="mx-auto w-[80%] text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Please login to view your profile.
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.12),_transparent_60%)]"></div>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
            <aside className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <i className="fa-solid fa-user"></i>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        isActive
                          ? "bg-blue-800 text-white shadow-lg shadow-blue-900/30"
                          : "border border-slate-200/70 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-6">
              {notice && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {notice}
                </div>
              )}
              {activeTab === "profile" && (
                <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700/80 dark:text-cyan-300/80">
                    Profile
                  </p>
                  <h1 className="mt-4 text-3xl font-bold">Edit Profile</h1>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Update your info and upload a profile image.
                  </p>

                  <form className="mt-6 space-y-4" onSubmit={handleProfileSave}>
                    <div className="flex items-center gap-4">
                      <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-900">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <i className="fa-solid fa-user text-xl"></i>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 dark:text-slate-300"
                        />
                        {avatarName && (
                          <p className="mt-2 text-xs text-slate-500">
                            Uploaded: {avatarName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(event) =>
                          setProfile((prev) => ({
                            ...prev,
                            name: event.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(event) =>
                          setProfile((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 w-full rounded-2xl bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      Save Profile
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "lessons" && (
                <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <h2 className="text-lg font-semibold">My Shared Lessons</h2>
                  {myLessons.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                      No shared lessons yet.
                    </p>
                  ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {myLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="group rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/60"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {lesson.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {lesson.category} • {lesson.lessonCount} lessons
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMyLesson(lesson.id)}
                              className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "favorites" && (
                <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <h2 className="text-lg font-semibold">Favorite Lessons</h2>
                  {favoriteLessons.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                      No favorites yet.
                    </p>
                  ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {favoriteLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="group rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/60"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {lesson.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {lesson.category} • {lesson.durationHours} hrs
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFavorite(lesson.id)}
                              className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <h2 className="text-lg font-semibold">Recently Viewed</h2>
                  {historyLessons.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                      No viewing history yet.
                    </p>
                  ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {historyLessons.map((lesson) => (
                        <div
                          key={`${lesson.id}-${lesson.viewedAt}`}
                          className="group rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/60"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {lesson.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Viewed {new Date(lesson.viewedAt).toLocaleString()}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeHistory(lesson.id, lesson.viewedAt)}
                              className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
