import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z.string().email().min(6).max(45),
  password: z.string().min(6).max(45),
});

export type UserRegisterSchema = typeof userRegisterSchema;
