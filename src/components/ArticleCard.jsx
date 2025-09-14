import { Box, Heading, Paragraph, Button } from "grommet";
import { Favorite } from "grommet-icons";
import AiImage from "./AiImage";
import useArticleStore from "../store/useArticleStore";

const ArticleCard = ({ article }) => {
  const toggleFavorite = useArticleStore((state) => state.toggleFavorite);
  const isFavorite = useArticleStore((state) => state.isFavorite(article.id));

  return (
    <Box
      pad="medium"
      background="cardBackground"
      color="text"
      round="small"
      elevation="small"
      gap="small"
    >
      <AiImage title={article.title} />
      <Heading
        level={3}
        margin={{ top: "none", bottom: "xsmall" }}
        title={article.title}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "1.2em",
        }}
      >
        {article.title}
      </Heading>

      <Paragraph
        size="medium"
        margin={{ top: "none" }}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minHeight: "5.2em",
        }}
      >
        {article.body}
      </Paragraph>

      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ top: "small" }}
      >
        <Box direction="row" gap="medium">
          <Button plain label="👍" />
          <Button plain label="👎" />
        </Box>
        <Box direction="row" gap="medium">
          <Button plain label="🚫" />

          <Button
            plain
            onClick={() => toggleFavorite(article.id)}
            label={isFavorite ? "❤️" : "🩶"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCard;