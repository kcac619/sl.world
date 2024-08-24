"use-client";
// Helper functions for local storage (add these to your components or a utility file)

const getCartItemsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } else {
    console.warn("localStorage is not available in this environment");
    return [];
  }
};

const addToCart = (item) => {
  if (typeof window !== "undefined") {
    const cartItems = getCartItemsFromLocalStorage();
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.SolitaireID === item.SolitaireID
    );

    if (existingItemIndex !== -1) {
      // If item exists, update quantity
      cartItems[existingItemIndex].quantity += item.quantity; // Add the passed quantity
    } else {
      // If item doesn't exist, add it to the cart with the given quantity
      cartItems.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    console.warn("localStorage is not available in this environment.");
  }
};
const removeFromCart = (solitaireId) => {
  if (typeof window !== "undefined") {
    const cartItems = getCartItemsFromLocalStorage();
    const updatedCartItems = cartItems.filter(
      (item) => item.SolitaireID !== solitaireId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  } else {
    console.warn("localStorage is not available in this environment");
  }
};

const updateCartItemQuantity = (solitaireId, newQuantity) => {
  if (typeof window !== "undefined") {
    const cartItems = getCartItemsFromLocalStorage();
    const itemToUpdate = cartItems.find(
      (item) => item.SolitaireID === solitaireId
    );

    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  } else {
    console.warn("localStorage is not available in this environment");
  }
};

export {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};
