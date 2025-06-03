import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy login action
    alert("✅ Logged in successfully!");
    navigate("/"); // Redirect to homepage after login
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
