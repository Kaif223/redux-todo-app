import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useFormik } from 'formik'
import { signinUser } from '../Features/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SignInSchema } from '../Components/SignInValidation'

// Static Sign In page — presentational only, no state/handlers.
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [error, setError] = useState("")
    const error = useSelector(state => {
        return state.userDetail.error;
    })

    const handleSubmit = async (values) => {
        try {
            const hamm = await dispatch(signinUser(values)).unwrap()
            navigate("/")
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }
    }
    const formik = useFormik({
        initialValues: {
            userMail: "",
            password: "",
        },

        validationSchema: SignInSchema,
        onSubmit: handleSubmit,
    })
    return (
        <section className="main-section auth-section">
            <div className="auth-card">
                <h1 className="title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to continue</p>

                <form
                    onSubmit={formik.handleSubmit}
                    className="auth-form">
                    <label htmlFor="signinEmail">Email Address</label>
                    <input
                        type="email"
                        id="signinEmail"
                        name="userMail"
                        value={formik.values.userMail}
                        onChange={formik.handleChange}
                        placeholder="Enter your email"
                    />
                    {formik.touched.userMail && formik.errors.userMail && (
                        <p className='error-message'>{formik.errors.userMail}</p>
                    )}

                    <label htmlFor="signinPassword">Password</label>
                    <input
                        type="password"
                        id="signinPassword"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter your password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className='error-message'>{formik.errors.password}</p>
                    )}

                    <div className="auth-options-row">
                        <label className="remember-me" htmlFor="rememberMe">
                            <input type="checkbox" id="rememberMe" />
                            Remember me
                        </label>
                        <span className="forgot-link">Forgot password?</span>
                    </div>

                    <button type="submit" className="cutom-btn blue auth-submit-btn">
                        Sign In
                    </button>
                </form>

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
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </section>
    )
}

export default SignIn
