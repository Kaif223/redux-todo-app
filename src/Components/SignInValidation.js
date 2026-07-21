import * as Yup from "yup";

export const SignInSchema = Yup.object({
    userMail: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});