// Thin wrapper around localStorage so the rest of the app never touches
// window.localStorage directly. All wishlist data lives under one key.

const STORAGE_KEY = 'wishlist-store:wishlists'

/**
 * Wishlist shape: { id: string, name: string, items: string[] }
 * `items` is an array of product ids (not full product objects) so a
 * wishlist is just a set reference — cheap to store, cheap to merge.
 */

export function loadWishlists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to read wishlists from localStorage', err)
    return []
  }
}

export function saveWishlists(wishlists) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlists))
  } catch (err) {
    console.error('Failed to save wishlists to localStorage', err)
  }
}

export function makeId(prefix = 'wl') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
