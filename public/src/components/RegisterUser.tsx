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
    <div>
      {generalError && (
        <div className="alert alert-danger mt-3">{generalError}</div>
      )}
      {success && (
        <div className="alert alert-success mt-3">
          User has been registered Successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p>{fieldErrors.email && fieldErrors.email[0]}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p>{fieldErrors.password && fieldErrors.password[0]}</p>
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Mentor">Mentor</option>
            <option value="Mentee">Mentee</option>
          </select>
          <p>{fieldErrors.role && fieldErrors.role[0]}</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading" : "Register User"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
