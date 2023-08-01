import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("/api/user/profile")
        .then(({data}) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  );
}
