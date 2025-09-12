import { create } from "zustand";

const useArticleStore = create((set) => ({
  // State
  apiArticles: [],
  userArticles: [],

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
}));

export default useArticleStore;
