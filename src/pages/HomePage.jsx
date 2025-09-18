import ArticleGrid from "../components/ArticleGrid";
import useHomePageArticles from "../hooks/useHomePageArticles";

const HomePage = () => {
  const { articles, fetchMoreArticles, hasMore, isLoading, userMap } = useHomePageArticles();

  return (
    <ArticleGrid
      articles={articles}
      userMap={userMap}
      fetchMore={fetchMoreArticles}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};

export default HomePage;