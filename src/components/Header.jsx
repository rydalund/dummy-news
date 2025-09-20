import { Box } from "grommet";
import HeroVideo from "./HeroVideo";
import useIsMobile from "../hooks/useIsMobile";

const Header = () => {
  const isMobile = useIsMobile(); // Below 768px

  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height={isMobile ? "auto" : "70vh"}
      style={{ position: "relative", overflow: "hidden", width: "100%" }}
    >
      {isMobile && (
        <Box
          pad="medium"
          background="rgba(0,0,0,0.5)"
          style={{
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          <h1 style={{ marginBottom: "0"}}>Welcome to Dummy News</h1>
          <p style={{ fontSize: "1.5em"}}>The only news you need...</p>
        </Box>
      )}

      <HeroVideo />

      {!isMobile && (
        <Box
          style={{
            position: "absolute",
            top: "2em",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textAlign: "center",
            zIndex: 1,
            pointerEvents: "none",
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          <h1 style={{ fontSize: "4em", marginTop: "0.1em"}}>Dummy News</h1>
        </Box>
      )}
    </Box>
  );
};

export default Header;