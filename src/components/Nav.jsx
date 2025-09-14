import { Box, Button } from "grommet";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Box direction="row" align="center" gap="medium">
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: "none",
          opacity: isActive ? 1 : 0.5,
        })}
      >
        <Button label="Home" />
      </NavLink>

      <NavLink
        to="/new"
        style={({ isActive }) => ({
          textDecoration: "none",
          opacity: isActive ? 1 : 0.5,
        })}
      >
        <Button label="Add New Article" />
      </NavLink>
    </Box>
  );
};

export default Nav;