const HeroVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  );
};

export default HeroVideo;