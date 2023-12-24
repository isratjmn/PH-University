import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});
const changePassValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is Required',
    }),
    newPassword: z.string({
      required_error: 'Password is Required',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is Required!!!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User ID is Required',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User ID is Required',
    }),
    newPassword: z.string({
      required_error: 'User Password is Required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePassValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
