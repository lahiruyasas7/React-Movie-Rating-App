import { useEffect, useRef, useState } from "react";
import { Film, LogIn, Tv } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Swal from "sweetalert2";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { getUserDetails } from "../redux/actions";

const Navbar = () => {
  interface UserData {
    accessToken: string;
    user: {
      email: string;
      userId: string;
    };
  }
  const [userData, setUserData] = useState<UserData>();

  const { userDetails } = useSelector((state: RootState) => state.reducer);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData(user);
  }, []);

  useEffect(() => {
    if (userData?.user?.userId) dispatch(getUserDetails(userData.user.userId));
  }, [userData]);

  const logoutHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    Swal.fire({
      title: "Are Sure Want to Logout",
      // html: `
      //     <div style="display: flex; flex-direction: column; justify-content: center:">
      //       <span>Are you sure want to logout</span>
      //     </div>
      //   `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#198754",
      cancelButtonColor: "rgb(220 64 64)",
      allowOutsideClick: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setUserData(undefined);
        navigate("/");
      }
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      <Nav className="flex space-x-4 md:space-x-6 text-white font-medium text-sm md:text-base">
        <NavItem>
          <NavLink
            href="/"
            className="hover:text-[#facc15] text-white transition-colors duration-300"
          >
            <Film className="inline-block w-4 h-4 mr-1" /> Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/movies"
            className="hover:text-[#facc15] text-white transition-colors duration-300"
          >
            <Film className="inline-block w-4 h-4 mr-1" /> Movies
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/tv-series"
            className="hover:text-[#facc15] text-white transition-colors duration-300"
          >
            <Tv className="inline-block w-4 h-4 mr-1" /> TV Shows
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/popular-movies"
            className="hover:text-[#facc15] text-white transition-colors duration-300"
          >
            🔥 Trending Movies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/chat-list-page"
            className="hover:text-[#facc15] text-white transition-colors duration-300"
          >
           💬 Chat
          </NavLink>
        </NavItem>

        {!userData?.accessToken ? (
          <NavItem>
            <NavLink
              href="/auth"
              className="bg-[#facc15] text-white px-3 rounded hover:bg-yellow-300 transition-all duration-300"
            >
              <LogIn className="inline-block w-4 h-4 mr-1" /> Login
            </NavLink>
          </NavItem>
        ) : (
          <Button
            onClick={logoutHandler}
            className="bg-[#facc15] text-white px-3 rounded hover:bg-yellow-300 transition-all duration-300"
          >
            <LogIn className="inline-block w-4 h-4 mr-1" /> Log Out
          </Button>
        )}
      </Nav>
      {userData?.user?.userId && (
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="cursor-pointer"
          >
            <Avatar
              src={userDetails?.profileImageUrl || undefined}
              name={`${userDetails?.firstName || ""} ${
                userDetails?.lastName || ""
              }`}
              size="40"
              round={true}
            />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50 text-sm">
              <div
                onClick={() => {
                  navigate("/user-profile");
                  setShowDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </div>
              <div
                onClick={() => {
                  navigate("/user-videos");
                  setShowDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Videos
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
