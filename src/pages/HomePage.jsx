import { useEffect, useState, useCallback } from "react";
import ArticleGrid from "../components/ArticleGrid";
import useArticleStore from "../store/useArticleStore";
import axios from "axios";

import { ARTICLE_FETCH_SIZE, API_URL } from "../components/config";

const HomePage = () => {
  const {
    apiArticles,
    setApiArticles,
    addApiArticles,
    userArticles,
    loadUserArticles,
  } = useArticleStore();

  const [articlesToSkip, setArticlesToSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserArticles();

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
  }, [loadUserArticles, setApiArticles]);

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
  const allArticles = [...sortedUserArticles, ...apiArticles];

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