import type { AppError } from '../models/types';
import { ZodError } from 'zod';

export function toAppError(e: unknown): AppError {
  if (e instanceof ZodError) {
    return { kind: 'InvalidData', message: 'Received invalid data from server' };
  }
  if (e instanceof TypeError) {
    return { kind: 'Network', message: 'Network error while fetching data' };
  }
  if (e instanceof Error) {
    return { kind: 'Unknown', message: e.message || 'Unknown error' };
  }
  return { kind: 'Unknown', message: 'Unknown error' };
}
