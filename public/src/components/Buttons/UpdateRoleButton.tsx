import { useState } from "react";
import type { Role } from "../../types/types.js";
import { updateRole } from "../../services/api.js";
import axios from "axios";

type UpdateRoleButtonProps = {
  name?: string;
  email: string;
  id: number;
  currentRole: Role;
};

const UpdateRoleButton = ({
  name,
  email,
  id,
  currentRole,
}: UpdateRoleButtonProps) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<Role>(currentRole);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      setRole(role);
    } else {
      setRole(value as Role);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await updateRole(id, role);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
        console.error("Failed to update User's role", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleOpen}>
        Update Role
      </button>

      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change User Role</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && (
                <div className="alert alert-success">
                  User Role has been updated!
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="email"
                    className={`form-control`}
                    value={name}
                    required
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control`}
                    value={email}
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="form-label fw-bold">
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    className={`form-select`}
                    value={role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Mentee">Mentee</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update Role"}
                </button>
              </form>
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

export default UpdateRoleButton;
