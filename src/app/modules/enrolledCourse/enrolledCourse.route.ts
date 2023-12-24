import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrollCourseControllers } from './enrolledCourse.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrollCourseControllers.createEnrolledCourse,
);

router.patch(
  '/enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledMarksValidationSchema,
  ),
  EnrollCourseControllers.updateEnrollCourseMarks,
);

export const EnrollCourseRoutes = router;
