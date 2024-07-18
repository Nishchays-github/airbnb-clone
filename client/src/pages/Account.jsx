import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { userContext } from "../userContext";
import axios from "axios";
import Places from "./Places";
import AccountNav from "./AccountNav";

const Account = () => {
  const { ready, user, setuser } = useContext(userContext);
  const [tohome, settohome] = useState(false);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (tohome) {
    return <Navigate to="/" />;
  }
  if (!ready) return <h1>Loading...</h1>;
  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  async function logout() {
    await axios.post("https://airbnb-clone-api-eight.vercel.app//logout");
    setuser(null);
    settohome(true);
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Hello, <strong>{user.Name}</strong> (<strong>{user.Email}</strong>)
          <button onClick={logout} className="primary max-w-sm  mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Account;
