import { z } from "zod";

// Strong password validation function
const strongPasswordValidation = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!hasUpperCase) {
    return "Password must include at least one uppercase letter";
  }
  if (!hasLowerCase) {
    return "Password must include at least one lowercase letter";
  }
  if (!hasNumber) {
    return "Password must include at least one number";
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character";
  }
  return true;
};

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, "password must be at least 8 characters long"),
});
const signUpSchema = z.object({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, "name must be of min length 3 ")
    .max(255, "name must not be of 255 length"),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .refine((password) => {
      const validation = strongPasswordValidation(password);
      return validation === true;
    }, {
      message: "Password must be at least 8 characters long and include uppercase, lowercase, number and special character"
    }),
  phone: z
    .string({ required_error: "Phone no is required" })
    .min(10, "invalid phone no"),
});
const contactSchema = z.object({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, "name must be of min length 3 ")
    .max(255, "name must not be of 255 length"),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  message: z
    .string({ required_error: "please enter some message" })
    .min(3, "message must be of min 3 characters"),
});
export { signUpSchema ,loginSchema , contactSchema };
