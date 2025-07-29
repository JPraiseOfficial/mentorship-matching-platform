import { useAuth } from "../../auth/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <div className="d-flex justify-content-center mt-3">
      <button onClick={logout} className="btn btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;
