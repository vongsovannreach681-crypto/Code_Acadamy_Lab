const USERS_KEY = "authUsers";
const CURRENT_KEY = "authUser";

const readUsers = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

const writeUsers = (users) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
};

export const isAuthenticated = () => !!getCurrentUser();

export const registerUser = ({ name, email, password }) => {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: "Email already registered." };
  }
  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };
  writeUsers([...users, newUser]);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(newUser));
  return { ok: true, user: newUser };
};

export const loginUser = ({ email, password }) => {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(
    (user) => user.email === normalizedEmail && user.password === password
  );
  if (!found) {
    return { ok: false, message: "Invalid email or password." };
  }
  localStorage.setItem(CURRENT_KEY, JSON.stringify(found));
  return { ok: true, user: found };
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_KEY);
};
