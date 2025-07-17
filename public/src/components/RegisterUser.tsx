import React, { useState } from "react";
import type { RegisterFormData } from "../types/types.js";
import { registerUser } from "../services/api";

const RegisterUser = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await registerUser();
      setLoading(false);
      setSuccess(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && (
        <div className="alert alert-success mt-3">
          User has been registered Successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading" : "Register User"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
