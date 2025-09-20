import { useEffect } from "react";
import { Box } from "grommet";
import { useParams, useNavigate } from "react-router-dom";
import useArticleStore from "../store/useArticleStore";
import ArticleCard from "../components/ArticleCard";

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiArticles, userArticles } = useArticleStore();
  const allArticles = [...userArticles, ...apiArticles];
  const article = allArticles.find((a) => a.id?.toString() === id);

  useEffect(() => {
    if (!article) {
      navigate("/", { replace: true });
    }
  }, [article, navigate]);

  if (!article) {
    // Replace url to fix problem with go back from article on delete
    return null;
  }

  return (
    <Box pad="medium" align="center" justify="center">
      <Box width="large" pad="small">
        <ArticleCard article={article} onBack={() => navigate(-1)} />
      </Box>
    </Box>
  );
};

export default ArticleView;