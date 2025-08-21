import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import RegisterUser from "../../components/RegisterUser";

const RegisterUserPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminSidebar />
        </div>
        <div className="col-md-10 p-4">
          <RegisterUser />
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
