import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorresponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorresponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
