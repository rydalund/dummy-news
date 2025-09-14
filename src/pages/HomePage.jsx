import { useEffect, useState, useCallback } from "react";
import ArticleGrid from "../components/ArticleGrid";
import useArticleStore from "../store/useArticleStore";
import axios from "axios";
import { ARTICLE_FETCH_SIZE, API_URL } from "../config/config";

//Adding reactions on articles to simulate real ones from API
const addRandomReactions = (articles) => {
  return articles.map((article) => ({
    ...article,
    likes:
      article.likes !== undefined
        ? article.likes
        : Math.floor(Math.random() * 11), // 0–10
    dislikes:
      article.dislikes !== undefined
        ? article.dislikes
        : Math.floor(Math.random() * 6), // 0–5
  }));
};

const HomePage = () => {
  const {
    apiArticles,
    setApiArticles,
    addApiArticles,
    userArticles,
    loadUserArticles,
    loadFavorites, 
    loadReactions,
  } = useArticleStore();

  const [articlesToSkip, setArticlesToSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserArticles();
    loadFavorites();
    loadReactions();

    const fetchInitialArticles = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `${API_URL}?limit=${ARTICLE_FETCH_SIZE}&skip=0`
        );
        const newArticles = res.data.posts;

        setApiArticles(newArticles);
        setArticlesToSkip(ARTICLE_FETCH_SIZE);

        if (ARTICLE_FETCH_SIZE >= res.data.total) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching initial articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite scroll
  const fetchMoreArticles = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}?limit=${ARTICLE_FETCH_SIZE}&skip=${articlesToSkip}`
      );
      const newArticles = res.data.posts;

      addApiArticles(newArticles);
      const newSkip = articlesToSkip + ARTICLE_FETCH_SIZE;
      setArticlesToSkip(newSkip);

      if (newSkip >= res.data.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, articlesToSkip, addApiArticles]);

  // Sorting user articles
  const sortedUserArticles = userArticles
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Puts all article together, with user articles first
  // Combine and add random reactions
const allArticles = addRandomReactions([
  ...sortedUserArticles,
  ...apiArticles,
]);
  return (
    <ArticleGrid
      articles={allArticles}
      fetchMore={fetchMoreArticles}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};

export default HomePage;