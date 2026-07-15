import { useState, useMemo } from 'react'
import products from '../data/products.js'
import MergeModal from '../components/MergeModal.jsx'
import Modal from '../components/Modal.jsx'

const productById = Object.fromEntries(products.map((p) => [p.id, p]))

export default function Wishlist({ wishlistApi, showToast }) {
  const {
    wishlists,
    createWishlist,
    renameWishlist,
    deleteWishlist,
    removeProductFromList,
    mergeIntoNewList,
  } = wishlistApi

  const [selectedId, setSelectedId] = useState(null)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [mergeOpen, setMergeOpen] = useState(false)

  const selectedList = useMemo(
    () => wishlists.find((w) => w.id === selectedId) || null,
    [wishlists, selectedId]
  )

  function handleCreate() {
    const trimmed = newName.trim()
    if (!trimmed) return
    createWishlist(trimmed)
    showToast(`Created wishlist "${trimmed}"`)
    setNewName('')
    setCreating(false)
  }

  function handleRenameSave(id) {
    const trimmed = renameValue.trim()
    if (!trimmed) return
    renameWishlist(id, trimmed)
    setRenamingId(null)
  }

  function handleMerge(firstId, secondId, name) {
    mergeIntoNewList(firstId, secondId, name)
    showToast('Wishlists merged successfully')
    setMergeOpen(false)
  }

  function handleDelete(id, name) {
    deleteWishlist(id)
    if (selectedId === id) setSelectedId(null)
    showToast(`Deleted wishlist "${name}"`)
  }

  // ---- Detail view: viewing products inside a single wishlist ----
  if (selectedList) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
        <button
          onClick={() => setSelectedId(null)}
          className="text-sm text-ink/60 hover:text-ink mb-4 inline-flex items-center gap-1"
        >
          &larr; All wishlists
        </button>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="font-display text-2xl sm:text-3xl text-ink">{selectedList.name}</h1>
          <span className="text-sm text-ink/50">
            {selectedList.items.length} item{selectedList.items.length === 1 ? '' : 's'}
          </span>
        </div>

        {selectedList.items.length === 0 ? (
          <div className="border border-dashed border-line rounded-xl2 py-16 text-center text-ink/50 text-sm">
            This wishlist is empty. Go back to Shop and tap the heart on a product to add it here.
          </div>
        ) : (
          <ul className="divide-y divide-line border border-line rounded-xl2 overflow-hidden bg-panel">
            {selectedList.items.map((productId) => {
              const product = productById[productId]
              if (!product) return null
              return (
                <li key={productId} className="flex items-center gap-4 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{product.name}</p>
                    <p className="text-sm text-ink/50">{product.category} · ${product.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      removeProductFromList(selectedList.id, productId)
                      showToast(`Removed "${product.name}" from "${selectedList.name}"`)
                    }}
                    className="text-sm text-clay-600 hover:text-clay-500 font-medium px-2 py-1"
                  >
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  // ---- Overview: all wishlists as a list of names ----
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 pb-28">
      <div className="mb-7">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Your wishlists</h1>
        <p className="text-ink/60 mt-1 text-sm sm:text-base">
          Organize saved items into named lists, then merge any two together.
        </p>
      </div>

      {wishlists.length === 0 && !creating && (
        <div className="border border-dashed border-line rounded-xl2 py-14 text-center text-ink/50 text-sm mb-6">
          No wishlists yet — create your first one below.
        </div>
      )}

      <ul className="space-y-3 mb-6">
        {wishlists.map((w) => (
          <li
            key={w.id}
            className="bg-panel border border-line rounded-xl2 shadow-card p-4 flex items-center justify-between gap-3"
          >
            {renamingId === w.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameSave(w.id)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-moss-400 text-sm"
                />
                <button
                  onClick={() => handleRenameSave(w.id)}
                  className="text-sm font-medium text-moss-700 px-2 py-1"
                >
                  Save
                </button>
                <button
                  onClick={() => setRenamingId(null)}
                  className="text-sm text-ink/50 px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setSelectedId(w.id)}
                  className="flex-1 text-left"
                >
                  <p className="font-display text-lg text-ink">{w.name}</p>
                  <p className="text-xs text-ink/50">
                    {w.items.length} item{w.items.length === 1 ? '' : 's'}
                  </p>
                </button>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setRenamingId(w.id)
                      setRenameValue(w.name)
                    }}
                    className="text-xs font-medium text-ink/50 hover:text-ink px-2 py-1.5 rounded-lg hover:bg-canvas"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => handleDelete(w.id, w.name)}
                    className="text-xs font-medium text-clay-600 hover:text-clay-500 px-2 py-1.5 rounded-lg hover:bg-canvas"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {creating ? (
        <div className="bg-panel border border-line rounded-xl2 p-4 flex flex-col sm:flex-row gap-2">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Wishlist name"
            className="flex-1 px-3 py-2 rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-moss-400 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="bg-moss-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-moss-700 transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setCreating(false)}
              className="px-4 py-2 rounded-lg border border-line text-sm text-ink/60"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="w-full border border-dashed border-moss-400 text-moss-700 text-sm font-medium py-3 rounded-xl2 hover:bg-moss-50 transition-colors"
        >
          + Create new wishlist
        </button>
      )}

      {/* Merge trigger, fixed to the bottom-right per spec */}
      {wishlists.length >= 2 && (
        <button
          onClick={() => setMergeOpen(true)}
          className="fixed bottom-6 right-6 bg-clay-500 hover:bg-clay-600 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-card transition-colors z-30"
        >
          Merge lists
        </button>
      )}

      {mergeOpen && (
        <MergeModal
          wishlists={wishlists}
          onMerge={handleMerge}
          onClose={() => setMergeOpen(false)}
          showToast={showToast}
        />
      )}
    </div>
  )
}
