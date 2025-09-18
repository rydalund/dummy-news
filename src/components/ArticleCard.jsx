import { Box, Heading, Paragraph, Button } from "grommet";
import { Link, useLocation } from "react-router-dom";
import AiImage from "./AiImage";
import useArticleStore from "../store/useArticleStore";
import { showSuccess, showCustomToast } from "../config/toastConfig";
//import { toast } from "react-toastify";

const ArticleCard = ({ article, onBack = null }) => {
  const {
    toggleFavorite,
    isFavorite,
    incrementLike,
    incrementDislike,
    getLikes,
    getDislikes,
    deleteUserArticle,
  } = useArticleStore();

  const location = useLocation();
  const id = article.id;

  // Bool for checking if we are on ArticleView, this will later be used if to remove the link on card
  const isInArticleView = location.pathname === `/article/${id}`;

  const handleDelete = () => {
  showCustomToast(({ closeToast }) => (
     <Box pad="small" gap="small">
      <p>Do you really want to delete this article? (You can't undo it...)</p>
      <button onClick={() => {
        deleteUserArticle(id);
        closeToast();
        showSuccess("Article was deleted");
      }}>Yes, delete</button>
      <button onClick={() => closeToast()}>No, abort</button>
    </Box>
  ));
};

  // Separate content for wrapping with link - or not
  const content = (
    <Box>
      <AiImage title={article.title} />
      <Heading
        level={isInArticleView ? 1 : 3}
        margin={{ top: "none", bottom: "xsmall" }}
        title={article.title}
        style={{
          whiteSpace: isInArticleView ? "normal" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: isInArticleView ? "1.5em" : "1.2em",
          textAlign: isInArticleView ? "center" : "left",
        }}
      >
        {article.title}
      </Heading>
      <Paragraph
        size="medium"
        margin={{ top: "none" }}
        style={
          !isInArticleView
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "5.2em",
              }
            : { whiteSpace: "pre-wrap", maxWidth: "100%", marginInline: "1rem" }
        }
      >
        {article.body}
      </Paragraph>
    </Box>
  );
  return (
    <Box
      pad="medium"
      background="cardBackground"
      color="text"
      round="small"
      elevation="small"
      gap="small"
    >
      {/* Makes the article clickable in ArticleView */}
      {!isInArticleView ? (
        <Link
          to={`/article/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {content}
        </Link>
      ) : (
        content
      )}
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ top: "small" }}
      >
        <Box direction="row" gap="medium" align="center">
          <Button
            plain
            onClick={() => incrementLike(id)}
            label="👍"
            style={{ fontSize: "1.5em" }}
          />
          <span style={{ fontSize: "1.2em" }}>{getLikes(id)}</span>
          <Button
            plain
            onClick={() => incrementDislike(id)}
            label="👎"
            style={{ fontSize: "1.5em" }}
          />
          <span style={{ fontSize: "1.2em" }}>{getDislikes(id)}</span>
        </Box>
        <Box direction="row" gap="medium">
          <Button
            plain
            label="🚫"
            onClick={handleDelete}
            style={{ fontSize: "1.4em" }}
          />
          <Button
            plain
            onClick={() => toggleFavorite(id)}
            label={isFavorite(id) ? "❤️" : "🩶"}
            style={{ fontSize: "1.5em" }}
          />
        </Box>
      </Box>
      {isInArticleView && onBack && (
        <Button
          label="← Go back"
          onClick={onBack}
          margin={{ bottom: "small", top: "medium" }}
        />
      )}
    </Box>
  );
};

export default ArticleCard;
