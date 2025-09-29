import { useEffect, useState } from "react";
import { getAllMentors } from "../services/api.js";
import type { Mentor } from "../types/types.js";
import axios from "axios";
import ViewProfileButton from "./Buttons/ViewProfileButton";

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await getAllMentors();
        setMentors(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Somenthing went wrong. Please, refresh the page or try again later."
          );
        } else {
          setError("Somenthing went wrong. Please, try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h2>Mentors</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Bio</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={5} className="text-danger">
                  {error}
                </td>
              </tr>
            )}
            {loading ? (
              <tr>
                <td colSpan={5}>Loading mentors...</td>
              </tr>
            ) : (
              mentors.map((mentor, idx) => (
                <MentorRows
                  {...mentor}
                  userCount={idx + 1}
                  key={mentor.mentorId}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MentorRows = ({
  userCount,
  mentorId,
  name,
  bio,
  skills = [],
}: Mentor & { userCount: number }) => {
  const skillsText = Array.isArray(skills)
    ? skills.join(", ")
    : String(skills ?? "-");

  return (
    <tr>
      <td>{userCount}</td>
      <td>{name ?? "-"}</td>
      <td>{bio ?? "-"}</td>
      <td>{skillsText || "-"}</td>
      <td>
        <ViewProfileButton userId={mentorId} />
      </td>
    </tr>
  );
};

export default Mentors;
