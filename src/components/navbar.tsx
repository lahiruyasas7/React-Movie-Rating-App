import { useEffect, useState } from "react";
import { Film, LogIn, Tv } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Swal from "sweetalert2";

const Navbar = () => {
  interface UserData {
    accessToken: string;
    user: {
      email: string;
      userId: string;
    };
  }
  const [userData, setUserData] = useState<UserData>();

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData(user);
  }, []);
  console.log("userData", userData);

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

  return (
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
          href="/trending"
          className="hover:text-[#facc15] text-white transition-colors duration-300"
        >
          🔥 Trending
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
  );
};

export default Navbar;
