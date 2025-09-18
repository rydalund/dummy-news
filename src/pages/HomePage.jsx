import ArticleGrid from "../components/ArticleGrid";
import useHomePageArticles from "../hooks/useHomePageArticles";

const HomePage = () => {
  const { articles, fetchMoreArticles, hasMore, isLoading } = useHomePageArticles();

  return (
    <ArticleGrid
      articles={articles}
      fetchMore={fetchMoreArticles}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};

export default HomePage;