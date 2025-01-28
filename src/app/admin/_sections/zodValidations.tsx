import { z } from "zod";

// loginSchema Zod schema
export const loginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

// passwordChange Zod schema
export const passwordChangeSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});
