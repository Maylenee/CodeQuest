export default function Pagination() {
  return (
    <div className="flex items-center justify-between text-[13px] text-slate-600 my-4">
      <span>1 Pagination</span>
      <button
        type="button"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-sm font-semibold text-[13px]"
      >
        Next »
      </button>
    </div>
  );
}