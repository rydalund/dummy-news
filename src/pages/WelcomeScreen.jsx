import { Box, Heading, Text } from "grommet";
import HeroVideo from "../components/HeroVideo";

const WelcomeScreen = () => {
  return (
    <Box height="100vh" width="100vw" overflow="hidden" position="relative">
      <HeroVideo />

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "red", margin: 0 }}>Welcome to Dummy News</h1>
        <p style={{ color: "white", marginTop: "1rem" }}>The only news you need...</p>
      </div>
    </Box>
  );
};

export default WelcomeScreen;