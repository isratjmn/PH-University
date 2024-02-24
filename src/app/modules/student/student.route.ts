import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

//Will Call Controller Function
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  StudentControllers.getAllStudents,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
