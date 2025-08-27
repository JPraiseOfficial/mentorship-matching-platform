import { useEffect, useState } from "react";
import { getAllMentees } from "../../services/api.js";
import type { Mentee } from "../../types/types.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.js";

const MentorDashboard = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const data = await getAllMentees();
        setMentees(data);
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
    fetchMentees();
  }, []);
  return (
    <>
      <div className="container mt-5 d-flex flex-column align-items-center">
        {/* Header Section */}
        <div className="w-100 mb-5 text-center">
          <h2>Welcome back, {user?.name || "Mentor"}!</h2>
        </div>

        {/* Mentorship Quotes Carousel */}
        <div className="card shadow-lg w-75 mb-4">
          <div className="card-body">
            <div
              id="quotesCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner text-center">
                <div className="carousel-item active">
                  <blockquote className="blockquote">
                    <p className="fs-3 fst-italic">
                      "The greatest legacy a mentor can leave is not their
                      achievements, but the people they've inspired"
                    </p>
                    <footer className="blockquote-footer">Anonymous</footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="fs-3 fst-italic">
                      "The greatest good you can do for another is not just to
                      share your riches but to reveal to him his own"
                    </p>
                    <footer className="blockquote-footer">
                      Benjamin Disraeli
                    </footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="fs-3 fst-italic">
                      "A mentor empowers a person to see a possible future, and
                      believe it can be obtained."
                    </p>
                    <footer className="blockquote-footer">
                      Shawn Hitchcock
                    </footer>
                  </blockquote>
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#quotesCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark rounded-circle p-3"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#quotesCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark rounded-circle p-3"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h2>Mentees</h2>
        <Link to="/requests" className="btn btn-primary">
          View Requests
        </Link>
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
                <td colSpan={5}>Loading mentees...</td>
              </tr>
            ) : (
              mentees.map((mentee, idx) => (
                <MenteeRows
                  {...mentee}
                  userCount={idx + 1}
                  key={mentee.userId}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MenteeRows = ({
  userCount,
  name,
  bio,
  skills,
}: Mentee & { userCount: number }) => {
  return (
    <tr>
      <td>{userCount}</td>
      <td>{name}</td>
      <td>{bio}</td>
      <td>{skills.join(", ")}</td>
      <td>{<>{/* <ViewProfileButton userId={id} />{" "} */}</>}</td>
    </tr>
  );
};
export default MentorDashboard;
