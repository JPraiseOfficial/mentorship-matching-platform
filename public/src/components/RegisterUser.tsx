import React, { useState } from "react";
import type { RegisterFormData } from "../types/types.js";
import { registerUser } from "../services/api";
import axios from "axios";

const RegisterUser = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    role: "Mentee",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldError] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setFieldError({});
    setGeneralError("");

    try {
      await registerUser(formData);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const formfieldErrors = error.response?.data.errors;
        if (formfieldErrors) {
          setFieldError(formfieldErrors);
        } else {
          setGeneralError(
            error.response?.data.message || "An error occured. Try again later"
          );
        }
      } else {
        setGeneralError("An error occured. Try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      {generalError && <div className="alert alert-danger">{generalError}</div>}
      {success && (
        <div className="alert alert-success">
          User has been registered successfully!
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="mb-4">Register New User</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${
                  fieldErrors.email ? "is-invalid" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && (
                <div className="invalid-feedback">{fieldErrors.email[0]}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  fieldErrors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <div className="invalid-feedback">
                  {fieldErrors.password[0]}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="form-label fw-bold">
                Role
              </label>
              <select
                name="role"
                id="role"
                className={`form-select ${
                  fieldErrors.role ? "is-invalid" : ""
                }`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Mentor">Mentor</option>
                <option value="Mentee">Mentee</option>
              </select>
              {fieldErrors.role && (
                <div className="invalid-feedback">{fieldErrors.role[0]}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
