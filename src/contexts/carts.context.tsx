'use client'

import { CartDto } from '@validations/cart'
import { updateCart, syncCart, getCart } from '@actions/carts.action'
import { UpdateCartDto } from '@validations/cart/update-cart.validation'
import React, { createContext, ReactNode, useContext, useState } from 'react'

type CartContextType = {
  cart: Cart
  reset: () => void;
  fetchCart: () => Promise<Cart | null>
  addItem: (item: CartItem) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  syncWithServer: (cart: Cart) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
}

type Props = {
  children: ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultCart: Cart = {
  items: [],
  createdAt: '',
  updatedAt: ''
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<Cart>(defaultCart);

  async function fetchCart() {
    const serverCart = await getCart()
    if (serverCart) setCart(serverCart)
    return serverCart
  }

  // The user is a guest with no guest cart 
  async function syncWithServer(cart: Cart) {
    // create or get cart; server will set cookie
    const items: CartDto['items'] = cart.items.map((item) => ({ ...item, productId: item.product.id }))
    const syncedCart = await syncCart({ items })
    if (syncedCart) {
      setCart(syncedCart)
    }
  }

  async function addItem(item: CartItem) {

    console.log("Adding item to cart function called with item:", item)
    // Normalize price to number (handle string from form input)
    const normalizedItem: CartItem = {
      ...item,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
    }
    
    // Validate price is a valid number
    if (isNaN(normalizedItem.price) || normalizedItem.price <= 0) {
      console.error('Invalid price:', item.price)
      return
    }

    // find index of identical item (use normalizedItem)
    const idx = cart.items.findIndex((i) => isIdenticalItem(i, normalizedItem));
    let newCartItems: CartItem[];

    if (idx > -1) {
      // update the quantity of the identical item (use normalizedItem)
      newCartItems = cart.items.map((it, i) => i === idx ? { ...it, quantity: it.quantity + normalizedItem.quantity } : it);
    } else {
      // add new item to cart (use normalizedItem)
      newCartItems = [...cart.items, normalizedItem];
    }

    // update local cart state immediately for better UX
    setCart((prev) => ({ ...prev, items: newCartItems }));

    // if there is a cart id (user is logged in), sync with server (use normalizedItem)
    if (cart.id) {
      const { product, ...dto } = normalizedItem
      const payload: UpdateCartDto = { action: 'add', item: { ...dto, productId: product.id } }
      const updatedCart = await updateCart(cart.id, payload)
      if (updatedCart) setCart(updatedCart)
    } else {
      await syncWithServer({ ...cart, items: newCartItems });
    }
  }


  async function updateItem(itemId: string, quantity: number) {
    const foundItem = cart.items.find(it => it.id === itemId)
    if (!foundItem) return

    // optimistic update cart item 
    const updatedItem = { ...foundItem, quantity }
    setCart((c) => ({ ...c, items: c.items.map(it => it.id === itemId ? updatedItem : it) }));

    // sync server
    if (cart.id) {
      const { product, ...dto } = updatedItem
      const payload: UpdateCartDto = { action: 'update', item: { ...dto, productId: product.id } }
      await updateCart(cart.id, payload)
    }
  }

  async function removeItem(itemId: string) {
    const foundItem = cart.items.find(it => it.id === itemId)
    if (!foundItem) return

    // optimistic update
    setCart((c) => ({ ...c, items: c.items.filter(it => it.id !== itemId) }));

    if (cart.id) {
      const { product, ...dto } = foundItem
      const payload: UpdateCartDto = { action: 'remove', item: { ...dto, productId: product.id } }
      await updateCart(cart.id, payload)
    }
  }

  function reset() {
    setCart(defaultCart)
  }

  function isIdenticalItem(existing: CartItem, incoming: CartItem) {
    return (existing.product.id === incoming.product.id) && (existing.size === incoming.size) && (existing.fitting === incoming.fitting)
  }

  return (
    <CartContext.Provider value={{ cart, reset, fetchCart, addItem, updateItem, removeItem, syncWithServer }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
