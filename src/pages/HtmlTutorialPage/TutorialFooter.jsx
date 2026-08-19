import { YoutubeIcon, LinkedinIcon, InstagramIcon } from '../../components/SocialIcons';

const FOOTER_LINKS = [
  'Plus',
  'Spaces',
  'Get Certified',
  'For Teachers',
  'Practice',
  'Contact Us',
];

export default function TutorialFooter() {
  return (
    <>
      {/* FOOTER BANNER */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 mt-10">
        <div className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">Create a DevAcademy Account</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Ad-free learning, track your progress, earn XP, streaks,
              compete in leagues, build and host websites, unlock coding
              challenges, and much more!
            </p>
            <button
              type="button"
              className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600"
            >
              Sign Up for Free
            </button>
          </div>
          <div className="w-40 h-40 bg-white/60 rounded-full shrink-0" />
        </div>
      </section>

      <footer className="bg-[#0f1420] text-slate-300 text-sm">
        <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-black text-white">
            Dev<span className="text-emerald-500">Academy</span>
          </span>
          <div className="flex gap-6">
            {FOOTER_LINKS.map((l) => (
              <span key={l} className="hover:text-white cursor-pointer">
                {l}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <YoutubeIcon />
            <LinkedinIcon />
            <InstagramIcon />
          </div>
        </div>
      </footer>
    </>
  );
}