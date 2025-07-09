import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/NewProfileForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile/edit" element={<ProfileForm />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App