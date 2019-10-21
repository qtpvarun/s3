import { IStudent } from 'app/shared/model/student.model';

export interface IPassport {
  id?: number;
  number?: string;
  student?: IStudent;
}

export const defaultValue: Readonly<IPassport> = {};
