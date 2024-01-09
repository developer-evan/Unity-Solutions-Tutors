import useAuth from "./useAuth";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    let refreshToken = localStorage.getItem("refresh");
    //   console.log("refreshToken 13",refreshToken)
    if (!refreshToken) {
      return;
    }
    let payload = {
      refresh: refreshToken,
    };
    const { data } = await axios.post("https://unit-solutions.vercel.app/api/token/refresh/", payload);
    localStorage.setItem("refresh", data.refresh);
    // console.log("res",data)
    // var decoded = jwt_decode(data.access);
    var decoded = jwtDecode(data.access);
    // console.log("decoded decoded",decoded)

    //setAuth({user:email,roles:cat,accessToken:fetchLoginResponses.accessToken})
    setAuth((prev) => {
      //  console.log("JSON.stringify(prev)",JSON.stringify(prev));
      //  console.log("data.accessToken",data.accessToken);
      let role = localStorage.getItem("cat");
      let cat = role.split(",");
      //let cat = decoded.user_category.split(",");
      cat = cat.map(Number);

      return {
        ...prev,
        user_id: decoded.user_id,
        user: decoded.email,
        roles: cat,
        username: decoded.username,
        accessToken: data.access,
      };
    });
    return data;
  };
  return refresh;
};

export default useRefreshToken;