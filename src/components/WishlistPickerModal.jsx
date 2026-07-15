import { useState } from 'react'
import Modal from './Modal.jsx'

/**
 * Shown after clicking a product's heart icon (only for the "add" path —
 * removal happens instantly with no modal, per spec). Lets the user pick an
 * existing wishlist or create a brand new one on the spot.
 */
export default function WishlistPickerModal({ wishlists, onPick, onCreateAndPick, onClose }) {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  function handleCreate() {
    const trimmed = newName.trim()
    if (!trimmed) return
    onCreateAndPick(trimmed)
  }

  return (
    <Modal title="Add to wishlist" onClose={onClose}>
      {wishlists.length === 0 && !creating && (
        <p className="text-sm text-ink/60 mb-4">
          You don&apos;t have any wishlists yet. Create your first one below.
        </p>
      )}

      {!creating && wishlists.length > 0 && (
        <ul className="space-y-2 mb-4 max-h-56 overflow-y-auto">
          {wishlists.map((w) => (
            <li key={w.id}>
              <button
                onClick={() => onPick(w.id)}
                className="w-full text-left px-4 py-2.5 rounded-lg border border-line hover:border-moss-400 hover:bg-moss-50 transition-colors text-sm font-medium flex items-center justify-between"
              >
                <span>{w.name}</span>
                <span className="text-xs text-ink/40">{w.items.length} item{w.items.length === 1 ? '' : 's'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {creating ? (
        <div className="space-y-3">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="e.g. Weekend Getaway"
            className="w-full px-3 py-2 rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-moss-400 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="flex-1 bg-moss-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-lg hover:bg-moss-700 transition-colors"
            >
              Create &amp; add
            </button>
            <button
              onClick={() => setCreating(false)}
              className="px-3 py-2 rounded-lg border border-line text-sm text-ink/60 hover:bg-canvas"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="w-full px-4 py-2.5 rounded-lg border border-dashed border-moss-400 text-moss-700 text-sm font-medium hover:bg-moss-50 transition-colors"
        >
          + Create new wishlist
        </button>
      )}
    </Modal>
  )
}
