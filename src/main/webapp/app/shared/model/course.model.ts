import { IReview } from 'app/shared/model/review.model';
import { IStudent } from 'app/shared/model/student.model';

export interface ICourse {
  id?: number;
  name?: string;
  description?: string;
  reviews?: IReview[];
  students?: IStudent[];
}

export const defaultValue: Readonly<ICourse> = {};
