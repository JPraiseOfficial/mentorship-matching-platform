import AdminSidebar from "../components/Sidebar/AdminSidebar";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminSidebar />
        </div>
        <div className="col-md-10 p-4">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
