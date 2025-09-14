import { create } from "zustand";

const useArticleStore = create((set, get) => ({
  // State
  apiArticles: [],
  userArticles: [],
  favorites: [],

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

  addUserArticle: (article) => {
    set((state) => {
      const updated = [...state.userArticles, article];
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
      const isFav = state.favorites.includes(id);
      const updated = isFav
        ? state.favorites.filter((favId) => favId !== id)
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
}));

export default useArticleStore;
