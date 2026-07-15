import { useState } from 'react'
import Modal from './Modal.jsx'

export default function MergeModal({ wishlists, onMerge, onClose, showToast }) {
  const [firstId, setFirstId] = useState('')
  const [secondId, setSecondId] = useState('')
  const [mergedName, setMergedName] = useState('')
  const [error, setError] = useState('')

  function handleMerge() {
    if (!firstId || !secondId) {
      setError('Pick two wishlists to merge.')
      return
    }
    if (firstId === secondId) {
      // Spec requires this exact pop-up message.
      showToast('Select two different lists for merging')
      return
    }
    onMerge(firstId, secondId, mergedName.trim())
  }

  function ListSelect({ label, value, onChange, excludeId }) {
    return (
      <label className="block">
        <span className="text-xs font-medium text-ink/60 mb-1 block">{label}</span>
        <select
          value={value}
          onChange={(e) => {
            setError('')
            onChange(e.target.value)
          }}
          className="w-full px-3 py-2 rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-moss-400 text-sm bg-panel"
        >
          <option value="">Select a wishlist…</option>
          {wishlists.map((w) => (
            <option key={w.id} value={w.id} disabled={w.id === excludeId}>
              {w.name} ({w.items.length})
            </option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <Modal title="Merge two wishlists" onClose={onClose} widthClass="max-w-md">
      <div className="space-y-4">
        <ListSelect label="First wishlist" value={firstId} onChange={setFirstId} excludeId={secondId} />
        <ListSelect label="Second wishlist" value={secondId} onChange={setSecondId} excludeId={firstId} />

        <label className="block">
          <span className="text-xs font-medium text-ink/60 mb-1 block">Name for merged list (optional)</span>
          <input
            value={mergedName}
            onChange={(e) => setMergedName(e.target.value)}
            placeholder="e.g. Combined Favorites"
            className="w-full px-3 py-2 rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-moss-400 text-sm"
          />
        </label>

        {error && (
          <p className="text-sm text-clay-600 bg-clay-400/10 border border-clay-400/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handleMerge}
          className="w-full bg-clay-500 hover:bg-clay-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          Merge lists
        </button>
        <p className="text-xs text-ink/40 text-center">
          Duplicate products across the two lists are kept only once in the result.
        </p>
      </div>
    </Modal>
  )
}
