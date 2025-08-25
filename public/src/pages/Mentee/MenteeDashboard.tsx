import Dashboard from "../../components/Dashboard/MenteeDashboard";
import MenteeSidebar from "../../components/Sidebar/MenteeSidebar";

const MenteeDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <MenteeSidebar />
        </div>
        <div className="col-md-10 p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboardPage;
