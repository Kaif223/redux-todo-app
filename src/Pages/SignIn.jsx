import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

// Static Sign In page — presentational only, no state/handlers.
const SignIn = () => {
    return (
        <section className="main-section auth-section">
            <div className="auth-card">
                <h1 className="title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to continue</p>

                <div className="auth-form">
                    <label htmlFor="signinEmail">Email Address</label>
                    <input type="email" id="signinEmail" placeholder="Enter your email" />

                    <label htmlFor="signinPassword">Password</label>
                    <input type="password" id="signinPassword" placeholder="Enter your password" />

                    <div className="auth-options-row">
                        <label className="remember-me" htmlFor="rememberMe">
                            <input type="checkbox" id="rememberMe" />
                            Remember me
                        </label>
                        <span className="forgot-link">Forgot password?</span>
                    </div>

                    <button type="button" className="cutom-btn blue auth-submit-btn">
                        Sign In
                    </button>
                </div>

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
