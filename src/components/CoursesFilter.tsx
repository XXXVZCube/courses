import React from 'react';

import type { Subjects } from '../types/course';

type FilterValues = Subjects | 'all';

const subjectsArr: FilterValues[] = [
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

interface FilterProps {
  currSubject: string;
  currGrade: string;
  onSubjectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onGradeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CoursesFilter: React.FC<FilterProps> = ({
  currSubject,
  currGrade,
  onSubjectChange,
  onGradeChange,
}) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
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
          defaultValue={currSubject}
          onChange={onSubjectChange}
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
          defaultValue={currGrade}
          onChange={onGradeChange}
        >
          {gradeArr.map((grade, index) => (
            <option value={grade} key={index}>
              {grade}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CoursesFilter;
