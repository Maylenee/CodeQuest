import { FacebookIcon, GithubIcon } from '../../components/SocialIcons';

export default function AdCard() {
  return (
    <div className="bg-white border border-slate-200 rounded p-4 flex flex-col items-center text-center gap-2">
      <span className="text-lg font-black">
        Dev<span className="text-emerald-500">Academy</span>
      </span>
      <p className="text-xs text-slate-500">
        Sign in to track your progress and earn XP.
      </p>
      <button
        type="button"
        className="w-full bg-emerald-500 text-white text-sm font-semibold py-2 rounded hover:bg-emerald-600"
      >
        Sign In
      </button>
      <div className="flex gap-2 mt-1">
        <span className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-xs font-bold">G</span>
        <FacebookIcon className="text-slate-400 mt-1.5" />
        <GithubIcon className="text-slate-400 mt-1.5" />
      </div>
      <p className="text-[11px] text-slate-400 mt-1">No account? Register</p>
    </div>
  );
}