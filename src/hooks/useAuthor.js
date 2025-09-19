import { useEffect, useState } from "react";
import axios from "axios";
import { NO_AUTH_USER_ID, NO_AUTH_USER_NAME, USER_API_URL } from "../configs/config";

const useAuthor = (userId) => {
  const [authorName, setAuthorName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If the article is created from form, set written by directly
    if (userId === NO_AUTH_USER_ID) {
      setAuthorName(NO_AUTH_USER_NAME);
      return;
    }

    if (!userId) return;

    const fetchAuthor = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${USER_API_URL}/${userId}`);
        const user = response.data;
        setAuthorName(`${user.firstName} ${user.lastName}`);
      } catch (error) {
        console.error("Failed to fetch author:", error);
        setAuthorName(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [userId]);

  return { authorName, isLoading };
};

export default useAuthor;