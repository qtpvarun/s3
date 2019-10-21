import { ICourse } from 'app/shared/model/course.model';
import { IStudent } from 'app/shared/model/student.model';

export interface IReview {
  id?: number;
  rating?: number;
  subject?: string;
  description?: string;
  course?: ICourse;
  student?: IStudent;
}

export const defaultValue: Readonly<IReview> = {};
