export default function SectionCard({
  bg,
  title,
  subtitle,
  subtitleClassName = 'mt-2 text-sm max-w-lg mx-auto',
  children,
  button,
  maxWidth = '',
  className = '',
}) {
  return (
    <section className={`${bg} ${className}`}>
      <div className={`${maxWidth} mx-auto px-6 py-16 text-center`}>
        <h2 className="text-3xl font-black">{title}</h2>
        {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
        {children}
        {button ? <div className="mt-8">{button}</div> : null}
      </div>
    </section>
  );
}