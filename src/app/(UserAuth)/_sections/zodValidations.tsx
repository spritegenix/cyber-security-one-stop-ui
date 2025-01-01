import { z } from "zod";

//signUpSchema Zod schema
export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed for name"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// loginSchema Zod schema
export const loginSchema = z.object({
  loginIdentifier: z
    .string()
    .refine((val) => /\S+@\S+\.\S+/.test(val) || /^\+\d{1,3}\d{10,15}$/.test(val), {
      message: "Please enter a valid email address or phone number",
    }),
  password: z.string(),
});

// ------------------------------------------------------ //
// forgotPasswordSchema Zod schema
export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: "Invalid email address",
      }),
    phoneNumber: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 10, {
        message: "Invalid phone number",
      }),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Email is required",
    path: ["email"],
  })
  .refine((data) => data.phoneNumber || data.email, {
    message: "Phone number is required",
    path: ["phoneNumber"],
  });

// Define Zod validation schema
export const changePasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must be numeric"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
// ------------------------------------------------------ //
