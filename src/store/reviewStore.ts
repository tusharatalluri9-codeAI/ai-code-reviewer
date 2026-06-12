import { create } from "zustand";
import type { CodeReview, ChatMessage, Language, ReviewPersona } from "../types";

interface ReviewStore {
  code: string;
  language: Language;
  persona: ReviewPersona;
  reviews: CodeReview[];
  currentReview: CodeReview | null;
  chatMessages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setPersona: (persona: ReviewPersona) => void;
  addReview: (review: CodeReview) => void;
  setCurrentReview: (review: CodeReview | null) => void;
  updateReview: (id: string, updates: Partial<CodeReview>) => void;
  addChatMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  code: `// Paste your code here or type to get started
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`,
  language: "javascript",
  persona: "senior-dev",
  reviews: [],
  currentReview: null,
  chatMessages: [],
  isLoading: false,
  error: null,
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setPersona: (persona) => set({ persona }),
  addReview: (review) =>
    set((state) => ({ reviews: [review, ...state.reviews] })),
  setCurrentReview: (review) => set({ currentReview: review }),
  updateReview: (id, updates) =>
    set((state) => ({
      reviews: state.reviews.map((r) =>
        r.id === id ? { ...r, ...updates } : r,
      ),
      currentReview:
        state.currentReview?.id === id
          ? { ...state.currentReview, ...updates }
          : state.currentReview,
    })),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearChat: () => set({ chatMessages: [] }),
}));
