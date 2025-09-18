import { useState, useContext } from "react";
import { Box, Text, Image, ThemeContext } from "grommet";
import { getAiImageUrl } from "../configs/config";

const AiImage = ({ title }) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const theme = useContext(ThemeContext);
  const styles = theme.global.articleImage;

  if (hasError) return null;

  const imageUrl = getAiImageUrl(title);

  return (
    <Box
      style={{
        ...styles.container,
        aspectRatio: "1 / 1",
        width: "100%",
      }}
      background="cardBackground"
      round="8px"
      overflow="hidden"
      margin={{ bottom: "small" }}
      align="center"
      justify="center"
    >
      {!loaded && (
        <Text style={styles.loadingText} alignSelf="center">
          Loading image...
        </Text>
      )}
      <Image
        src={imageUrl}
        alt={title}
        fit="cover"
        style={{
          ...styles.image,
          display: loaded ? "block" : "none",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
      />
    </Box>
  );
};

export default AiImage;
