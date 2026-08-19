import { FacebookIcon, GithubIcon } from '../SocialIcons';

const FEATURES = [
  'Track your progress',
  'Ad-free',
  'Build & host websites',
  'Code challenges',
  '...and much more',
];

export default function SignUpModal({ onClose = () => {} }) {
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
            Sign <span className="text-emerald-500">up</span>
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
          Unlock powerful features
        </p>

        <div className="px-6 mt-4">
          <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded">
            FREE TRIAL
          </span>
        </div>

        <ul className="px-6 mt-3 space-y-1.5 text-[13px] text-slate-600">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold leading-none mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="px-6 mt-4 text-[13px] text-slate-500">
          Already have an account?{' '}
          <span className="text-green-600 font-semibold cursor-pointer">Sign In</span>
        </p>

        <div className="px-6 mt-5 flex items-center gap-4">
          <span className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <span className="flex-1 h-px bg-slate-200" />
        </div>

        <form className="px-6 mt-5 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <label className="flex items-start gap-2 text-[12px] text-slate-500 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-emerald-500" />
            Email me with news and updates
          </label>
          <p className="text-[11px] text-slate-400 -mt-2">
            By signing up you agree to our Terms of Service and Privacy Policy
          </p>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-md hover:bg-emerald-600"
          >
            Create account
          </button>
        </form>

        <p className="px-6 mt-4 text-[10px] text-slate-400 leading-relaxed">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>

        <div className="px-6 mt-4 flex items-center justify-center gap-4">
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