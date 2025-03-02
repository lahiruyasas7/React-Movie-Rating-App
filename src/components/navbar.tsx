import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Swal from "sweetalert2";

const Navbar = () => {
  interface UserData {
    token: string;
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
    <div>
      <Nav className="w-full flex gap-2">
        <NavItem>
          <NavLink active href="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/rated">Rated</NavLink>
        </NavItem>
        {!userData?.token && (
          <NavItem className="ml-auto">
            <NavLink href="/auth">Auth</NavLink>
          </NavItem>
        )}
        {userData?.token && (
          <NavItem className="ml-auto">
            <Button onClick={logoutHandler}>Log out</Button>
          </NavItem>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
