import { Box, Heading, Paragraph } from "grommet";
import AiImage from "./AiImage";

const ArticleCard = ({ article }) => {
  return (
    <Box
      pad="medium"
      background="cardBackground" //From theme.js
      color="text"
      round="small"
      elevation="small"
      gap="small"
    >
      <AiImage title={article.title} />

      <Heading
        level={3}
        margin={{ top: "none", bottom: "xsmall" }}
        title={article.title} //To get entire title on hover
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
    </Box>
  );
};

export default ArticleCard;
