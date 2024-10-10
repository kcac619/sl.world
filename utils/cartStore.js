import { create } from "zustand";

import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.SolitaireID === item.SolitaireID
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.SolitaireID === item.SolitaireID
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        });
      },
      removeFromCart: (solitaireId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.SolitaireID !== solitaireId
          ),
        }));
      },
      updateQuantity: (solitaireId, newQuantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.SolitaireID === solitaireId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }));
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage", // unique name for the storage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCartStore;
