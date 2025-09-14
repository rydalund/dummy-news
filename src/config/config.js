export const ARTICLE_FETCH_SIZE = 20;
export const API_URL = 'https://dummyjson.com/posts';
export const getAiImageUrl = (title) =>`https://image.pollinations.ai/prompt/${encodeURIComponent(title)}`;