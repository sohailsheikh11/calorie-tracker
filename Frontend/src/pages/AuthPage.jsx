import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000"; 

 const Field = ({ label, ...props }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{label}</label>
      <input
        {...props}
        className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 text-sm placeholder-neutral-600 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
      />
    </div>
  );// Replace with your actual API URL

export default function AuthPages() {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "", email: "", password: "", calorie_goal: 2000,
    protein_goal: 150, carbs_goal: 200, fat_goal: 65,
  });

  const handleLogin = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
        
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.detail || "Login failed");
      const tok = data.token || data.access_token || data.jwt;
      if (!tok) throw new Error("No token in response");
      localStorage.setItem("auth_token", tok);
      setToken(tok);
      setSuccess("Logged in successfully!");
      navigate("/");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.detail || "Signup failed");
      const tok = data.token || data.access_token || data.jwt;
      if (tok) { localStorage.setItem("auth_token", tok); setToken(tok); }
      setSuccess("Account created! You're all set.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t) => { setTab(t); setError(""); setSuccess(""); };

 

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Calorie<span className="text-green-400">Tracker</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-1 font-light">Track your macros. Hit your goals.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-neutral-800 rounded-xl p-1 mb-8 gap-1">
          {["login", "signup"].map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
                tab === t
                  ? "bg-green-400 text-black shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5 text-center">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-400/10 border border-green-400/30 text-green-400 text-sm rounded-xl px-4 py-3 mb-5 text-center">
            ✓ {success}
          </div>
        )}

        {/* LOGIN */}
        {tab === "login" && (
          <div className="flex flex-col gap-4">
            <Field label="Email" type="email" placeholder="you@example.com"
              value={loginForm.email}
              onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} />
            <Field label="Password" type="password" placeholder="••••••••"
              value={loginForm.password}
              onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />

            <button
              onClick={handleLogin}
              disabled={loading || !loginForm.email || !loginForm.password}
              className="mt-2 w-full bg-green-400 hover:bg-green-300 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-sm py-3.5 rounded-xl transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/25 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Logging in…
                </span>
              ) : "Log In"}
            </button>
          </div>
        )}

        {/* SIGNUP */}
        {tab === "signup" && (
          <div className="flex flex-col gap-4">
            <Field label="Full Name" type="text" placeholder="Alex Johnson"
              value={signupForm.name}
              onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))} />
            <Field label="Email" type="email" placeholder="you@example.com"
              value={signupForm.email}
              onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))} />
            <Field label="Password" type="password" placeholder="••••••••"
              value={signupForm.password}
              onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))} />
            <Field label="Daily Calorie Goal (kcal)" type="number" placeholder="2000"
              value={signupForm.calorie_goal}
              onChange={e => setSignupForm(p => ({ ...p, calorie_goal: +e.target.value }))} />

            {/* Macros */}
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Macro Goals (g/day)</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "protein_goal", label: "Protein", color: "text-orange-400", ring: "focus:border-orange-400 focus:ring-orange-400/20", placeholder: "150" },
                  { key: "carbs_goal",   label: "Carbs",   color: "text-sky-400",    ring: "focus:border-sky-400 focus:ring-sky-400/20",       placeholder: "200" },
                  { key: "fat_goal",     label: "Fat",     color: "text-violet-400", ring: "focus:border-violet-400 focus:ring-violet-400/20",  placeholder: "65"  },
                ].map(({ key, label, color, ring, placeholder }) => (
                  <div key={key}>
                    <label className={`text-xs font-bold uppercase tracking-wider ${color} block mb-2`}>{label}</label>
                    <input
                      type="number"
                      placeholder={placeholder}
                      value={signupForm[key]}
                      onChange={e => setSignupForm(p => ({ ...p, [key]: +e.target.value }))}
                      className={`w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-neutral-100 text-sm placeholder-neutral-600 outline-none focus:ring-2 transition-all ${ring}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading || !signupForm.email || !signupForm.password || !signupForm.name}
              className="mt-2 w-full bg-green-400 hover:bg-green-300 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-sm py-3.5 rounded-xl transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/25 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </div>
        )}

        {/* Token display */}
        {token && (
          <>
            <div className="border-t border-neutral-800 my-6" />
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Token Saved ✓</p>
              <p className="text-xs text-neutral-500 font-mono break-all leading-relaxed">
                {token.slice(0, 80)}…
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}