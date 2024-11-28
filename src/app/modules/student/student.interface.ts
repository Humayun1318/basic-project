import { Model,Types,  } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contact: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  avatar?: string;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDelete: boolean;
};

//for creating static
export interface StudentModelInterface extends Model<TStudent> {
  isUsersExist(id: string): Promise<TStudent | null>;
}

//for creating customs instance method
// export type StudentMethods = {
//   isUsersExist(id: string): Promise<TStudent | null> ;
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;
