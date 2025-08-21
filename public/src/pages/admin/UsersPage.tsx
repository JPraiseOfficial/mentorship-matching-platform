import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Users from "../../components/Users";

const UsersPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminSidebar />
        </div>
        <div className="col-md-10 p-4">
          <Users />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
