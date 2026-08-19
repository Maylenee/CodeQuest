import { createClient } from '@libsql/client';
import { EXERCISES } from '../src/data/htmlExercises.js';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env');
  process.exit(1);
}

const db = createClient({ url, authToken });

const ulid = () =>
  `${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 10)}`;

const TRACKS = [
  {
    slug: 'html',
    name: 'HTML',
    tagline: 'The language for building web pages',
    color: '#C8492B',
    sort_order: 1,
  },
  {
    slug: 'css',
    name: 'CSS',
    tagline: 'The language for styling web pages',
    color: '#F2CF4A',
    sort_order: 2,
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    tagline: 'The language for programming web pages',
    color: '#1A2233',
    sort_order: 3,
  },
  {
    slug: 'python',
    name: 'Python',
    tagline: 'A popular programming language',
    color: '#EFE7D8',
    sort_order: 4,
  },
  {
    slug: 'sql',
    name: 'SQL',
    tagline: 'A language for accessing databases',
    color: '#A9DDD6',
    sort_order: 5,
  },
  {
    slug: 'java',
    name: 'Java',
    tagline: 'A popular programming language',
    color: '#E8734A',
    sort_order: 6,
  },
  {
    slug: 'php',
    name: 'PHP',
    tagline: 'A server-side programming language',
    color: '#8A6FA5',
    sort_order: 7,
  },
];

