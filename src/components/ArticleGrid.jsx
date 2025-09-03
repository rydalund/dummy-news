import { Grid } from 'grommet';
import ArticleCard from './ArticleCard';

const ArticleGrid = ({ articles }) => {
  return (
    <Grid
      columns={{ count: 'fit', size: 'medium' }}
      gap="medium"
      pad="medium"
    >
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Grid>
  );
};

export default ArticleGrid;