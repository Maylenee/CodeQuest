export default function ExerciseRow({ name, count }) {
  return (
    <div className="flex items-center border-l-4 border-green-500 bg-white shadow-sm rounded-sm mb-2">
      <div className="flex-1 px-4 py-3">
        <p className="text-[15px] font-semibold text-slate-800">{name}</p>
        <p className="text-[12px] text-slate-500">{count} exercises</p>
      </div>
      <button
        type="button"
        className="mr-3 border border-slate-300 hover:bg-slate-50 text-[13px] text-slate-700 px-4 py-1.5 rounded-sm"
      >
        Open
      </button>
    </div>
  );
}