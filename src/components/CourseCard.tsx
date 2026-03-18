import React from 'react';

import type { Course, Subjects } from '../types/course';
import Link from 'next/link';

import { Card, Col } from 'antd';
const { Meta } = Card;

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
  const { id, description, imageUrl, title } = course;

  return (
    <Link href={`/courses/${id}`}>
      <Col>
        <Card
          hoverable
          style={{ width: 420 }}
          cover={<img draggable={false} alt={title} src={imageUrl} />}
        >
          <Meta
            title={title}
            description={description}
            style={{ marginBottom: 10 }}
          />
        </Card>
      </Col>
    </Link>
  );
};

export default CourseCard;
