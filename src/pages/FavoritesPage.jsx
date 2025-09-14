import { Box, Grid, Heading } from "grommet";
import useArticleStore from "../store/useArticleStore";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, apiArticles, userArticles } = useArticleStore();
  const allArticles = [...userArticles, ...apiArticles];

  // Filter articles with both id number from api and Form uuid
  const favoriteArticles = allArticles.filter((a) =>
    favorites.map(String).includes(String(a.id))
  );

  return (
    <Box pad="medium">
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
            No favorites yet 💔– read all our articles{" "}
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
              <ArticleCard key={String(article.id)} article={article} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;
