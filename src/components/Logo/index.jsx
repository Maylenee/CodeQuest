import { Link } from 'react-router-dom';

export default function Logo({ className = 'h-5 w-auto' }) {
  return (
    <Link to="/" className={className} aria-label="CodeQuest Home">
      <img src="/logo.png" alt="CodeQuest Logo" className="h-full w-auto" />
    </Link>
  );
}