const HTML_QUIZ = [
  { q: 'HTML stands for -', options: JSON.stringify(['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these']), a: 0 },
  { q: 'The correct sequence of HTML tags for starting a webpage is -', options: JSON.stringify(['HTML, Head, Title, Body', 'HTML, Body, Title, Head', 'HTML, Head, Body, Title', 'HTML, Title, Head, Body']), a: 0 },
  { q: 'Which of the following element is responsible for making the text bold in HTML?', options: JSON.stringify(['<pre>', '<a>', '<b>', '<br>']), a: 2 },
  { q: 'Which tag is used to display text in italic?', options: JSON.stringify(['<i>', '<italic>', '<em>', 'Both a and c']), a: 3 },
  { q: 'Which of the following is a paragraph tag?', options: JSON.stringify(['<p>', '<para>', '<paragraph>', '<ptext>']), a: 0 },
  { q: 'The <hr> tag in HTML is used for -', options: JSON.stringify(['horizontal ruler', 'new line', 'new paragraph', 'vertical ruler']), a: 0 },
  { q: 'Which attribute is used to specify an inline style?', options: JSON.stringify(['style', 'class', 'id', 'color']), a: 0 },
  { q: 'What is the correct HTML for making a text input field?', options: JSON.stringify(['<input type="text">', '<textfield>', '<input text>', '<text>']), a: 0 },
  { q: 'What is the correct HTML for adding a background color?', options: JSON.stringify(['<body bg="yellow">', '<background>yellow</background>', '<body style="background-color:yellow;">', '<body color="yellow">']), a: 2 },
  { q: 'Choose the correct HTML element to define important text:', options: JSON.stringify(['<b>', '<i>', '<important>', '<strong>']), a: 3 },
  { q: 'Choose the correct HTML element to define emphasized text:', options: JSON.stringify(['<italic>', '<i>', '<em>', '<important>']), a: 2 },
  { q: 'What is the correct HTML for creating a hyperlink?', options: JSON.stringify(['<a href="http://www.example.com">Example</a>', '<a url="http://www.example.com">Example</a>', '<a>http://www.example.com</a>', '<a name="http://www.example.com">Example</a>']), a: 0 },
  { q: 'Which character is used to indicate an end tag?', options: JSON.stringify(['^', '<', '*', '/']), a: 3 },
  { q: 'Which HTML attribute is used to define inline styles?', options: JSON.stringify(['Style', 'Class', 'Font', 'Styles']), a: 0 },
  { q: 'Which of the following is a block-level element?', options: JSON.stringify(['<span>', '<div>', '<img>', '<a>']), a: 1 },
  { q: 'Which HTML element defines the title of a document?', options: JSON.stringify(['<meta>', '<head>', '<title>', '<header>']), a: 2 },
  { q: 'How can you make a list that lists its items with bullets?', options: JSON.stringify(['<list>', '<ol>', '<ul>', '<dl>']), a: 2 },
  { q: 'How can you make a numbered list?', options: JSON.stringify(['<dl>', '<ol>', '<ul>', '<list>']), a: 1 },
  { q: 'What is the correct HTML for inserting an image?', options: JSON.stringify(['<img href="image.gif">', '<image src="image.gif">', '<img src="image.gif">', '<img alt="image.gif">']), a: 2 },
  { q: 'How do you create a checkbox?', options: JSON.stringify(['<input type="check">', '<checkbox>', '<input type="checkbox">', '<check>']), a: 2 },
  { q: 'Which HTML attribute specifies an alternate text for an image?', options: JSON.stringify(['title', 'src', 'alt', 'longdesc']), a: 2 },
  { q: 'How do you select an element with a specific id?', options: JSON.stringify(['.id', '#id', 'element', '*id']), a: 1 },
  { q: 'Inside which HTML element do we put the JavaScript?', options: JSON.stringify(['<scripting>', '<javascript>', '<script>', '<js>']), a: 2 },
  { q: 'In HTML, which attribute is used to specify that an input field must be filled out?', options: JSON.stringify(['required', 'placeholder', 'fill', 'validate']), a: 0 },
  { q: 'Which input type defines a hidden input field?', options: JSON.stringify(['hidden', 'visible', 'invisible', 'none']), a: 0 },
  { q: 'What does CSS stand for?', options: JSON.stringify(['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets']), a: 2 },
  { q: 'Which property is used to change the text color?', options: JSON.stringify(['text-color', 'font-color', 'background-color', 'color']), a: 3 },
  { q: 'What is the correct CSS syntax to make all the paragraphs bold?', options: JSON.stringify(['p {text-size:bold}', 'p {font-weight:bold}', '<p style="text-size:bold">', '<p style="font-size:bold">']), a: 1 },
  { q: 'Which HTML element is used to specify a footer for a document?', options: JSON.stringify(['<footer>', '<bottom>', '<section>', '<end>']), a: 0 },
  { q: 'How do you make a comment in HTML?', options: JSON.stringify(['// comment', '<!-- comment -->', '/* comment */', '# comment']), a: 1 },
  { q: 'Which tag is used to create a dropdown list?', options: JSON.stringify(['<list>', '<dropdown>', '<select>', '<option>']), a: 2 },
  { q: 'Which HTML element defines a navigation link?', options: JSON.stringify(['<nav>', '<navigation>', '<link>', '<menubar>']), a: 0 },
  { q: 'What is the correct HTML element for the largest heading?', options: JSON.stringify(['<heading>', '<h6>', '<h1>', '<head>']), a: 2 },
  { q: 'Which tag is used to define a table row?', options: JSON.stringify(['<tr>', '<td>', '<row>', '<table>']), a: 0 },
  { q: 'Which tag is used to define a table cell?', options: JSON.stringify(['<th>', '<td>', '<cell>', '<tr>']), a: 1 },
  { q: 'Which attribute is used to open a link in a new tab?', options: JSON.stringify(['target="_blank"', 'href="_new"', 'rel="new"', 'open="new"']), a: 0 },
  { q: 'What is the correct HTML element for inserting a line break?', options: JSON.stringify(['<lb>', '<break>', '<br>', '<hr>']), a: 2 },
  { q: 'Which HTML element is used to display a scalar measurement?', options: JSON.stringify(['<meter>', '<measure>', '<range>', '<gauge>']), a: 0 },
  { q: 'Which HTML element defines preformatted text?', options: JSON.stringify(['<pre>', '<code>', '<block>', '<format>']), a: 0 },
  { q: 'What is the default display value of a <span> element?', options: JSON.stringify(['block', 'inline', 'flex', 'grid']), a: 1 },
];

