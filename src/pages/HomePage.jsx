import { useEffect } from 'react';
import ArticleGrid from '../components/ArticleGrid';
import useArticleStore from '../store/useArticleStore';
import axios from 'axios';

const HomePage = () => {
  const { apiArticles, setApiArticles, userArticles, loadUserArticles } = useArticleStore();

  useEffect(() => {
    loadUserArticles();

    const fetchArticles = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/posts');
        setApiArticles(res.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [loadUserArticles, setApiArticles]);

  const allArticles = [...apiArticles, ...userArticles];

  return <ArticleGrid articles={allArticles} />;
};

export default HomePage;