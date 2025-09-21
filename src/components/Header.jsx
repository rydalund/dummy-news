import HeroVideo from "./HeroVideo";

const Header = () => {

  return (
    <div style={{ position: "relative", height: "70vh", width: "100%", overflow: "hidden" }}>
      <HeroVideo />

      <div
        style={{
          position: "absolute",
          top: "1em",
          left: "50%",
          transform: "translateX(-50%)",
          color: "red",
          textAlign: "center",
          zIndex: 1,
          pointerEvents: "none",
          fontFamily: "'Caveat', cursive",
          textShadow: "2px 2px 6px rgba(0,0,0,0.7)",

        }}
      >
        <h1 style={{ fontSize: "6em", margin: 0, whiteSpace: "pre-line" }}>Dummy News</h1>
      </div>
    </div>
  );
};


export default Header;