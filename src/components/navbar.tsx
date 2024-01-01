import { Nav, NavItem, NavLink } from "reactstrap";

const Navbar = () => {
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
        <NavItem className="ml-auto">
          <NavLink href="/auth">
            Auth
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Navbar;
