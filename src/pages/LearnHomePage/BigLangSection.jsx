import { useNavigate } from 'react-router-dom';
import PillButton from '../../components/PillButton';
import CodePanel from '../../components/CodePanel';

export default function BigLangSection({ card, nextBg }) {
  const textColor = card.dark ? 'text-white' : card.text || 'text-white';
  const isLink = Boolean(card.link);
  const navigate = useNavigate();
  const goLearn = () => {
    if (card.link) navigate(card.link);
  };
  return (
    <section
      className={`${card.bg} ${textColor} ${isLink ? 'cursor-pointer' : ''}`}
      onClick={goLearn}
    >
      <div className="px-6 py-16 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-6xl font-black tracking-tight">{card.name}</h2>
            <p className="mt-3 text-lg opacity-90 max-w-xs mx-auto md:mx-0">{card.tag}</p>
            <div className="mt-6 flex justify-center md:justify-start gap-3">
              <PillButton to={card.link}>Learn {card.name.split(' ')[0]}</PillButton>
              <PillButton
                variant="outline"
                onClick={(e) => e.stopPropagation()}
              >
                {card.name} Reference
              </PillButton>
            </div>
            <p className="mt-4 text-sm font-semibold underline underline-offset-2 cursor-pointer">
              {card.name} Certificate »
            </p>
          </div>
          <div className="flex justify-center shrink-0">
            <div className="w-80 sm:w-96">
              <CodePanel dark={card.dark || card.bg.includes('1a2233')} lines={card.example} />
            </div>
          </div>
        </div>
      </div>
      <svg
        className="block w-full h-12 md:h-16"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill={nextBg}
        aria-hidden="true"
      >
        <path d="M0,48 C180,80 360,0 540,24 C720,48 900,88 1080,56 C1260,24 1350,36 1440,52 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}