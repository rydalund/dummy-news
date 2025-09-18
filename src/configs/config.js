export const ARTICLE_FETCH_SIZE = 20;
export const API_URL = 'https://dummyjson.com/posts';
export const USER_API_URL = 'https://dummyjson.com/users';
export const USER_FETCH_LIMIT = 100;
export const NO_AUTH_USER_ID = "no-auth";
export const NO_AUTH_USER_NAME = "Inget inlogg"; //Because that's what it says... 🤷‍♂️
export const getAiImageUrl = (title) =>`https://image.pollinations.ai/prompt/${encodeURIComponent(title)}`;