async function main() {
  console.log(`Seeding ${url} ...`);

  // Tracks
  for (const t of TRACKS) {
    await db.execute(
      'INSERT INTO tracks (id, slug, name, tagline, color, sort_order) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING',
      [ulid(), t.slug, t.name, t.tagline, t.color, t.sort_order]
    );
  }
  console.log(`  tracks: ${TRACKS.length}`);

  // HTML lessons
  const htmlLessonTitles = [
    'HTML HOME', 'HTML Introduction', 'HTML Editors', 'HTML Basic', 'HTML Elements',
    'HTML Attributes', 'HTML Headings', 'HTML Paragraphs', 'HTML Styles',
    'HTML Formatting', 'HTML Quotations', 'HTML Comments', 'HTML Colors', 'HTML CSS',
  ];
  const { rows: htmlTrack } = await db.execute("SELECT id FROM tracks WHERE slug = 'html'");
  const htmlTrackId = htmlTrack[0].id;
  for (const [i, t] of htmlLessonTitles.entries()) {
    await db.execute(
      'INSERT INTO lessons (id, track_id, slug, title, sort_order) VALUES (?, ?, ?, ?, ?) ON CONFLICT(track_id, slug) DO NOTHING',
      [ulid(), htmlTrackId, t.toLowerCase().replace(/[^a-z0-9]+/g, '-'), t, i + 1]
    );
  }
  console.log(`  lessons (html): ${htmlLessonTitles.length}`);

  // Exercises from frontend htmlExercises.js
  let seq = 0;
  let exerciseCount = 0;
  for (const group of EXERCISES) {
    for (let n = 1; n <= group.count; n++) {
      const slug = `${group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${n}`;
      await db.execute(
        'INSERT INTO exercises (id, track_id, group_name, slug, title, sort_order) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(track_id, slug) DO NOTHING',
        [ulid(), htmlTrackId, group.name, slug, `${group.name} Exercise ${n}`, ++seq]
      );
      exerciseCount++;
    }
  }
  console.log(`  exercises (html): ${exerciseCount}`);

  // HTML quiz (40 questions)
  const quizTrack = await db.execute("SELECT id FROM tracks WHERE slug = 'html'");
  for (const [i, item] of HTML_QUIZ.entries()) {
    await db.execute(
      'INSERT INTO quizzes (id, track_id, question, options, answer_index, sort_order) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(track_id, question) DO NOTHING',
      [ulid(), quizTrack.rows[0].id, item.q, item.options, item.a, i + 1]
    );
  }
  console.log(`  quizzes (html): ${HTML_QUIZ.length}`);

  // Demo user + certificate example
  const userId = 'user-demo-1';
  await db.execute(
    'INSERT INTO users (id, email, password_hash, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO NOTHING',
    [userId, 'demo@devacademy.com', 'not-a-real-hash', 'Lukman', 'Hakim', 'Lukman Hakim']
  );
  await db.execute(
    'INSERT INTO user_stats (user_id, streak_current, streak_best, total_xp, lessons_done, exercises_done, quizzes_done, last_active_at) VALUES (?, 3, 5, 120, 8, 12, 1, ?) ON CONFLICT(user_id) DO NOTHING',
    [userId, new Date().toISOString()]
  );
  console.log('  users: demo@devacademy.com');

  // Achievements
  const ACHIEVEMENTS = [
    { slug: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', xp: 10 },
    { slug: 'first-exercise', title: 'Code Driller', description: 'Complete your first exercise', xp: 10 },
    { slug: 'streak-3', title: 'On Fire', description: 'Keep a 3-day learning streak', xp: 30 },
    { slug: 'streak-7', title: 'Week Warrior', description: 'Keep a 7-day learning streak', xp: 70 },
    { slug: 'quiz-100', title: 'Quiz Master', description: 'Score 100% on any quiz', xp: 50 },
    { slug: 'exercise-10', title: 'Practice Makes Perfect', description: 'Complete 10 exercises', xp: 40 },
    { slug: 'cert-html', title: 'Certified Coder', description: 'Earn your first certificate', xp: 100 },
  ];
  for (const a of ACHIEVEMENTS) {
    await db.execute(
      'INSERT INTO achievements (id, slug, title, description, xp_reward) VALUES (?, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING',
      [a.slug, a.slug, a.title, a.description, a.xp]
    );
  }
  console.log(`  achievements: ${ACHIEVEMENTS.length}`);

  console.log('Seed done.');
  await db.close();
}

main().catch((err) => {
  console.error(err);
  db.close();
  process.exit(1);
});