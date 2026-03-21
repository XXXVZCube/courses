import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Course } from '../types/course';

import { Card, Col } from 'antd';
import CardMeta from 'antd/es/card/CardMeta';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { id, description, imageUrl, title } = course;

  return (
    <Link href={`/courses/${id}`}>
      <Col>
        <Card
          hoverable
          style={{ width: 420 }}
          cover={
            <div style={{ position: 'relative', height: '200px' }}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                style={{ objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                sizes='420px'
              />
            </div>
          }
        >
          <CardMeta
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
