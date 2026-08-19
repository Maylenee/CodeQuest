export default function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[180px] shrink-0 gap-3 py-4">
      <div className="bg-slate-800 text-white rounded-md p-3 text-[12px] text-center">
        <p className="mb-2">Get Certified. Get Hired.</p>
        <p className="text-[10px] text-slate-300 mb-3">
          Turn your knowledge into credentials.
        </p>
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 w-full text-[11px] font-semibold py-1.5 rounded-sm"
        >
          Learn More
        </button>
      </div>
      <div className="flex gap-2 text-slate-500 justify-center text-base">
        <span>▶️</span><span>in</span><span>💬</span><span>f</span><span>📷</span>
      </div>
      <p className="text-center text-blue-600 text-[12px] cursor-pointer">REMOVE ADS</p>
      <div className="bg-slate-900 rounded-md overflow-hidden text-white">
        <div className="p-2 text-[11px]">
          Python Global Variables
          <div className="mt-2 flex items-center justify-center h-14 bg-slate-800 rounded">▶</div>
        </div>
      </div>
    </aside>
  );
}