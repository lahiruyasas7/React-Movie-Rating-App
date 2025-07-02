import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions";
import { RootState } from "../../redux/reducers";

interface UserData {
  accessToken: string;
  user: {
    email: string;
    userId: string;
  };
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>();

  const dispatch = useDispatch();

  const { userDetails } = useSelector((state: RootState) => state.reducer);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData(user);
  }, []);
  useEffect(() => {
    if (userData?.user?.userId) {
      dispatch(getUserDetails(userData.user.userId));
    }
  }, [userData]);
  console.log("userDetails", userDetails);
  return <div>UserProfile</div>;
};

export default UserProfile;
