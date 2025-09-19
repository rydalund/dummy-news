import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useArticleStore from "../store/useArticleStore";
import { ARTICLE_FETCH_SIZE, API_URL } from "../configs/config";

const useArticles = () => {
  const {
    apiArticles,
    setApiArticles,
    addApiArticles,
    userArticles,
    loadUserArticles,
    loadFavorites,
    loadReactions,
    loadHiddenApiArticles,
    isApiArticleHidden,
  } = useArticleStore();

  const [articlesToSkip, setArticlesToSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserArticles();
    loadReactions();
    loadHiddenApiArticles();

    const fetchInitialArticles = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}?limit=${ARTICLE_FETCH_SIZE}&skip=0`);
        const newArticles = res.data.posts;
        setApiArticles(newArticles);
        setArticlesToSkip(ARTICLE_FETCH_SIZE);

        if (ARTICLE_FETCH_SIZE >= res.data.total) {
          setHasMore(false);
        }
        //Last - go get correct favorites without hidden/deleted
        loadFavorites();
      } catch (error) {
        console.error("Error fetching initial articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const sortedUserArticles = userArticles
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const visibleApiArticles = apiArticles.filter(
    (article) => !isApiArticleHidden(article.id)
  );

  const allArticles = [...sortedUserArticles, ...visibleApiArticles];

  return {
    articles: allArticles,
    fetchMoreArticles,
    hasMore,
    isLoading,
  };
};

export default useArticles;