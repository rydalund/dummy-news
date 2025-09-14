import { Box, Button, Text} from "grommet";
import { Sun, Moon, Favorite } from "grommet-icons";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import useArticleStore from "../store/useArticleStore";

const HeartWithCount = ({ count }) => (
  <Box style={{ position: "relative", width: "36px", height: "36px" }}>
    <Favorite color="red" size="36px" />
    {count > 0 && (
      <Text
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
          color: "red",
          fontSize: "12px",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
      >
        {count > 9 ? "9+" : count}
      </Text>
    )}
  </Box>
);

const UserPanel = ({ themeMode, toggleTheme }) => {
  const favorites = useArticleStore((state) => state.favorites || []);
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

      <Link to="/favorites" style={{ textDecoration: "none" }}>
        <HeartWithCount count={favorites.length} />
      </Link>
    </Box>
  );
};

export default UserPanel;
