export default function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[210px] shrink-0 gap-3 py-4">
      <div className="border border-slate-200 rounded-md p-4 text-center">
        <p className="text-[13px] text-slate-600 mb-3">
          Sign in to track your progress and earn XP!
        </p>
        <button
          type="button"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold py-2 rounded-sm mb-2"
        >
          Sign In
        </button>
        <p className="text-[12px] text-slate-400 mb-2">or</p>
        <div className="flex justify-center gap-2 mb-2">
          <span className="w-7 h-7 border rounded flex items-center justify-center text-[13px]">G</span>
          <span className="w-7 h-7 border rounded bg-blue-600 text-white flex items-center justify-center text-[13px]">f</span>
          <span className="w-7 h-7 border rounded flex items-center justify-center text-[13px]">⌥</span>
        </div>
        <p className="text-[12px] text-slate-500">
          No account? <span className="text-green-600 font-medium">Register</span>
        </p>
      </div>

      <div className="flex gap-3 text-slate-500 justify-center text-lg">
        <span>▶️</span><span>in</span><span>💬</span><span>f</span><span>📷</span>
      </div>
      <p className="text-center text-blue-600 text-[13px] cursor-pointer">REMOVE ADS</p>

      <div className="bg-slate-900 rounded-md overflow-hidden text-white">
        <div className="bg-white text-slate-800 text-[11px] font-bold px-2 py-1">
          W<sup>3</sup>schools
        </div>
        <div className="p-3 text-[12px]">
          Python Global Variables
          <div className="mt-2 flex items-center justify-center h-16 bg-slate-800 rounded">▶</div>
        </div>
      </div>
    </aside>
  );
}