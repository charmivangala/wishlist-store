import { useEffect, useState, useCallback } from 'react'
import { loadWishlists, saveWishlists, makeId } from './storage.js'
import { mergeWishlists } from './wishlist.js'

/**
 * Central place for all wishlist state + mutations. Persists to localStorage
 * on every change. Both Home and Wishlist pages consume this single hook
 * (instantiated once in App) so state stays in sync across routes.
 */
export default function useWishlists() {
  const [wishlists, setWishlists] = useState(() => loadWishlists())

  useEffect(() => {
    saveWishlists(wishlists)
  }, [wishlists])

  const createWishlist = useCallback((name) => {
    const list = { id: makeId(), name, items: [] }
    setWishlists((prev) => [...prev, list])
    return list
  }, [])

  const renameWishlist = useCallback((id, newName) => {
    setWishlists((prev) => prev.map((w) => (w.id === id ? { ...w, name: newName } : w)))
  }, [])

  const deleteWishlist = useCallback((id) => {
    setWishlists((prev) => prev.filter((w) => w.id !== id))
  }, [])

  // Returns 'added' | 'removed' | 'duplicate' so callers can show the right toast.
  const toggleProductInList = useCallback((listId, productId) => {
    let result = 'added'
    setWishlists((prev) =>
      prev.map((w) => {
        if (w.id !== listId) return w
        if (w.items.includes(productId)) {
          result = 'removed'
          return { ...w, items: w.items.filter((id) => id !== productId) }
        }
        result = 'added'
        return { ...w, items: [...w.items, productId] }
      })
    )
    return result
  }, [])

  // Adds a product to a list, but returns 'duplicate' without mutating if it's already there.
  const addProductToList = useCallback((listId, productId) => {
    let result = 'added'
    setWishlists((prev) =>
      prev.map((w) => {
        if (w.id !== listId) return w
        if (w.items.includes(productId)) {
          result = 'duplicate'
          return w
        }
        return { ...w, items: [...w.items, productId] }
      })
    )
    return result
  }, [])

  const removeProductFromList = useCallback((listId, productId) => {
    setWishlists((prev) =>
      prev.map((w) => (w.id === listId ? { ...w, items: w.items.filter((id) => id !== productId) } : w))
    )
  }, [])

  // Removes a product from every wishlist (used by the home page heart toggle,
  // which treats "already saved anywhere" -> click -> "remove from that list").
  const removeProductFromAllLists = useCallback((productId) => {
    setWishlists((prev) => prev.map((w) => ({ ...w, items: w.items.filter((id) => id !== productId) })))
  }, [])

  const mergeIntoNewList = useCallback((firstId, secondId, name) => {
    setWishlists((prev) => {
      const first = prev.find((w) => w.id === firstId)
      const second = prev.find((w) => w.id === secondId)
      if (!first || !second) return prev
      const merged = mergeWishlists(first, second, name)
      return [...prev, merged]
    })
  }, [])

  return {
    wishlists,
    createWishlist,
    renameWishlist,
    deleteWishlist,
    toggleProductInList,
    addProductToList,
    removeProductFromList,
    removeProductFromAllLists,
    mergeIntoNewList,
  }
}
