import baseLessons from "./LessonData.json";

const STORAGE_KEY = "userLessons";

export const getAllLessons = () => {
  if (typeof window === "undefined") return baseLessons;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return [...baseLessons, ...stored];
};

export const getNextLessonId = (lessons) => {
  const maxId = lessons.reduce((max, lesson) => {
    const id = Number(lesson?.id) || 0;
    return id > max ? id : max;
  }, 0);
  return maxId + 1;
};

export const saveLesson = (lesson) => {
  if (typeof window === "undefined") return [];
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const next = [...stored, lesson];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const clearUserLessons = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
