import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/NewProfileForm";
import UsersPage from "./pages/admin/UsersPage";
import RegisterUserPage from "./pages/admin/RegisterUserPage";
import { AuthProvider } from "./auth/AuthProvider";
import Unauthorized from "./pages/Unauthorised";
import { UserRoute, RoleRoute } from "./auth/ProtectRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Users Routes */}
            <Route element={<UserRoute />}>
              <Route path="/profile/edit" element={<ProfileForm />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/register" element={<RegisterUserPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
