import { Link } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";

const MenteeSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-100">
      <h4 className="text-center mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/mentors" className="nav-link text-white">
            Mentors
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
      </ul>
      <LogoutButton />
    </div>
  );
};

export default MenteeSidebar;
