import { IPassport } from 'app/shared/model/passport.model';
import { ICourse } from 'app/shared/model/course.model';
import { IReview } from 'app/shared/model/review.model';

export interface IStudent {
  id?: number;
  firstName?: string;
  lastName?: string;
  passport?: IPassport;
  courses?: ICourse[];
  reviews?: IReview[];
}

export const defaultValue: Readonly<IStudent> = {};
