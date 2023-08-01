import React, {useEffect, useState} from "react";
import {useAuth} from "../../Context/Auth";
import {Outlet} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/user/user-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        // Handle error (e.g., display an error message or redirect to login)
        console.error("Error while checking user authentication:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      // If there's no token, the user is not authenticated
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
