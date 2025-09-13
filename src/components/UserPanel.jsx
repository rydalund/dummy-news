import { Box, Button } from "grommet";
import { Sun, Moon, Favorite } from "grommet-icons";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const UserPanel = ({ themeMode, toggleTheme }) => {
  return (
    <Box
      as="header"
      direction="row"
      align="center"
      justify="center"
      gap="medium"
      pad="medium"
      background="background"
    >
      {/* Nav Component */}
      <Nav />

      <Button
        label={themeMode === "light" ? "Dark mode" : "Light mode"}
        icon={themeMode === "light" ? <Moon /> : <Sun />}
        onClick={toggleTheme}
        primary
      />

      <Link to="/favorites">
        <Button
          icon={<Favorite color="status-critical" size="2em" />}
          hoverIndicator={{ background: "rgba(0, 0, 255, 0.5)" }}
          plain
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Link>
    </Box>
  );
};

export default UserPanel;
