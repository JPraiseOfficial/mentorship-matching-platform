import React, { useState } from "react";
import type { ProfileFormData } from "../types/types.js";
import { createProfile } from "../services/api";

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
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, skills: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await createProfile(formData);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError("An error occured. Please, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Your Profile</h1>

      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
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
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="skills">Skills:</label>
          <select
            id="skills"
            name="skills"
            multiple
            value={formData.skills}
            onChange={handleSkillsChange}
          >
            {availableSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <small>Hold Ctrl (Windows) or Cmd (Mac) to select multiple</small>
        </div>

        <div>
          <label htmlFor="goals">Goals:</label>
          <input
            name="goals"
            id="goals"
            value={formData.goals}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
