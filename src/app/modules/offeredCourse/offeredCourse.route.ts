import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.patch('/:id', validateRequest(offeredCourseValidations.updateOfferedValidationSchema), OfferedCourseControllers.updateOfferedCourse)


export const offeredCourseRoutes = router;
