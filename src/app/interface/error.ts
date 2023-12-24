export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorresponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
