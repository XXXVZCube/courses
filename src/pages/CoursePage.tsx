import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchCourseById } from '../api/courses';
import type { Course } from '../types/course';

const CoursePage: React.FC = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseById(String(id));
        setCourseData(data);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Course Page</h1>
      <Link to='/'>Назад</Link>
      {courseData && (
        <div style={{ padding: '0 10px', marginBottom: '15px' }}>
          <img src={courseData.imageUrl} alt={courseData.title} />
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <h4 style={{ display: 'inline' }}>Класс:</h4>
          <span> {courseData.grade}</span>
          <br />
          <h4 style={{ display: 'inline' }}>Предмет:</h4>
          <span> {courseData.subject}</span>
          <br />
          <h4 style={{ display: 'inline' }}>Количество участников:</h4>
          <span> {courseData.studentsCount}</span>
          <br />
          <h4 style={{ display: 'inline' }}>Преподаватель:</h4>
          <span> {courseData.teacher}</span>
          <br />
        </div>
      )}
    </div>
  );
};

export default CoursePage;
