import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

// Custom hook that will make sure that the requests made through AxiosPrivate contains the neccessary Authorization
// using Interceptors to define the request that will be triggered before the request is sent to the server
const useAxiosPrivate = () => {
    const {auth} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.token}`;
                }
                return config;
            }, error => Promise.reject(error) // handles any errors that might occur during the interception process
        );
        // clean up function 
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept); // removes the interceptor when component unmounts
        }
    }, [auth]) // makes sure I have the latest Token for my requests

    
    return axiosPrivate;
}

export default useAxiosPrivate;