import { useEffect, useState } from "react";
import { getProfile } from "../services/api.js";
import type { ProfileFormData } from "../types/types.js";
import axios from "axios";
import ProfileForm from "./ProfileForm.js";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileFormData>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Something went wrong. Please, refresh the page or try again later."
          );
        } else {
          setError("Something went wrong. Please, try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">My Profile</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {profile && (
          <>
            <div className="mb-3">
              <strong>Name:</strong> {profile.name}
            </div>

            <div className="mb-3">
              <strong>Bio:</strong> {profile.bio}
            </div>

            <div className="mb-3">
              <strong>Skills:</strong> {profile.skills.join(", ")}
            </div>

            <div className="mb-4">
              <strong>Goals:</strong> {profile.goals}
            </div>
          </>
        )}
      </div>

      <button className="btn btn-primary mt-3" onClick={handleOpen}>
        Edit Profile
      </button>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                <ProfileForm profile={profile} mode="edit" />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
