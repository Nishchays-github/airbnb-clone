import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../userContext";

const Login = () => {
  const [Email, setEMail] = useState("");
  const [Pass, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setuser } = useContext(userContext);

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { Email, Pass });
      setuser(response.data);
      setRedirect(true);
      alert("Login successful");
    } catch (e) {
      console.error("Login error:", e.response ? e.response.data : e);
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(ev) => setEMail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={Pass}
            onChange={(ev) => setPass(ev.target.value)}
          />
          <button type="submit">Login</button>
          <div>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
