export type ResponseErrorType = {
  message: string;
};

export type ApiResponseSuccessType<T = Record<string, unknown>> = {
  message: string;
} & T;

export type ApiResponse<Data = Record<string, unknown>, Error = ResponseErrorType> =
  | { success: true; data: Data }
  | { success: false; error: Error };
