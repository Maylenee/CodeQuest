import { useState } from 'react';
import { FacebookIcon, GithubIcon } from '../SocialIcons';
import { loginUser } from '../../lib/api';

export default function SignInModal({ onClose = () => {}, onSignUp = () => {}, onLoggedIn = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      setSuccess(true);
      setTimeout(() => onLoggedIn(user), 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white h-full w-full max-w-sm shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <p className="text-xl font-black">
            Sign <span className="text-emerald-500">in</span>
          </p>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="px-6 mt-2 text-sm text-slate-600">
          Get access to more learning features
        </p>

        <p className="px-6 mt-4 text-[13px] text-slate-500">
          Don&apos;t have an account?{' '}
          <span className="text-green-600 font-semibold cursor-pointer" onClick={onSignUp}>
            Register
          </span>
        </p>

        <div className="px-6 mt-5 flex items-center gap-4">
          <span className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <span className="flex-1 h-px bg-slate-200" />
        </div>

        {success ? (
          <p className="px-6 mt-6 text-sm text-emerald-600 font-semibold">
            Login berhasil! Mengalihkan…
          </p>
        ) : (
          <form className="px-6 mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-green-600 font-semibold cursor-pointer">
                  Forgot your password?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            {error && <p className="text-[13px] text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-md hover:bg-emerald-600 disabled:opacity-60"
            >
              {loading ? 'Memproses…' : 'Sign In'}
            </button>
          </form>
        )}

        <div className="px-6 mt-6 flex items-center justify-center gap-4">
          <span className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500">
            G
          </span>
          <FacebookIcon size={18} className="text-slate-400 mt-1" />
          <GithubIcon size={18} className="text-slate-400 mt-1" />
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}
