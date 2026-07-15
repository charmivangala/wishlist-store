export default function Modal({ title, onClose, children, widthClass = 'max-w-sm' }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/40 px-4"
      onClick={onClose}
    >
      <div
        className={`bg-panel w-full ${widthClass} rounded-xl2 shadow-card p-5 sm:p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-ink">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink/50 hover:text-ink transition-colors text-xl leading-none px-1"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
