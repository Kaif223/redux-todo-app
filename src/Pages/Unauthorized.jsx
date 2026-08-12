import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Unauthorized = () => {
    const navigate = useNavigate();

    const { currentUser } = useSelector(
        (state) => state.userDetail
    );

    const handleGoHome = () => {
        if (currentUser?.role === "admin") {
            navigate("/admin")
        } else {
            navigate("/")
        }
    }

    return (
        <div className="error-div">
            <div className="inner-data">

                          <h2>403</h2>

                <h2 className="small">Access Denied</h2>

                <button
                    type="button"
                    className="find-btn"
                    onClick={handleGoHome}
                >
                    Go Home
                </button>
            </div>

            <div className="error-msg-div">
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        cx="10"
                        cy="10"
                        r="8.25"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M10 6v5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <circle cx="10" cy="13.75" r="1" fill="#ef4444" />
                </svg>

                <p>You don't have permission to access this page.</p>
            </div>
        </div>
    );
};

export default Unauthorized;
