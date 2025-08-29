import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty("Email is required")
    .email("Must be a valid email")
    .default(""), // ensures undefined becomes empty string
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .default(""), // ensures undefined becomes empty string
});

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),
    last_name: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Enter a valid email")
      .toLowerCase(),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirm_password: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
