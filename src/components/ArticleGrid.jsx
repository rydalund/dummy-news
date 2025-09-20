import { useRef, useCallback } from "react";
import { Grid, Box, Text } from "grommet";
import ArticleCard from "./ArticleCard";
import Footer from "./Footer";

const ArticleGrid = ({ articles, fetchMore, hasMore, isLoading }) => {
  // useRef to keep a mutable reference to the IntersectionObserver instance
  // This allows persisting the observer between renders without re-creating it unnecessarily
  const observer = useRef();

  // useCallback memoizes the function so it only changes if dependencies change
  // This function is assigned as a ref to the last article element for infinite scrolling
  const lastArticleRef = useCallback(
    (node) => {
      // If currently loading, do not observe new elements
      if (isLoading) return;

      // If there is an existing observer, disconnect it to clean up old observations
      if (observer.current) observer.current.disconnect();

      // Create a new IntersectionObserver instance and store it in observer.current
      observer.current = new IntersectionObserver(
        (entries) => {
          // entries is an array of observed elements; we check the first one here
          if (entries[0].isIntersecting && hasMore) {
            fetchMore();
          }
        },
        { threshold: 0.5 } // Trigger callback when 50% of the target is visible
      );

      // If node exists (last article is rendered), start observing it
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMore] // Dependencies for useCallback
  );

  return (
    <>
      <Grid
        columns={{ count: "fit", size: "medium" }}
        gap="medium"
        pad="medium"
      >
        {articles.map((article, index) => {
          const isLast = index === articles.length - 1;

          return (
            <div
              key={article.id}
              // Attach the observer ref only to the last article element
              ref={isLast ? lastArticleRef : null}
              style={{ width: "100%" }}
            >
              <ArticleCard article={article} />
            </div>
          );
        })}
      </Grid>

      {/* Loading text while fetching more articles */}
      {isLoading && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Loading articles...
        </p>
      )}

      {/* Message when no more articles to load, and then show the Footer*/}
      {!hasMore && (
        <>
          <Box margin={{ top: "medium" }}>
            <Text textAlign="center">
              You've reached the end - no more articles to show
            </Text>
          </Box>

          <Box margin={{ top: "large" }}>
            <Footer />
          </Box>
        </>
      )}
    </>
  );
};

export default ArticleGrid;