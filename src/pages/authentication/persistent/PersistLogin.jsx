import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import useRefreshToken from "../../../hooks/useRefreshToken";
import "react-toastify/dist/ReactToastify.css";
import useRefreshToken from "../../../hooks/useRefreshToken"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      // console.log("Here we get refreshtoken")
      try {
        await refresh();
        // console.log("meee")
      } catch (error) {
        console.log(error);
        // toast.error("Error verifying refresh token");
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    //console.log(`isLoading:${isLoading}`);
    //console.log(`aT:${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading]);


  return (
    <>
      {isLoading ? (
        //  console.log("Loading...")
        "loading..."
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;