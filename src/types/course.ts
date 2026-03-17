export type Subjects =
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