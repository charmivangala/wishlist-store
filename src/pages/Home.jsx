import { useState, useMemo } from 'react'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import WishlistPickerModal from '../components/WishlistPickerModal.jsx'

export default function Home({ wishlistApi, showToast }) {
  const { wishlists, createWishlist, addProductToList, removeProductFromAllLists } = wishlistApi
  const [pickerProduct, setPickerProduct] = useState(null) // product awaiting a wishlist choice

  // A product counts as "saved" if it exists in at least one wishlist.
  const savedProductIds = useMemo(() => {
    const set = new Set()
    wishlists.forEach((w) => w.items.forEach((id) => set.add(id)))
    return set
  }, [wishlists])

  function handleHeartClick(product) {
    if (savedProductIds.has(product.id)) {
      removeProductFromAllLists(product.id)
      showToast(`Removed "${product.name}" from your wishlist`)
    } else {
      setPickerProduct(product)
    }
  }

  function handlePick(listId) {
    const list = wishlists.find((w) => w.id === listId)
    const result = addProductToList(listId, pickerProduct.id)
    if (result === 'duplicate') {
      showToast('This product already exists in that list')
    } else {
      showToast(`Added "${pickerProduct.name}" to "${list?.name}"`)
    }
    setPickerProduct(null)
  }

  function handleCreateAndPick(name) {
    const list = createWishlist(name)
    addProductToList(list.id, pickerProduct.id)
    showToast(`Created "${name}" and added "${pickerProduct.name}"`)
    setPickerProduct(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-7">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Shop the collection</h1>
        <p className="text-ink/60 mt-1 text-sm sm:text-base">
          Save pieces you love to a wishlist, then merge lists together whenever you like.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSaved={savedProductIds.has(product.id)}
            onHeartClick={handleHeartClick}
          />
        ))}
      </div>

      {pickerProduct && (
        <WishlistPickerModal
          wishlists={wishlists}
          onPick={handlePick}
          onCreateAndPick={handleCreateAndPick}
          onClose={() => setPickerProduct(null)}
        />
      )}
    </div>
  )
}
