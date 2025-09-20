import { useEffect } from "react";
import { Box, Grid, Heading } from "grommet";
import { Link } from "react-router-dom";
import useArticleStore from "../store/useArticleStore";
import useArticles from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";

const FavoritesPage = () => {
  const { favorites, loadFavorites, loadUserArticles } = useArticleStore();
  const { articles, isLoading } = useArticles();

  useEffect(() => {
    loadFavorites();
    loadUserArticles();
  }, [loadFavorites, loadUserArticles]);

  if (isLoading) {
    return (
      <Box pad="medium" align="center">
        <Heading level={2}>Loading favorites...</Heading>
      </Box>
    );
  }

  const favoriteArticles = articles.filter((a) => favorites.includes(a.id));

  return (
    <Box pad="medium" margin={{ bottom: "large" }}>
      <Box align="center" margin={{ bottom: "medium" }}>
        <Heading
          level={1}
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "64px",
            textDecorationLine: "underline",
            textDecorationColor: "red",
            textDecorationThickness: "3px",
            textUnderlineOffset: "0.5em",
            textAlign: "center",
          }}
        >
          Your favorites:
        </Heading>
      </Box>

      {favoriteArticles.length === 0 ? (
        <Box align="center" pad="medium">
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "36px",
            }}
          >
            No favorites yet 💔 – read all our articles{" "}
            <Link to="/" style={{ color: "red", textDecoration: "underline" }}>
              here
            </Link>
          </p>
        </Box>
      ) : (
        <Box margin="auto">
          <Grid
            columns={{ count: 3, size: "small" }}
            gap="large"
            margin={{ horizontal: "xlarge" }}
          >
            {favoriteArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;
