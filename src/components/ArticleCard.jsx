import AiImage from './AiImage';

const ArticleCard = ({ article }) => {
  return (
    <div>
      <h3>{article.title}</h3>
      <AiImage title={article.title} />
      <p>{article.body}</p>
    </div>
  );
};

export default ArticleCard;