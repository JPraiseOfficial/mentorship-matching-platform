import { Link } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";

const MentorSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-100">
      <h4 className="text-center mb-4">Mentor Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/availability" className="nav-link text-white">
            Availability
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/requests" className="nav-link text-white">
            Requests
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/sessions" className="nav-link text-white">
            Sessions
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link text-white">
            My Profile
          </Link>
        </li>
      </ul>
      <LogoutButton />
    </div>
  );
};

export default MentorSidebar;
