import React from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resetPassword } from '../Features/UserSlice'
import { ResetPasswordSchema } from '../Components/ResetPasswordValidation'

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetPasswordLoading } = useSelector(
        (state) => state.userDetail
    );

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmNewPassword: "",
        },

        validationSchema: ResetPasswordSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(
                    resetPassword({
                        token,
                        newPassword: values.newPassword,
                    })
                ).unwrap();

                toast.success("Password reset successfully");

                resetForm();

                navigate("/signin");

            } catch (error) {
                toast.error(
                    error || "Failed to reset password"
                );
            }
        },
    });
    return (
        <section className="main-section auth-section">
            <div className="auth-card">
                <h1 className="title">Reset Password</h1>
                <p className="auth-subtitle">Enter a new password for your account</p>

                <form onSubmit={formik.handleSubmit} className="auth-form">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter new password"
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <p className="error-message">{formik.errors.newPassword}</p>
                    )}

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Re-enter new password"
                    />
                    {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                        <p className="error-message">{formik.errors.confirmNewPassword}</p>
                    )}

                    <button type="submit" className="cutom-btn blue auth-submit-btn" disabled={resetPasswordLoading}>
                        {resetPasswordLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Remembered your password? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </section>
    )
}

export default ResetPassword
