import React, { useState, useEffect } from 'react';

import { fetchCourses } from '../api/courses';
import type { Course } from '../types/course';

import CoursesFilter from '../components/CoursesFilter';
import CourseCard from '../components/CourseCard';

const CoursesPage: React.FC = () => {
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
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </h1>
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Error {error.message}
        </h1>
      </div>
    );
  }

  return (
    <div>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          rowGap: '15px',
          justifyItems: 'center',
        }}
      >
        {filteredCourses.map((e) => (
          <CourseCard course={e} key={e.id} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
