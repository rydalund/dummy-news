import ArticleGrid from "../components/ArticleGrid";
import useArticles from "../hooks/useArticles";

const HomePage = () => {
  const { articles, fetchMoreArticles, hasMore, isLoading, } = useArticles();

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