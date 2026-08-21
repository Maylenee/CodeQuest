import { Play } from 'lucide-react';

export default function VideoAdCard() {
  return (
    <div className="bg-[#1a2233] rounded overflow-hidden text-white">
      <div className="p-4 flex flex-col gap-2">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <Play size={14} />
        </div>
        <p className="text-xs font-semibold">Python Variables</p>
      </div>
    </div>
  );
}