import MenteeDashboard from "../components/Dashboard/MenteeDashboard.js";
import MenteeSidebar from "../components/Sidebar/MenteeSidebar.js";
import { useAuth } from "../auth/useAuth.js";
import MentorSidebar from "../components/Sidebar/MentorSidebar.js";
import MentorDashboard from "../components/Dashboard/MentorDashboard.js";

const MenteeDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <MenteeSidebar />
        </div>
        <div className="col-md-10 p-4">
          <MenteeDashboard />
        </div>
      </div>
    </div>
  );
};

const MentorDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <MentorSidebar />
        </div>
        <div className="col-md-10 p-4">
          <MentorDashboard />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role == "Mentee") {
    return <MenteeDashboardPage />;
  } else if (user?.role == "Mentor") {
    return <MentorDashboardPage />;
  }
};

export default Dashboard;
