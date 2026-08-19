import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUser, FiMail, FiEdit2, FiCheck, FiLock } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import profileAvatar from '../Assets/images/profile-avatar.svg'
import { uploadImage, updateMyProfile } from '../Features/UserSlice'
import ChangePasswordModal from '../Components/ChangePasswordModal'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const Profile = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // Static popup — only toggles visibility, no form wiring/API call.
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const { currentUser, profileSaving, imageUploading } = useSelector((state) => state.userDetail)

    const isImageSaving = imageUploading || profileSaving;

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        e.target.value = "";
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please choose an image file.");
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            toast.error("Image must be 2MB or smaller.");
            return;
        }
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const handleProfileUpdate = async () => {
        if (!image) return;
        try {
            const uploadResponse = await dispatch(
                uploadImage(image)
            ).unwrap();

            await dispatch(updateMyProfile({
                profileImage: {
                    url: uploadResponse.imageUrl,
                    publicId: uploadResponse.publicId
                }
            })).unwrap();

            URL.revokeObjectURL(imagePreview);

            setImage(null);
            setImagePreview(null);

            toast.success("Profile image updated.");

        } catch (error) {

            toast.error(error || "Could not update the profile image.");

        }
    }
    return (
        <section className="main-section">
            {image && (
                <button
                    type="button"
                    className="profile-save-btn"
                    onClick={handleProfileUpdate}
                    disabled={isImageSaving}
                >
                    {isImageSaving
                        ? <ClipLoader color="#fff" size={13} />
                        : <FiCheck />}
                    <span>{isImageSaving ? "Saving..." : "Save Image"}</span>
                </button>
            )}

            <div className="profile-card">
                <div className="profile-avatar-wrap">
                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageSelect}
                    />
                    <img
                        src={imagePreview ||
                            currentUser?.profileImage?.url ||
                            profileAvatar}
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button
                        type="button"
                        className="profile-edit-btn"
                        aria-label="Edit profile"
                        title="Edit profile"
                        disabled={profileSaving}
                        onClick={() => {
                            document.getElementById("profile-image-input").click();
                        }}
                    >
                        <FiEdit2 />
                    </button>
                </div>

                <h2 className="profile-name">{currentUser?.userName || "—"}</h2>
                <p className="profile-mail">{currentUser?.userMail || "—"}</p>

                <ul className="profile-details">
                    <li>
                        <FiUser />
                        <span className="detail-label">Username</span>
                        <span className="detail-value">{currentUser?.userName || "—"}</span>
                    </li>
                    <li>
                        <FiMail />
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{currentUser?.userMail || "—"}</span>
                    </li>
                </ul>

                <button
                    type="button"
                    className="cutom-btn blue change-password-btn"
                    onClick={() => setShowPasswordModal(true)}
                >
                    <FiLock /> Change Password
                </button>
            </div>

            <ChangePasswordModal
                show={showPasswordModal}
                onHide={() => setShowPasswordModal(false)}
            />
        </section>
    )
}

export default Profile
