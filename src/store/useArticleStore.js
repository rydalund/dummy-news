import { create } from "zustand";

const useArticleStore = create((set, get) => ({
  // State
  apiArticles: [],
  userArticles: [],
  favorites: [],
  likes: [],
  dislikes: [],
  hiddenApiArticles: [],
  

  setApiArticles: (articles) => set({ apiArticles: articles }),

  addApiArticles: (newArticles) =>
    set((state) => ({
      apiArticles: [...state.apiArticles, ...newArticles],
    })),

  loadUserArticles: () => {
    const saved = localStorage.getItem("userArticles");
    const parsed = saved ? JSON.parse(saved) : [];
    set({ userArticles: parsed });
  },

  /*addUserArticle: (article) => {
    set((state) => {
      const updated = [...state.userArticles, article];
      localStorage.setItem("userArticles", JSON.stringify(updated));
      return { userArticles: updated };
    });
  },*/

  addUserArticle: (article) => {
  const articleWithFlag = { ...article, isUserCreated: true };
  set((state) => {
    const updated = [...state.userArticles, articleWithFlag];
    localStorage.setItem("userArticles", JSON.stringify(updated));
    return { userArticles: updated };
  });
},

  deleteUserArticle: (id) => {
    set((state) => {
      const updated = state.userArticles.filter((a) => a.id !== id);
      localStorage.setItem("userArticles", JSON.stringify(updated));
      return { userArticles: updated };
    });
  },

  toggleFavorite: (id) => {
    set((state) => {
      const isFavorite = state.favorites.includes(id);
      const updated = isFavorite
        ? state.favorites.filter((favoriteId) => favoriteId !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    });
  },

  isFavorite: (id) => {
    return get().favorites.includes(id);
  },

  loadFavorites: () => {
    const saved = localStorage.getItem("favorites");
    const parsed = saved ? JSON.parse(saved) : [];
    set({ favorites: parsed });
  },

  toggleLike: (id) => {
    set((state) => {
      const alreadyLiked = state.likes.includes(id);
      const newLikes = alreadyLiked
        ? state.likes.filter((likeId) => likeId !== id)
        : [...state.likes, id];
      const newDislikes = state.dislikes.filter((dislikeId) => dislikeId !== id);

      localStorage.setItem("likes", JSON.stringify(newLikes));
      localStorage.setItem("dislikes", JSON.stringify(newDislikes));

      return { likes: newLikes, dislikes: newDislikes };
    });
  },

  //For test, should be a better logic and use with API
  incrementLike: (id) => {
    set((state) => {
      const newLikes = { ...state.likes };
      newLikes[id] = (newLikes[id] || 0) + 1;
      localStorage.setItem("likes", JSON.stringify(newLikes));
      return { likes: newLikes };
    });
  },

//For test, should be a better logic and use with API
  incrementDislike: (id) => {
    set((state) => {
      const newDislikes = { ...state.dislikes };
      newDislikes[id] = (newDislikes[id] || 0) + 1;
      localStorage.setItem("dislikes", JSON.stringify(newDislikes));
      return { dislikes: newDislikes };
    });
  },

  getLikes: (id) => {
    return get().likes[id] || 0;
  },

  getDislikes: (id) => {
    return get().dislikes[id] || 0;
  },

  loadReactions: () => {
    const savedLikes = localStorage.getItem("likes");
    const savedDislikes = localStorage.getItem("dislikes");
    const likes = savedLikes ? JSON.parse(savedLikes) : {};
    const dislikes = savedDislikes ? JSON.parse(savedDislikes) : {};
    set({ likes, dislikes });
  },

  hideApiArticle: (id) => {
  set((state) => {
    const updated = [...state.hiddenApiArticles, id];
    localStorage.setItem("hiddenApiArticles", JSON.stringify(updated));
    return { hiddenApiArticles: updated };
  });
},

loadHiddenApiArticles: () => {
  const saved = localStorage.getItem("hiddenApiArticles");
  const parsed = saved ? JSON.parse(saved) : [];
  set({ hiddenApiArticles: parsed });
},
isApiArticleHidden: (id) => {
  return get().hiddenApiArticles.includes(id);
}

}));

export default useArticleStore;