import { useEffect, useState } from "react";
import { getOthersProfile } from "../services/api.js";
import type { UserProfile } from "../types/types.js";
import axios from "axios";

type ViewUserProfieProp = {
  userId: number;
};
const ViewProfileButton = ({ userId }: ViewUserProfieProp) => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [noProfile, setNoProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setProfile(null);
  };

  useEffect(() => {
    if (show) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const res = await getOthersProfile(userId);
          setProfile(res);
        } catch (error) {
          if (
            axios.isAxiosError(error) &&
            error.response?.data.message === "User has no profile!"
          ) {
            setNoProfile(true);
          } else {
            console.error("Failed to fetch profile", error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [show, userId]);

  return (
    <>
      <button className="btn btn-primary" onClick={handleOpen}>
        View Profile
      </button>

      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Profile</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              {loading && <p>Loading...</p>}
              {noProfile && <p>User has no Profile!</p>}
              {profile && (
                <>
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Bio:</strong> {profile.bio}
                  </p>
                  <p>
                    <strong>Role:</strong> {profile.role}
                  </p>
                  <p>
                    <strong>Skills: </strong>
                    {profile.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Goals:</strong> {profile.goals}
                  </p>
                </>
              )}
              {!loading && !profile && !noProfile && (
                <p>Error loading user profile!</p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfileButton;
