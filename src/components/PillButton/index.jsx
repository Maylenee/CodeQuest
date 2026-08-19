import { Link } from 'react-router-dom';

export default function PillButton({
  children,
  variant = 'solid',
  className = '',
  to,
  onClick,
  type = 'button',
}) {
  const base =
    'text-sm font-semibold px-5 py-2.5 rounded transition-colors inline-block';
  const styles =
    variant === 'solid'
      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
      : 'bg-transparent border border-current hover:bg-white/10';
  const cls = `${base} ${styles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}