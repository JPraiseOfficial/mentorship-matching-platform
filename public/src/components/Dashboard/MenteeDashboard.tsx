import { useAuth } from "../../auth/useAuth.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      {/* Header Section */}
      <div className="w-100 mb-5 text-center">
        <h2>Welcome back, {user?.name || "Mentee"}!</h2>
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
                    "Mentorship is the bridge between where you are and where
                    you want to be."
                  </p>
                  <footer className="blockquote-footer">Anonymous</footer>
                </blockquote>
              </div>
              <div className="carousel-item">
                <blockquote className="blockquote">
                  <p className="fs-3 fst-italic">
                    "The delicate balance of mentoring someone is not creating
                    them in your own image, but giving them the opportunity to
                    create themselves."
                  </p>
                  <footer className="blockquote-footer">
                    Steven Spielberg
                  </footer>
                </blockquote>
              </div>
              <div className="carousel-item">
                <blockquote className="blockquote">
                  <p className="fs-3 fst-italic">
                    "A mentor empowers a person to see a possible future, and
                    believe it can be obtained."
                  </p>
                  <footer className="blockquote-footer">Shawn Hitchcock</footer>
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

      {/* Search Mentors Button */}
      <div className="text-center">
        <Link to="/mentors">
          <button className="btn btn-primary">Search Mentors</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
