import axios from "axios";
import { USER_API_URL, USER_FETCH_LIMIT, NO_AUTH_USER_ID, NO_AUTH_USER_NAME } from "../configs/config";

export const fetchUserMap = async () => {
  try {
    const res = await axios.get(`${USER_API_URL}?limit=${USER_FETCH_LIMIT}`);
    const users = res.data.users || [];

    const map = users.reduce((acc, user) => {
      acc[user.id] = user.firstName;
      return acc;
    }, {});

    map[NO_AUTH_USER_ID] = NO_AUTH_USER_NAME;

    return map;
  } catch (error) {
    console.error("Error fetching user map:", error);
    return { [NO_AUTH_USER_ID]: NO_AUTH_USER_NAME };
  }
};