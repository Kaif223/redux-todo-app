import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { ChangePasswordSchema } from './ChangePasswordValidation'
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "./../Features/UserSlice";
import { toast } from 'react-toastify'


const ChangePasswordModal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const { passwordChanging } = useSelector(
        (state) => state.userDetail
    );


    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },

        validationSchema: ChangePasswordSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(
                    changePassword({
                        currentPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    })
                ).unwrap();

                toast.success("Password changed successfully");

                resetForm();
                onHide();

            } catch (error) {
                toast.error(error || "Failed to change password");
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
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter current password"
                            autoFocus
                        />
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <p className="error-message mt-2">{formik.errors.currentPassword}</p>
                        )}
                    </div>

                    <div className="mb-3">
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
                            <p className="error-message mt-2">{formik.errors.newPassword}</p>
                        )}
                    </div>

                    <div className="mb-3">
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
                            <p className="error-message mt-2">{formik.errors.confirmNewPassword}</p>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="modal-btn" onClick={handleHide}>
                        Cancel
                    </button>
                    <button type="submit" className="modal-btn primary">
                        {passwordChanging ? "Updating..." : "Update Password"}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ChangePasswordModal
