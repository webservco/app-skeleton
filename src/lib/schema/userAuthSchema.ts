import { z } from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email().min(6).max(45),
  password: z.string().min(6).max(45),
});

export type UserAuthSchema = typeof userAuthSchema;
