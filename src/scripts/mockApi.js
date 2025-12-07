const allCourses = [
  {
    id: 1,
    category: 'Marketing',
    title: 'The Ultimate Google Ads Training Course',
    price: 100,
    author: 'Jerome Bell',
    color: 'red',
  },
  {
    id: 2,
    category: 'Management',
    title: 'Product Management Fundamentals',
    price: 480,
    author: 'Marvin McKinney',
    color: 'blue',
  },
  {
    id: 3,
    category: 'HR & Recruiting',
    title: 'HR Management and Analytics',
    price: 200,
    author: 'Leslie Alexander Li',
    color: 'green',
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Brand Management & PR Communications',
    price: 530,
    author: 'Kristin Watson',
    color: 'red',
  },
  {
    id: 5,
    category: 'Design',
    title: 'Graphic Design Basic',
    price: 500,
    author: 'Guy Hawkins',
    color: 'pink',
  },
  {
    id: 6,
    category: 'Management',
    title: 'Business Development Management',
    price: 400,
    author: 'Dianne Russell',
    color: 'blue',
  },
  {
    id: 7,
    category: 'Development',
    title: 'Highload Software Architecture',
    price: 600,
    author: 'Brooklyn Simmons',
    color: 'yellow',
  },
  {
    id: 8,
    category: 'HR & Recruiting',
    title: 'Human Resources – Selection and Recruitment',
    price: 150,
    author: 'Kathryn Murphy',
    color: 'green',
  },
  {
    id: 9,
    category: 'Design',
    title: 'User Experience. Human-centered Design',
    price: 240,
    author: 'Cody Fisher',
    color: 'pink',
  },

  // Дополнительные курсы для подгрузки
  {
    id: 10,
    category: 'Marketing',
    title: 'Social Media Marketing Mastery',
    price: 320,
    author: 'Anna Wilson',
    color: 'red',
  },
  {
    id: 11,
    category: 'Development',
    title: 'Full-Stack JavaScript Developer',
    price: 750,
    author: 'Mike Chen',
    color: 'yellow',
  },
  {
    id: 12,
    category: 'HR & Recruiting',
    title: 'Talent Acquisition Strategies',
    price: 280,
    author: 'Sarah Johnson',
    color: 'green',
  },
  {
    id: 13,
    category: 'Management',
    title: 'Agile Project Management',
    price: 420,
    author: 'David Brown',
    color: 'blue',
  },
  {
    id: 14,
    category: 'Marketing',
    title: 'Content Marketing Strategy',
    price: 180,
    author: 'Emily Davis',
    color: 'red',
  },
  {
    id: 15,
    category: 'HR & Recruiting',
    title: 'Employee Engagement Workshop',
    price: 350,
    author: 'Robert Taylor',
    color: 'green',
  },
  {
    id: 16,
    category: 'Development',
    title: 'React & Node.js Bootcamp',
    price: 890,
    author: 'Alex Martinez',
    color: 'yellow',
  },
  {
    id: 17,
    category: 'HR & Recruiting',
    title: 'Compensation and Benefits Design',
    price: 410,
    author: 'Lisa Anderson',
    color: 'green',
  },
];

// Подсчёт курсов по категориям
export function getCategoryCounts() {
  const counts = { All: allCourses.length };

  allCourses.forEach((course) => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });

  return counts;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Получить курсы
export async function fetchCourses({ category = 'All', offset = 0, limit = 9 } = {}) {
  await sleep(1000);

  let filtered = allCourses;

  if (category !== 'All') {
    filtered = allCourses.filter((course) => course.category === category);
  }

  const courses = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < filtered.length;
  const total = filtered.length;

  return { courses, hasMore, total };
}

export async function fetchMoreCourses({ category = 'All', offset = 0, limit = 3 } = {}) {
  return fetchCourses({ category, offset, limit });
}
