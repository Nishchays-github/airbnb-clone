// usercontext.jsx

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setuser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get("https://airbnb-clone-api-1.vercel.app/profile")
      .then(({ data }) => {
        setuser(data);
        setReady(true);
      })
      .catch(() => {
        setReady(true); // Ensure ready is set even on error
      });
  }, []);

  return (
    <userContext.Provider value={{ user, setuser, ready }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext;
