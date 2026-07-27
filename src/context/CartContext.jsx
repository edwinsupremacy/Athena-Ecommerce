import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "athena-cart";

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item, size, quantity) => {
    const stockAvailable = item.sizes.find((itemSize) => itemSize.size === size)?.stockAvailable ?? 0;
    setItems((currentItems) => {
      const existing = currentItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === size,
      );

      if (existing) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === size
            ? { ...cartItem, stockAvailable, quantity: Math.min(cartItem.quantity + quantity, stockAvailable) }
            : cartItem,
        );
      }

      return [
        ...currentItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          size,
          stockAvailable,
          quantity: Math.min(quantity, stockAvailable),
        },
      ];
    });
  };

  const updateQuantity = (id, size, delta) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.min(item.stockAvailable ?? item.quantity + delta, Math.max(1, item.quantity + delta)) }
          : item,
      ),
    );
  };

  const removeItem = (id, size) =>
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id || item.size !== size),
    );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, emptyCart: () => setItems([]) }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
