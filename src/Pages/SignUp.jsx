import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { signupUser } from '../Features/UserSlice'
import { Form, Formik, useFormik } from 'formik'
import { SignupSchema } from '../Components/SignUpValidation'
import { useDispatch, useSelector } from 'react-redux'


// Static Sign Up page — presentational only, no state/handlers.
const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [error, setError] = useState("")
    const error = useSelector(state => {
        return state.userDetail.error;
    })

    const handleSubmit = async (values) => {
        try {
            const hamm = await dispatch(signupUser(values)).unwrap()
            navigate("/signin")
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }
    }
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            userMail: "",
            password: "",
            confirmPassword: ""
        },

        validationSchema: SignupSchema,
        onSubmit: handleSubmit,
    })



    return (
        <section className="main-section auth-section">
            <div className="auth-card">
                <h1 className="title">Create Account</h1>
                <p className="auth-subtitle">Sign up to get started</p>

                <form
                    onSubmit={formik.handleSubmit}
                    className="auth-form"
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                placeholder="Enter your first name"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="error-message">{formik.errors.firstName}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                placeholder="Enter your last name"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="error-message">{formik.errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        placeholder="Choose a username"
                    />
                    {formik.touched.userName && formik.errors.userName && (
                        <p className="error-message">{formik.errors.userName}</p>
                    )}
                    <label htmlFor="signupEmail">Email Address</label>
                    <input
                        type="email"
                        id="signupEmail"
                        name="userMail"
                        value={formik.values.userMail}
                        onChange={formik.handleChange}
                        placeholder="Enter your email"
                    />
                    {formik.touched.userMail && formik.errors.userMail && (
                        <p className="error-message">{formik.errors.userMail}</p>
                    )}
                    <label htmlFor="signupPassword">Password</label>
                    <input
                        type="password"
                        id="signupPassword"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Create a password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error-message">{formik.errors.password}</p>
                    )}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        placeholder="Re-enter your password"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="error-message">{formik.errors.confirmPassword}</p>
                    )}
                    <button type="submit" className="cutom-btn blue auth-submit-btn">
                        Sign Up
                    </button>
                </form>
                {error &&
                    <p className="auth-error">Something went wrong. Please check your details and try again.</p>
                }

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <div className="social-buttons">
                    <button type="button" className="social-btn">
                        <FcGoogle /> Continue with Google
                    </button>
                    <button type="button" className="social-btn">
                        <FaFacebook color="#1877F2" /> Continue with Facebook
                    </button>
                </div>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp
