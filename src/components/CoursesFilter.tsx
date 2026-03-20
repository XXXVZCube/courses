'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import type { Course, Subjects } from '../types/course';
import { Divider, Row } from 'antd';
import CourseCard from './CourseCard';

const subjectsArr: Array<Subjects | 'all'> = [
  'all',
  'math',
  'russian',
  'physics',
  'history',
  'english',
  'chemistry',
  'biology',
  'social',
];
const gradeArr: string[] = ['all'].concat(
  Array.from({ length: 11 - 1 + 1 }, (_, i) => 1 + i).map(String),
);

const CoursesFilter: React.FC<{ courses: Course[] }> = ({ courses }) => {
  const [subject, setSubject] = useState<Subjects | 'all'>('all');
  const [grade, setGrade] = useState<string>('all');
  const [filteredCourse, setFilteredCourse] = useState<Course[]>(courses);

  useEffect(() => {
    setFilteredCourse(
      courses.filter((course) => {
        const subjectMatch = subject === 'all' || course.subject === subject;
        const gradeMatch = grade === 'all' || course.grade === Number(grade);

        return subjectMatch && gradeMatch;
      }),
    );
  }, [subject, grade, courses]);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          marginBlock: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '5px',
          }}
        >
          <label htmlFor='subject'>Предмет</label>
          <select
            name='subject'
            id='subject'
            value={subject}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSubject(e.target.value as Subjects | 'all')
            }
          >
            {subjectsArr.map((subject, index) => (
              <option value={subject} key={index}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '5px',
          }}
        >
          <label htmlFor='grade'>Класс</label>
          <select
            name='grade'
            id='grade'
            value={grade}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setGrade(e.target.value)
            }
          >
            {gradeArr.map((grade, index) => (
              <option value={grade} key={index}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Row justify='center' gutter={[24, 24]}>
        {filteredCourse.map((e) => (
          <CourseCard course={e} key={e.id} />
        ))}
      </Row>
      <Divider />
    </>
  );
};

export default CoursesFilter;
