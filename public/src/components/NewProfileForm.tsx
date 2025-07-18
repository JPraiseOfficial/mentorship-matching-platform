import React, { useState } from "react";
import type { ProfileFormData } from "../types/types.js";
import { createProfile } from "../services/api";
import axios from "axios";

const availableSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "CSS",
  "Python",
];

const ProfileForm = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    bio: "",
    skills: [],
    goals: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, skills: [...prev.skills, value] };
      } else {
        return {
          ...prev,
          skills: prev.skills.filter((skill) => skill !== value),
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerErrors({});
    setGeneralError("");
    setSuccess(false);

    try {
      await createProfile(formData);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data.errors;
        if (apiErrors) {
          setServerErrors(apiErrors);
        } else {
          setGeneralError(
            error.response?.data.message || "Something went wrong!"
          );
        }
      } else {
        setGeneralError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h1 className="mb-4">Edit Your Profile</h1>

      {generalError && <div className="alert alert-danger">{generalError}</div>}
      {success && (
        <div className="alert alert-success">
          ✅ Profile updated successfully!
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`form-control ${
                  serverErrors.name ? "is-invalid" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {serverErrors.name && (
                <div className="invalid-feedback">{serverErrors.name[0]}</div>
              )}
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label htmlFor="bio" className="form-label fw-bold">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                className={`form-control ${
                  serverErrors.bio ? "is-invalid" : ""
                }`}
                value={formData.bio}
                onChange={handleChange}
                required
              />
              {serverErrors.bio && (
                <div className="invalid-feedback">{serverErrors.bio[0]}</div>
              )}
            </div>

            {/* Skills */}
            <div className="mb-3">
              <label className="form-label fw-bold">Skills</label>
              <div className="row">
                {availableSkills.map((skill) => (
                  <div className="form-check col-6 col-md-4" key={skill}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={skill}
                      id={`skill-${skill}`}
                      checked={formData.skills.includes(skill)}
                      onChange={handleSkillsChange}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="form-check-label"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              {serverErrors.skills && (
                <div className="text-danger mt-1">{serverErrors.skills[0]}</div>
              )}
            </div>

            {/* Goals */}
            <div className="mb-4">
              <label htmlFor="goals" className="form-label fw-bold">
                Goals
              </label>
              <input
                type="text"
                name="goals"
                id="goals"
                className={`form-control ${
                  serverErrors.goals ? "is-invalid" : ""
                }`}
                value={formData.goals}
                onChange={handleChange}
                required
              />
              {serverErrors.goals && (
                <div className="invalid-feedback">{serverErrors.goals[0]}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
