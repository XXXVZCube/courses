import React from 'react';

import type { Course, Subjects } from '../types/course';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

type RusSubjects = {
  [K in Subjects]: string;
};

export const subjectsToRus: RusSubjects = {
  math: 'Математика',
  russian: 'Русский язык',
  physics: 'Физика',
  history: 'История',
  english: 'Английский язык',
  chemistry: 'Химия',
  biology: 'Биология',
  social: 'Обществознание',
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    id,
    description,
    grade,
    imageUrl,
    studentsCount,
    subject,
    teacher,
    title,
  } = course;

  return (
    <div
      style={{ background: '#d4d4d4ff', width: '30vw', borderRadius: '15px' }}
    >
      <div>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '100%', borderRadius: '15px 15px 0 0' }}
        />
      </div>
      <div style={{ padding: '0 10px', marginBottom: '15px' }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <h4 style={{ display: 'inline' }}>Класс:</h4>
        <span> {grade}</span>
        <br />
        <h4 style={{ display: 'inline' }}>Предмет:</h4>
        <span> {subjectsToRus[subject]}</span>
        <br />
        <h4 style={{ display: 'inline' }}>Количество участников:</h4>
        <span> {studentsCount}</span>
        <br />
        <h4 style={{ display: 'inline' }}>Преподаватель:</h4>
        <span> {teacher}</span>
        <br />
      </div>
      <Link to={id}>Подробнее</Link>
    </div>
  );
};

export default CourseCard;
