import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_URL, USER_FETCH_LIMIT, NO_AUTH_USER_ID, NO_AUTH_USER_NAME } from "../configs/config";

const useUserMap = () => {
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_URL}?limit=${USER_FETCH_LIMIT}`);
        const users = res.data.users || [];

        const map = users.reduce((acc, user) => {
          acc[user.id] = `${user.firstName} ${user.lastName}`;
          return acc;
        }, {});

        map[NO_AUTH_USER_ID] = NO_AUTH_USER_NAME;

        setUserMap(map);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return userMap;
};

export default useUserMap;