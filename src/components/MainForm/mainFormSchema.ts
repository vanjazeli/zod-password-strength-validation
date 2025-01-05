import * as z from "zod";

const usernameMinLength = 6;
const passwordMinLength = 8;

export const mainFormSchema = z
  .object({
    username: z
      .string()
      .min(usernameMinLength, { message: `Username must be at least ${usernameMinLength} characters long.` })
      .regex(/^[a-z0-9._]*$/, { message: "Username contains invalid characters." }),
    email: z.string().min(1, { message: "This field is required." }).email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(passwordMinLength, { message: `Password must be at least ${passwordMinLength} characters long.` })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[A-Z]/, { message: "Password must contain at least one capital letter." }),
    confirmPassword: z.string().min(1, { message: "This field is required." }),
    termsAndConditions: z.boolean(),
    signToNewsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.termsAndConditions === true, {
    message: "This field is required.",
    path: ["termsAndConditions"],
  });
