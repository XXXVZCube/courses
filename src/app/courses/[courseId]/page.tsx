import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Course, id } from '@/types/course';
import { subjectsToRus } from '@/utils/course';

import { Flex, Button } from 'antd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;

  const response = await fetch(`http://localhost:3001/courses/${courseId}`);
  if (!response.ok) return { title: 'Курс не найден - Дневник.ру' };

  const courseData: Course = await response.json();
  return {
    title: `${courseData.title} - Дневник.ру`,
    description: courseData.description.slice(0, 160),
    openGraph: {
      title: courseData.title,
      description: courseData.description.slice(0, 160),
      images: [{ url: courseData.imageUrl }],
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3001/courses/ids');
  const ids: id[] = await res.json();

  return ids.map((item: id) => ({
    courseId: item.id,
  }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const res = await fetch(`http://localhost:3001/courses/${courseId}`, {
    next: { revalidate: 60 }, // перегенерировать раз в 60 секунд
  });
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Ошибка загрузки: ${res.status}`);
  }

  const courseData: Course = await res.json();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.title,
    description: courseData.description,
    provider: {
      '@type': 'Organization',
      name: 'Дневник.ру',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Flex>
        <Flex
          style={{ position: 'relative', width: '40vw', minHeight: '100vh' }}
        >
          <Image
            src={courseData.imageUrl}
            alt={courseData.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
        </Flex>

        <Flex
          vertical
          justify='space-between'
          style={{ padding: '10px 20px', width: '100%' }}
        >
          <Flex vertical gap='medium'>
            <h1>{courseData?.title}</h1>
            <p>{courseData?.description}</p>
            <Flex align='center' gap='small'>
              <h3>Класс:</h3>
              <h3>{courseData?.grade}</h3>
            </Flex>
            <Flex align='center' gap='small'>
              <h3>Предмет:</h3>
              {courseData && <h3>{subjectsToRus[courseData.subject]}</h3>}
            </Flex>
            <Flex align='center' gap='small'>
              <h3>Количество участников:</h3>
              <h3>{courseData?.studentsCount}</h3>
            </Flex>
          </Flex>
          <Flex align='center' justify='space-between'>
            <Flex gap='small'>
              <h2>Преподаватель:</h2>
              <h2>{courseData?.teacher}</h2>
            </Flex>
            <Link href='/courses'>
              <Button type='primary'>Вернуться назад</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
