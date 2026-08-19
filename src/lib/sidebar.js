export function buildSidebarItems({
  lessons,
  slug,
  name,
  quizzes,
  exercises,
  references,
  lessonSlug,
}) {
  const items = [];
  let current = null;
  let firstGroup = true;
  for (const l of lessons) {
    const g = l.lesson_group || current || `${name} Tutorial`;
    if (g !== current) {
      if (firstGroup) {
        firstGroup = false;
      } else {
        items.push({ type: 'group', label: g });
      }
      current = g;
    }
    items.push({
      label: l.title,
      link: `/learn/${slug}/${l.slug}`,
      active: lessonSlug ? l.slug === lessonSlug : false,
    });
  }

  const linkItems = [
    { label: `${name} Examples`, link: `/learn/${slug}/examples` },
    { label: `${name} Exercises`, link: `/learn/${slug}/exercises` },
    { label: `${name} Quiz`, link: `/learn/${slug}/quiz` },
  ].filter((it) => {
    if (it.label.includes('Quiz') && !quizzes.length) return false;
    if (it.label.includes('Exercises') && !exercises.length) return false;
    return true;
  });
  if (linkItems.length) {
    items.push({ type: 'group', label: `${name} Practice` });
    items.push(...linkItems);
  }
  if (references.length) {
    items.push({ type: 'group', label: `${name} References` });
    items.push(...references.map((r) => ({ label: r.title })));
  }
  return items;
}
