export type Subjects =
  | 'all'
  | 'math'
  | 'russian'
  | 'physics'
  | 'history'
  | 'english'
  | 'chemistry'
  | 'biology'
  | 'social';

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: Subjects;
  grade: number;
  imageUrl: string;
  teacher: string;
  studentsCount: number;
}

export interface id {
  id: string;
}