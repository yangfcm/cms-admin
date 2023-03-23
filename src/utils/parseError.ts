import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { DEFAULT_ERROR_MESSAGE } from '../settings/constants';

// This APIError type is consistent with what defined in server.
type APIError = {
  message: string;
  errors?: {
    name: string;
    message: string;
    kind: string;
    path: string;
    value: string;
  }[];
};

function parseError(error: any) {
  if (!error) return '';
  if ('data' in error) {
    return (error.data as APIError).message
  }
  if ('message' in error) {
    return error.message;
  }
  return DEFAULT_ERROR_MESSAGE;
}

export default parseError;