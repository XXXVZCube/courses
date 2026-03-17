import type { Course } from '../types/course';

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch('http://localhost:3001/courses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('err');

  const data: Course[] = await response.json();
  return data;
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  const response = await fetch(`http://localhost:3001/courses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('error');

  const data: Course = await response.json();
  return data;
};
