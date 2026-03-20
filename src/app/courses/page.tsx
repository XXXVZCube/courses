import { Course } from '@/types/course';

import CoursesFilter from '@/components/CoursesFilter';

export default async function CoursesPage() {
  const res = await fetch('http://localhost:3001/courses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache', // кешировать навсегда
  });
  if (!res.ok) {
    throw new Error(`Ошибка загрузки: ${res.status}`);
  }
  const courses: Course[] = await res.json();

  return <CoursesFilter courses={courses} />;
}
