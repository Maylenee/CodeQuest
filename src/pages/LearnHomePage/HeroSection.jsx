import { Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#1a2233] text-white">
      <div className="px-6 py-16 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black leading-tight">Learn to Code</h1>
            <p className="mt-3 text-slate-300 max-w-md">
              Free tutorials, courses and references. We do our best to keep
              things fair and balanced, in order to help you make the best
              choice for you.
            </p>
            <div className="mt-6 flex justify-center md:justify-start flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <span>Free Tutorials</span>
              <span>References</span>
              <span>Exercises</span>
              <span>Certificates</span>
              <span>Videos</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 shrink-0">
            <div className="w-14 h-14 rounded-full border-2 border-slate-500 flex items-center justify-center">
              <Play size={20} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-300 font-semibold">No Upcoming Event</p>
          </div>
        </div>
      </div>
    </section>
  );
}