// Pure helper functions for wishlist operations. Kept separate from
// components/state so the merge logic is easy to unit test and reason about.

/**
 * Merge two wishlists into a brand-new wishlist.
 * - Union of product ids, de-duplicated (Set handles this in O(n)).
 * - Two empty lists merge into an empty list.
 * - An empty list merged with a populated list yields the populated list's items.
 * - Does not mutate the inputs.
 */
export function mergeWishlists(listA, listB, mergedName) {
  const combinedIds = new Set([...listA.items, ...listB.items])
  return {
    id: `wl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: mergedName?.trim() || `${listA.name} + ${listB.name}`,
    items: Array.from(combinedIds),
  }
}

export function listContainsProduct(list, productId) {
  return list.items.includes(productId)
}

// Returns the ids of every wishlist a given product currently appears in.
export function wishlistsContainingProduct(wishlists, productId) {
  return wishlists.filter((w) => w.items.includes(productId)).map((w) => w.id)
}
