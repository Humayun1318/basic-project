import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TUserName,
  StudentModel,
  StudentModelInterface,
} from './student/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'You should have first name, So put it and try again '],
    trim: true,
    maxlength: [20, 'name will be the must within "20" character'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'You should have last name, So put it and try again '],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [
      true,
      'You have to must put the fatherName name, So put it and try again ',
    ],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [
      true,
      'You have to must put the father  occupation, So put it and try again ',
    ],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [
      true,
      'You have to must put the fatherContactNo, So put it and try again ',
    ],
    trim: true,
  },
  motherName: {
    type: String,
    required: [
      true,
      'You have to must put the motherName name, So put it and try again ',
    ],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [
      true,
      'You have to must put the mother occupation, So put it and try again ',
    ],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [
      true,
      'You have to must put the motherContactNo, So put it and try again ',
    ],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      'You have to must put thr local guardian name, So put it and try again ',
    ],
    trim: true,
  },
  occupation: {
    type: String,
    required: [
      true,
      'You have to must put thr local guardian occupation, So put it and try again ',
    ],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [
      true,
      'You have to must put thr local guardian contactNo, So put it and try again ',
    ],
    trim: true,
  },
  address: {
    type: String,
    required: [
      true,
      'You have to must put thr local guardian address, So put it and try again ',
    ],
  },
});

const studentSchema = new Schema<TStudent, StudentModelInterface>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id must be required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'You should have name  property compulsory'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          'Gender must be following this either, "male", "female", "other" but you are trying to put this "{VALUE}" which is incorrect.',
      },
      required: [
        true,
        'You have to must put the gender property, So put it and try again ',
      ],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [
        true,
        'You have to must put the email, So put it and try again ',
      ],
      unique: true,
      trim: true,
    },
    contact: {
      type: String,
      required: [
        true,
        'You have to must put the contact, So put it and try again ',
      ],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [
        true,
        'You have to must put the emergencyContactNo, So put it and try again ',
      ],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [
        true,
        'You have to must put the presentAddress, So put it and try again ',
      ],
    },
    permanentAddress: {
      type: String,
      required: [
        true,
        'You have to must put the permanentAddress, So put it and try again ',
      ],
    },
    guardian: {
      type: guardianSchema,
      required: [
        true,
        'You have to must put the guardian property, So put it and try again ',
      ],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [
        true,
        'You have to must put the localGuardian property, So put it and try again ',
      ],
    },
    profileImg: { type: String },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
});



// query middleware
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

// creating static method
studentSchema.statics.isUsersExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//create model
export const Student = model<TStudent, StudentModelInterface>(
  'Student',
  studentSchema,
);
