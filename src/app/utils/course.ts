import type { Subjects } from "@/types/course";

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