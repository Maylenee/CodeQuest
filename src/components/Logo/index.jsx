import { Link } from 'react-router-dom';

export default function Logo({ className = 'text-2xl' }) {
  return (
    <Link to="/" className={`font-black ${className}`}>
      Dev<span className="text-emerald-500">Academy</span>
    </Link>
  );
}