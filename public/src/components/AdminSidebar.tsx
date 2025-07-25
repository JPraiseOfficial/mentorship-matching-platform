import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-100">
      <h4 className="text-center mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin/users" className="nav-link text-white">
            Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/matches" className="nav-link text-white">
            Matches
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/sessions" className="nav-link text-white">
            Sessions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
