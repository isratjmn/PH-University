import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../../middleware/auth';
const router = express.Router();

//Will Call Controller Function
router.get('/', StudentControllers.getAllStudents);

router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentControllers.getAllStudents,
);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
