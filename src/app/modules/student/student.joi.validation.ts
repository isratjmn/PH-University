import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': '{#label} should start with a capital letter',
    }),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base':
        '{#label} should only contain alphabetical characters',
    }),
});

const guardianValidatioSchema = Joi.object({
  fatherName: Joi.string().required(),
  fathersOccupation: Joi.string().required(),
  fatherContact: Joi.string().required(),
  motherName: Joi.string().required(),
  mothersOccupation: Joi.string().required(),
  motherContact: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidatioSchema.required(),
  localGuardian: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  }),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
