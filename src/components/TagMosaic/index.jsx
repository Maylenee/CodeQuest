export default function TagMosaic({ tags, colors }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 py-4">
      {tags.map((t, i) => {
        const color = colors[Math.floor(i / 11) % colors.length];
        return (
          <div
            key={t}
            className={`${color} text-white h-16 flex items-center justify-center text-sm font-semibold text-center px-2 cursor-pointer hover:opacity-90 rounded-lg`}
          >
            {t}
          </div>
        );
      })}
    </section>
  );
}