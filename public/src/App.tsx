import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App