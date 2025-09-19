import { create } from "zustand";
import { extractReactions, removeHiddenOrDeletedFavorites } from "../utils/articleUtils";
import { saveToStorage, loadFromStorage } from "../utils/storageUtils";


const useArticleStore = create((set, get) => ({
  // State
  apiArticles: [],
  userArticles: [],
  favorites: [],
  likes: [],
  dislikes: [],
  hiddenApiArticles: [],

  setApiArticles: (articles) => {
    const existingLikes = get().likes;
    const existingDislikes = get().dislikes;
    const { likes, dislikes } = extractReactions(articles, existingLikes, existingDislikes);

    saveToStorage("likes", likes);
    saveToStorage("dislikes", dislikes);

    set({ apiArticles: articles, likes, dislikes });
  },

  addApiArticles: (newArticles) => {
    set((state) => {
      const { likes, dislikes } = extractReactions(newArticles, state.likes, state.dislikes);
      const combinedArticles = [...state.apiArticles, ...newArticles];

      saveToStorage("likes", likes);
      saveToStorage("dislikes", dislikes);

      return { apiArticles: combinedArticles, likes, dislikes };
    });
  },

  loadUserArticles: () => {
    const parsed = loadFromStorage("userArticles", []);
    set({ userArticles: parsed });
  },

  addUserArticle: (article) => {
    set((state) => {
      const updated = [...state.userArticles, article];
      saveToStorage("userArticles", updated);
      return { userArticles: updated };
    });
  },

  deleteUserArticle: (id) => {
    set((state) => {
      const updated = state.userArticles.filter((a) => a.id !== id);
      const updatedFavorites = removeHiddenOrDeletedFavorites(
        state.favorites,
        updated,
        state.apiArticles,
        state.hiddenApiArticles
      );

      saveToStorage("userArticles", updated);
      saveToStorage("favorites", updatedFavorites);

      return {
        userArticles: updated,
        favorites: updatedFavorites,
      };
    });
  },

 toggleFavorite: (id) => {
  set((state) => {
    const isFavorite = state.favorites.includes(id);
    const updatedFavorites = isFavorite
      ? state.favorites.filter((favoriteId) => favoriteId !== id)
      : [...state.favorites, id];

    saveToStorage("favorites", updatedFavorites);
    return { favorites: updatedFavorites };
  });
},
  isFavorite: (id) => {
    return get().favorites.includes(id);
  },

  loadFavorites: () => {
    const previousFavorites = loadFromStorage("favorites", []);
    const { userArticles, apiArticles, hiddenApiArticles } = get();

    const cleaned = removeHiddenOrDeletedFavorites(
      previousFavorites,
      userArticles,
      apiArticles,
      hiddenApiArticles
    );

    set({ favorites: cleaned });
  },

  //For test, should be a better logic and use with API
  incrementLike: (id) => {
    set((state) => {
      const newLikes = { ...state.likes };
      newLikes[id] = (newLikes[id] || 0) + 1;
      saveToStorage("likes", newLikes);
      return { likes: newLikes };
    });
  },

  //For test, should be a better logic and use with API
  incrementDislike: (id) => {
    set((state) => {
      const newDislikes = { ...state.dislikes };
      newDislikes[id] = (newDislikes[id] || 0) + 1;
      saveToStorage("dislikes", newDislikes);
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
    const likes = loadFromStorage("likes", {});
    const dislikes = loadFromStorage("dislikes", {});
    set({ likes, dislikes });
  },

  hideApiArticle: (id) => {
    set((state) => {
      const updatedHidden = [...state.hiddenApiArticles, id];
      const updatedFavorites = removeHiddenOrDeletedFavorites(
        state.favorites,
        state.userArticles,
        state.apiArticles,
        updatedHidden
      );

      saveToStorage("hiddenApiArticles", updatedHidden);
      saveToStorage("favorites", updatedFavorites);

      return {
        hiddenApiArticles: updatedHidden,
        favorites: updatedFavorites,
      };
    });
  },

  loadHiddenApiArticles: () => {
    const parsed = loadFromStorage("hiddenApiArticles", []);
    set({ hiddenApiArticles: parsed });
  },

  isApiArticleHidden: (id) => {
    return get().hiddenApiArticles.includes(id);
  },
}));

export default useArticleStore;