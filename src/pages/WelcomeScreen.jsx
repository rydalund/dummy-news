import { Box, Heading, Text } from "grommet";
import HeroVideo from "../components/HeroVideo";

const WelcomeScreen = () => {
  return (
    <div style={{ position: "relative", height: "70vh", width: "100%", overflow: "hidden" }}>
      <HeroVideo />

      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <h1>Welcome to Dummy News</h1>
        <p>The only news you need...</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;