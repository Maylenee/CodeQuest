import PillButton from '../../components/PillButton';

export default function SmallLangCard({ card }) {
  const textColor = card.dark ? 'text-white' : 'text-[#1a2233]';
  return (
    <div className={`${card.bg} ${textColor} p-8 flex flex-col justify-between h-full rounded-xl relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10 pointer-events-none" />
      <div className="relative">
        <h3 className="text-3xl font-black">{card.name}</h3>
        <p className="mt-2 text-sm opacity-90 max-w-[220px]">{card.tag}</p>
      </div>
      <div className="relative mt-8 flex gap-3">
        <PillButton to={card.link} className="!py-2 !px-4 !text-xs">Learn {card.name.split('.')[0]}</PillButton>
      </div>
    </div>
  );
}