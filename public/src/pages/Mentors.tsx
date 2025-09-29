import Mentors from "../components/Mentors";
import MenteeSidebar from "../components/Sidebar/MenteeSidebar";

const MentorPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <MenteeSidebar />
        </div>
        <div className="col-md-10 p-4">
          <Mentors />
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
