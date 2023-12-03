import { Nav, NavItem, NavLink } from "reactstrap";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink active href="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/rated">Rated</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/auth">
            Auth
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Navbar;
