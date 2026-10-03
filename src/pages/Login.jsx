import { useState } from "react";

const USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Administrator" },
  { username: "juri", password: "juri123", role: "juri", name: "Juri" },
];

export const SESSION_KEY = "sheetflow_session";

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const user = USERS.find((u) => u.username === username.trim() && u.password === password);
    if (!user) {
      setTimeout(() => {
        setError("Username atau password salah.");
        setLoading(false);
      }, 250);
      return;
    }
    const session = { username: user.username, role: user.role, name: user.name };
    if (remember) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    setLoading(false);
    window.location.replace("/");
  };

  return (
    <div className="sf-login-page">
      <section className="sf-login-panel">
        <div className="sf-brand-logos" aria-label="Logo Seminar Internasional">
          <img
            className="sf-logo-img"
            src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/1a51227b6_Logo_kemendikbud.png"
            alt="Logo Kemendikbud"
          />
          <img
            className="sf-logo-img"
            src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/1156cfec3_Logo_UT-transparan.png"
            alt="Logo Universitas Terbuka"
          />
          <img
            className="sf-logo-img"
            src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/560b57139_logoICTL.png"
            alt="Logo ICTL"
          />
        </div>

        <header className="sf-login-copy">
          <h1>Seminar Internasional</h1>
          <p>Sistem Penilaian Peserta — silakan masuk untuk melanjutkan penilaian.</p>
        </header>

        <form className="sf-login-form" onSubmit={handleSubmit}>
          <div className="sf-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="sf-field">
            <label htmlFor="password">Password</label>
            <div className="sf-password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="sf-eye"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="sf-remember-row">
            <label className="sf-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
          </div>

          {error && <div className="sf-error" role="alert">{error}</div>}

          <button className="sf-submit" type="submit" disabled={loading}>
            {loading ? "Memproses…" : "Masuk"}
          </button>
        </form>

        <footer className="sf-login-footer">
          © 2026 Seminar Internasional. Untuk penggunaan internal.
        </footer>
      </section>

      <aside className="sf-flyer-panel">
        <div className="sf-flyer-frame">
          <img
            src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/9cb1d3146_ICTLPosterA3-rev2.jpg"
            alt="Flyer Seminar Internasional ICTL 2026"
          />
        </div>
      </aside>
    </div>
  );
}