export default function GetCertifiedAd() {
  return (
    <div className="hidden xl:flex flex-col items-center w-[200px] shrink-0 ml-4 mt-4">
      <div className="bg-slate-800 text-white rounded-md p-4 w-full text-center">
        <p className="text-[13px] leading-snug mb-2">
          Get Certified <br /> for
        </p>
        <p className="text-3xl font-bold text-white mb-1">Free</p>
        <div className="flex justify-center gap-2 my-3 text-lg">
          <span>📘</span>
          <span>📗</span>
          <span>📙</span>
          <span>📕</span>
          <span>📓</span>
        </div>
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 w-full text-[13px] font-semibold py-1.5 rounded-sm"
        >
          Sign Up, It's Free
        </button>
      </div>
    </div>
  );
}