import { Link } from 'react-router-dom';

export default function Logo({ className = 'h-5 w-auto' }) {
  return (
    <Link to="/" className={className} aria-label="CodeLearn Home">
      <img src="/logo.png" alt="CodeLearn Logo" className="h-full w-auto" />
    </Link>
  );
}
