import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function MainCard({
  href = '/learn/html',
  heading,
  subtitle,
  buttonText,
  onClose,
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-6 flex-1 flex flex-col items-center text-center">
      <div className="mb-3">
        <Logo className="text-2xl" />
      </div>
      <h3 className="text-[18px] font-bold text-slate-900 mb-2">{heading}</h3>
      <p className="text-[13px] text-slate-500 mb-4">{subtitle}</p>
      <Link
        to={href}
        onClick={onClose}
        className="mt-auto bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm w-full max-w-[180px] text-center"
      >
        {buttonText}
      </Link>
    </div>
  );
}