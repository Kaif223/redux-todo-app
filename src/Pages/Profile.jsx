import React from 'react'
import { useSelector } from 'react-redux'
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi'
import profileAvatar from '../Assets/images/profile-avatar.svg'

// Read-only profile: a static avatar with the signed-in user's name and mail.
const Profile = () => {
    const { currentUser } = useSelector((state) => state.userDetail)

    return (
        <section className="main-section">
            <div className="profile-card">
                <div className="profile-avatar-wrap">
                    <img
                        src={profileAvatar}
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button
                        type="button"
                        className="profile-edit-btn"
                        aria-label="Edit profile"
                        title="Edit profile"
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
            </div>
        </section>
    )
}

export default Profile
