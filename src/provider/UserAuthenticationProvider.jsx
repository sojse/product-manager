import UserAuthenticationContext from "../context/UserAuthenticationContext";
import { useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

function UserAuthenticationProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);
  const [auth, setAuth] = useState({
    user: "",
    roles: [],
    token: "",
  });
  const [informationMessage, setInformationMessage] = useState("");

  const LOGIN_URL = "/auth";

  const signIn = async (signInCredentials) => {
    setInformationMessage("");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(signInCredentials),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      const decodedToken = jwtDecode(response.data.token);

      const roles = Array.isArray(decodedToken.role)
        ? decodedToken.role
        : [decodedToken.role];

      setAuth({
        user: decodedToken.nameid,
        roles: roles,
        token: response.data.token,
      });

      setSignedIn(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setInformationMessage("Invalid username or password");
      } else {
        setInformationMessage("Login failed");
      }
    }
  };

  const signOut = () => {
    setAuth({ user: "", roles: [], token: "" });
    setSignedIn(false);
  };

  return (
    <UserAuthenticationContext.Provider
      value={{
        signedIn: signedIn,
        auth: auth,
        informationMessage: informationMessage,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
}

export default UserAuthenticationProvider;
