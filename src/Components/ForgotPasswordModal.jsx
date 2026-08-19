import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotPassword } from '../Features/UserSlice'
import { ForgotPasswordSchema } from './ForgotPasswordValidation'

const ForgotPasswordModal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const { forgotPasswordLoading } = useSelector((state) => state.userDetail);

    const formik = useFormik({
        initialValues: {
            userMail: "",
        },

        validationSchema: ForgotPasswordSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(forgotPassword(values.userMail)).unwrap();

                toast.success("Password reset link sent to your email");

                resetForm();
                onHide();

            } catch (error) {
                toast.error(error || "Failed to send reset link");
            }
        },
    });

    const handleHide = () => {
        formik.resetForm();
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleHide}
            centered
            dialogClassName="custom-modal"
        >
            <form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="modal-helper-text">
                        Enter the email address linked to your account and we'll send you a link to reset your password.
                    </p>

                    <div className="mb-3">
                        <label htmlFor="forgotEmail">Email Address</label>
                        <input
                            type="email"
                            id="forgotEmail"
                            name="userMail"
                            value={formik.values.userMail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email"
                            autoFocus
                        />
                        {formik.touched.userMail && formik.errors.userMail && (
                            <p className="error-message">{formik.errors.userMail}</p>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="modal-btn" onClick={handleHide}>
                        Cancel
                    </button>
                    <button type="submit" className="modal-btn primary">
                        {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ForgotPasswordModal
