export default function NextPrevBar() {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50"
      >
        ‹ Previous
      </button>
      <button
        type="button"
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold"
      >
        Next ›
      </button>
    </div>
  );
}