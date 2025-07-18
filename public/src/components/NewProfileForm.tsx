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
    <div className="container mt-5">
      <h1 className="mb-4">Edit Your Profile</h1>

      <form onSubmit={handleSubmit}>
        {generalError && (
          <div className="alert alert-danger mt-3">{generalError}</div>
        )}
        {success && (
          <div className="alert alert-success mt-3">
            Profile Updated Successfully!
          </div>
        )}

        <div>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <p>{serverErrors.name && serverErrors.name[0]}</p>
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
          <p>{serverErrors.bio && serverErrors.bio[0]}</p>
        </div>

        <div>
          <label>Skills:</label>
          {availableSkills.map((skill) => (
            <label key={skill} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleSkillsChange}
              />
              {skill}
            </label>
          ))}
          <p>{serverErrors.skills && serverErrors.skills[0]}</p>
        </div>

        <div>
          <label htmlFor="goals">Goals:</label>
          <input
            name="goals"
            id="goals"
            value={formData.goals}
            onChange={handleChange}
            required
          />
          <p>{serverErrors.goals && serverErrors.goals[0]}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
