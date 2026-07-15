import { HeartIcon } from './Navbar.jsx'

export default function ProductCard({ product, isSaved, onHeartClick }) {
  return (
    <div className="group relative bg-panel rounded-xl2 shadow-card overflow-hidden flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-moss-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
        />
        <button
          onClick={() => onHeartClick(product)}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isSaved}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-card transition-colors ${
            isSaved ? 'bg-clay-500 text-white' : 'bg-white/90 text-ink/70 hover:text-clay-500'
          }`}
        >
          <HeartIcon filled={isSaved} className={`w-4.5 h-4.5 ${isSaved ? 'heart-pop' : ''}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs uppercase tracking-wide text-moss-600 font-medium">
          {product.category}
        </span>
        <h3 className="font-display text-base text-ink leading-snug">{product.name}</h3>
        <p className="mt-auto pt-2 font-semibold text-ink">${product.price}</p>
      </div>
    </div>
  )
}
