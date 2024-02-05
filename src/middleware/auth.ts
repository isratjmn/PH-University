import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import catchAsync from '../app/utils/catchAsync';
import AppError from '../app/errors/AppError';
import httpStatus from 'http-status';
import config from '../app/config';
import { TUserRole } from '../app/modules/user/user.interface';
import { User } from '../app/modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // If the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }
    let decoded;
    try {
      // Check if the Token is Valid
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    console.log(decoded);

    const { role, userId, iat } = decoded;

    // Checking if the User is Exist
    const user = await User.isUserExistsByCustomID(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User is not Found');
    }
    // Check if the user is Already Deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted!!');
    }

    // If the User is Blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
