import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import logo from "../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/sharing";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const result = loginUser(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.18),_transparent_60%)]"></div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_30px_70px_rgba(15,23,42,0.2)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr] dark:border-white/10 dark:bg-slate-900/70">
          <div className="relative flex flex-col justify-between gap-8 bg-slate-900 px-10 py-12 text-white">
            <div className="absolute inset-0 opacity-50">
              <div className="h-full w-full bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,23,42,0.7)),linear-gradient(0deg,rgba(15,23,42,0.75),rgba(15,23,42,0.75)),repeating-linear-gradient(60deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_22px)]"></div>
            </div>
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <img src={logo} alt="Code Academy" className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200/80">
                    Code Academy
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">
                    Sign In
                  </p>
                </div>
              </div>
              <h1 className="mt-10 text-3xl font-bold sm:text-4xl">
                Welcome Back
              </h1>
              <p className="mt-3 max-w-sm text-sm text-slate-200">
                Login to access your sharing dashboard.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <iframe
                title="Login animation"
                src="https://lottie.host/embed/19693797-d6c5-4eb4-9f4c-3a9309c56675/7Ek5MHOWqe.lottie"
                className="h-52 w-full rounded-xl border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative px-10 py-12">
            <Link
              to="/"
              className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Sign In</h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to access your account.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-200">
                  <i className="fa-regular fa-envelope text-slate-400"></i>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    placeholder="user@email.com"
                    className="w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Password
                  </label>
                  <Link to="/register" className="text-xs font-semibold text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-200">
                  <i className="fa-solid fa-lock text-slate-400"></i>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                    placeholder="********"
                    className="w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Sign In
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
              <p className="text-center text-xs text-slate-500">
                Don"t have an account?{" "}
                <Link to="/register" className="font-semibold text-blue-700">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

