import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import useRefreshToken from "../../../hooks/useRefreshToken";
import "react-toastify/dist/ReactToastify.css";
import useRefreshToken from "../../../hooks/useRefreshToken"
// import { TailSpin } from '@agney/react-loading';
import { TailSpin } from "react-loader-spinner";

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
        // "loading..."
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          // }}
          }}
          wrapperClass=""
          // className="items-center justify-center "
        />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;