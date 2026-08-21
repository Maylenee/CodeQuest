import Logo from '../Logo';

export default function CertifyCard() {
  return (
    <div className="border-2 border-green-500 rounded-lg p-6 flex-[2] flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <h3 className="text-[19px] font-bold text-slate-900 mb-2">
          Become <span className="text-green-600">HTML</span> Certified
        </h3>
        <p className="text-[13px] text-slate-600 mb-4">
          Get certified with our HTML exam, includes a professional study kit to guide you from
          beginner to exam-ready.
        </p>
        <p className="mb-4">
          <span className="text-[13px] font-bold text-slate-500">Free</span>
        </p>
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm"
        >
          Get HTML Certified
        </button>
      </div>
      <div className="w-full md:w-56 shrink-0 border border-slate-200 rounded-md p-3 relative overflow-hidden">
        <span className="absolute -right-2 -top-2 text-[22px] font-black text-slate-100 select-none leading-none flex items-center">
          <Logo className="h-8 w-auto opacity-20" />
        </span>
        <div className="relative text-center">
          <p className="text-[10px] font-bold text-slate-800 tracking-wide mb-2">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="text-[8px] text-slate-500">This certifies that</p>
          <p className="text-[13px] font-semibold text-slate-900 my-1">Your Name</p>
          <p className="text-[7px] text-slate-500 mb-2 px-2">
            has passed the CodeLearn HTML Certification exam and is hereby declared a
          </p>
          <p className="text-[10px] font-black text-slate-900 mb-1 flex items-center justify-center gap-1">
            <Logo className="h-5 w-auto" />
          </p>
          <p className="text-[10px] font-bold text-slate-900">Certified HTML Developer</p>
          <p className="text-[7px] text-slate-400 mt-1">
            The candidate has passed the exam at the Professional level.
          </p>
          <div className="flex justify-between text-[6px] text-slate-400 mt-3">
            <span>
              Verify at
              <br />
              verify.devacademy.com
            </span>
            <span>
              Stale Refsnes
              <br />
              for devacademy.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}