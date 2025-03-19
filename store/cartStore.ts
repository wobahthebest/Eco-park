import { create } from "zustand";

export interface CartItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface CartState {
  cart: CartItem[];
  likedItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  toggleLike: (item: CartItem) => void;
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};
const loadLikedFromStorage = (): CartItem[] => {
  try {
    const storedLiked = localStorage.getItem("liked");
    return storedLiked ? JSON.parse(storedLiked) : [];
  } catch (error) {
    console.error("Failed to load liked items from localStorage:", error);
    return [];
  }
};

export const useCartStore = create<CartState>((set) => ({
  cart: loadCartFromStorage(),
  likedItems: loadLikedFromStorage(),

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    return set({ cart: [] });
  },

  toggleLike: (item) =>
    set((state) => {
      const isLiked = state.likedItems.some(
        (likedItem) => likedItem.id === item.id
      );
      let updatedLikedItems;

      if (isLiked) {
        updatedLikedItems = state.likedItems.filter(
          (likedItem) => likedItem.id !== item.id
        );
      } else {
        updatedLikedItems = [...state.likedItems, { ...item, liked: true }];
      }

      localStorage.setItem("liked", JSON.stringify(updatedLikedItems));
      return { likedItems: updatedLikedItems };
    }),
}));
