export function extractReactions(articles, existingLikes = {}, existingDislikes = {}) {
  const likes = { ...existingLikes };
  const dislikes = { ...existingDislikes };

  articles.forEach((article) => {
    const id = article.id;
    if (likes[id] === undefined) {
      likes[id] = article.reactions?.likes ?? 0;
    }
    if (dislikes[id] === undefined) {
      dislikes[id] = article.reactions?.dislikes ?? 0;
    }
  });

  return { likes, dislikes };
}

export function removeHiddenOrDeletedFavorites(favorites, userArticles, apiArticles, hiddenApiArticles) {
  const articleIds = new Set([
    ...userArticles.map((a) => a.id),
    ...apiArticles
      .filter((a) => !hiddenApiArticles.includes(a.id))
      .map((a) => a.id),
  ]);

  return favorites.filter((id) => articleIds.has(id));
}