const HeroVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  );
};

export default HeroVideo;