import { Link } from 'react-router-dom';

export default function Tile({ name, desc, svg, active, href, onClose }) {
  const content = (
    <>
      <div className="flex items-center justify-center mb-3">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <p className="text-[15px] font-bold text-slate-900">{name}</p>
      <p className="text-[12px] text-slate-500 mt-1">{desc}</p>
    </>
  );

  const cls = `border rounded-lg p-4 flex flex-col items-center text-center cursor-pointer transition-colors ${
    active ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'
  }`;

  if (href) {
    return (
      <Link to={href} onClick={onClose} className={cls}>
        {content}
      </Link>
    );
  }
  return <div className={cls}>{content}</div>;
}