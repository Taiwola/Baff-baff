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
    // find index of identical item
    const idx = cart.items.findIndex((i) => isIdenticalItem(i, item));
    let newCartItems: CartItem[];

    if (idx > -1) {
      // update the quantity of the identical item
      newCartItems = cart.items.map((it, i) => i === idx ? { ...it, quantity: it.quantity + item.quantity } : it);
    } else {
      // add new item to cart
      newCartItems = [...cart.items, item];
    }

    // update local cart state immediately for better UX
    setCart((prev) => ({ ...prev, items: newCartItems }));

    // if there is a cart id (user is logged in), sync with server
    if (cart.id) {
      const { product, ...dto } = item
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
