import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");

  async function registeruser(ev) {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        Name,
        Email,
        Pass
      });
      alert(`welcome ${Name} ,Now login !`);
      <Navigate to ={'/login'}/>
    } catch (e) {
      alert(e.response.data);
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">Register</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={registeruser}>
          <input
            type="text"
            placeholder="Enter username"
            value={Name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={Pass}
            onChange={(ev) => setPass(ev.target.value)}
          />
          <button type="submit">Register</button>
          <div>
            Already have an account?
            <Link to="/login" className="text-blue-400"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
