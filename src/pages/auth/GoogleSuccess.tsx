import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { USER_ITEM } from "../../utils/constants";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = params.get("accessToken");
   
    const userParam = params.get("user");
    const user = userParam ? JSON.parse(userParam) : null;

    if (accessToken) {
      // Store accessToken in localStorage
      localStorage.setItem(
        USER_ITEM,
        JSON.stringify({ accessToken, user }) // you can store more if needed
      );

      // Redirect to homepage or dashboard
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in via Google...</p>;
};

export default GoogleSuccess;
