'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { fetchCourses } from '@/api/courses';
import type { Course } from '@/types/course';

import CoursesFilter from '@/components/CoursesFilter';
import CourseCard from '@/components/CourseCard';
import { Button, Result, Spin, Divider, Row } from 'antd';

const CoursesPage = () => {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  const [currSubject, setCurrSubject] = useState<string>('all');
  const [currGrade, setCurrGrade] = useState<string>('all');

  useEffect(() => {
    const fetchCurrCourses = async () => {
      setIsLoading(true);
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) => {
        const gradeMatch =
          currGrade === 'all' || course.grade === Number(currGrade);
        const subjectMatch =
          currSubject === 'all' || course.subject === currSubject;
        return gradeMatch && subjectMatch;
      }),
    );
  }, [currGrade, currSubject, courses]);

  if (isLoading) {
    return <Spin description='Загрузка...' />;
  }
  if (error) {
    return (
      <Result
        status='error'
        title={error.message}
        subTitle='Sorry, something went wrong.'
        extra={
          <Button type='primary' onClick={() => router.push('/')}>
            Go back
          </Button>
        }
      />
    );
  }

  return (
    <>
      <CoursesFilter
        currGrade={currGrade}
        currSubject={currSubject}
        onGradeChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrGrade(e.target.value)
        }
        onSubjectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrSubject(e.target.value)
        }
      />
      <Divider />
      <Row justify='center' gutter={[24, 24]}>
        {filteredCourses.map((e) => (
          <CourseCard course={e} key={e.id} />
        ))}
      </Row>
      <Divider />
    </>
  );
};

export default CoursesPage;
