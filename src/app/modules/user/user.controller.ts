import { NextFunction, Request, Response } from "express";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";




const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //create a schema validation using Zod
    const { password, student: studentData } = req.body;
    // const zodValidateData = userValidation.userValidationSchema.parse(studentData);

    //will call the service function
    const result = await UserService.createStudentIntoDB(password, studentData);
    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
   next(err)
  }
};


export const UserControllers = {
  createStudent,
}