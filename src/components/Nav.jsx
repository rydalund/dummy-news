import { Box, Button } from "grommet";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Box
      direction="row"
      align="center"
      gap="medium" // mindre avstånd
    >
      <Link to="/">
        <Button label="Home" />
      </Link>
      <Link to="/new">
        <Button label="Add New Article" />
      </Link>
    </Box>
  );
};

export default Nav;