import { useContext } from "react";
import UserAuthenticationContext from "../context/UserAuthenticationContext";

const useAuth = () => {
    return useContext(UserAuthenticationContext);
}

export default useAuth;