import { Metadata } from 'next';

import { Course } from '@/types/course';

import CoursesFilter from '@/components/CoursesFilter';

export const metadata: Metadata = {
  title: 'Каталог курсов',
  description:
    'Образовательные курсы для обучающихся 1-11 класса и повышение квалификаций учителей',
  openGraph: {
    title: 'Каталог курсов - Дневник.ру',
    description: 'Более 100 курсов для учеников и 50 для учителей',
    type: 'website',
    url: 'https://dnevnik.ru/courses',
    images: [
      {
        url: 'https://fastly.picsum.photos/id/1057/1200/630.jpg?hmac=vx1vjPW6Gr6nz1xNd_jmL4FvQmOrSBhb8w23_dIqun0',
        width: 1200,
        height: 630,
      },
    ],
  },
};

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Каталог курсов',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: `https://dnevnik.ru/courses/${course.id}`,
    })),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursesFilter courses={courses} />
    </>
  );
}
