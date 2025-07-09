import React, { useState } from "react";
import { createProfile } from "../services/api";

// Define types for skills
interface SkillOption {
  value: string;
  label: string;
}

// Shape of the form data
export interface ProfileFormData {
  name: string;
  bio: string;
  skills: string[];
  goals: string;
}

// List of available skills
const availableSkills: SkillOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "mongodb", label: "MongoDB" },
  { value: "sql", label: "SQL" },
  { value: "aws", label: "AWS" },
];

interface ProfileFormProps {
  // Optional: Initial data to pre-fill the form (e.g., when editing an existing profile)
  initialData?: Partial<ProfileFormData>;
  // Callback function to handle form submission
  // Optional: Loading state for async operations (e.g., saving data)
  isLoading?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData?.name || "",
    bio: initialData?.bio || "",
    skills: initialData?.skills || [],
    goals: initialData?.goals || "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.options);
    const selectedSkills = options
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prevData) => ({
      ...prevData,
      skills: selectedSkills,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const api = await createProfile(formData);
      console.log(api);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="bio" className="form-label">
          Short Bio:
        </label>
        <textarea
          id="bio"
          name="bio"
          className="form-control"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          maxLength={200}
          disabled={isLoading}
        ></textarea>
        <small className="form-text text-muted">Max 200 characters</small>
      </div>

      <div className="mb-3">
        <label htmlFor="skills" className="form-label">
          Skills:
        </label>
        <select
          id="skills"
          name="skills"
          className="form-select"
          multiple
          value={formData.skills}
          onChange={handleSkillsChange}
          disabled={isLoading}
        >
          {availableSkills.map((skill) => (
            <option key={skill.value} value={skill.value}>
              {skill.label}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">
          Hold Ctrl (or Cmd on Mac) to select multiple
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="goals" className="form-label">
          Goals:
        </label>
        <textarea
          id="goals"
          name="goals"
          className="form-control"
          value={formData.goals}
          onChange={handleChange}
          rows={4}
          disabled={isLoading}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Saving Profile..." : "Save Profile"}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && (
        <div className="alert alert-success mt-3">
          New Profile added successfully!
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
