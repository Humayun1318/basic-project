import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be within 20 characters')
    .min(1, 'First name is required')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required').trim(),
  fatherOccupation: z.string().min(1, 'Father occupation is required').trim(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number format')
    .trim(),
  motherName: z.string().min(1, 'Mother name is required').trim(),
  motherOccupation: z.string().min(1, 'Mother occupation is required').trim(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number format')
    .trim(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required').trim(),
  occupation: z.string().min(1, 'Local guardian occupation is required').trim(),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number format')
    .trim(),
  address: z.string().min(1, 'Local guardian address is required').trim(),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    invalid_type_error: 'Gender must be either "male", "female", or "other"',
  }),
  dateOfBirth: z.string(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .trim(),
  contact: z
    .string()
    .min(1, 'Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number format')
    .trim(),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number format')
    .trim(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required').trim(),
  permanentAddress: z.string().min(1, 'Permanent address is required').trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z
    .string()
    .url()
    .optional()
    .refine((value) => !value || value.trim() === value, {
      message: 'Invalid URL: contains leading or trailing spaces',
    }),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDelete: z.boolean(),
});

export default studentValidationSchema;
