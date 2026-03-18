'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { fetchCourseById } from '@/api/courses';
import type { Course } from '@/types/course';

import { subjectsToRus } from '@/components/CourseCard';

import { Flex, Spin, Result, Splitter, Button } from 'antd';

const CoursePage = () => {
  const params = useParams();

  const router = useRouter();

  const [courseData, setCourseData] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [sizes, setSizes] = useState<(number | string)[]>(['30%', '50%']);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseById(String(params.courseId));
        setCourseData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(e as string);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.courseId]);

  if (loading) return <Spin description='Загрузка...' />;
  if (error)
    return (
      <Result
        title={error}
        extra={
          <Link href='/courses'>
            <Button type='primary'>Вернуться назад</Button>
          </Link>
        }
      />
    );

  return (
    <Flex>
      <Splitter onResize={setSizes} style={{ minHeight: '100vh' }}>
        <Splitter.Panel size={sizes[0]}>
          <img
            src={courseData?.imageUrl}
            alt={courseData?.title}
            style={{ height: '100vh', objectFit: 'cover', overflow: 'hidden' }}
          />
        </Splitter.Panel>
        <Splitter.Panel
          size={sizes[1]}
          min={700}
          style={{
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Flex vertical>
            <h1>{courseData?.title}</h1>
            <p>{courseData?.description}</p>
            <Flex align='center' gap='small'>
              <h3>Класс:</h3>
              <h3>{courseData?.grade}</h3>
            </Flex>
            <Flex align='center' gap='small'>
              <h3>Предмет:</h3>
              <h3>{courseData?.subject}</h3>
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
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export default CoursePage;
