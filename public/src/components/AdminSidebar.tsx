import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/matches">Matches</Link>
        </li>
        <li>
          <Link to="/admin/sessions">Sessions</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
