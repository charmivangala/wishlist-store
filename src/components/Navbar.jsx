import { NavLink } from 'react-router-dom'

const linkBase =
  'px-3 py-2 rounded-lg text-sm font-medium transition-colors'

export default function Navbar({ wishlistCount }) {
  return (
    <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display text-xl tracking-tight text-ink">
          Field <span className="text-clay-500">&amp;</span> Fold
        </NavLink>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-moss-50 text-moss-700' : 'text-ink/70 hover:bg-moss-50/60'}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/wishlists"
            className={({ isActive }) =>
              `${linkBase} flex items-center gap-1.5 ${
                isActive ? 'bg-moss-50 text-moss-700' : 'text-ink/70 hover:bg-moss-50/60'
              }`
            }
          >
            <HeartIcon className="w-4 h-4" filled={false} />
            Wishlists
            {wishlistCount > 0 && (
              <span className="ml-1 text-xs bg-clay-500 text-white rounded-full px-1.5 py-0.5 leading-none">
                {wishlistCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export function HeartIcon({ filled, className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8}
    >
      <path d="M12 21s-6.7-4.35-9.5-8.2C.6 9.9 1.4 6.2 4.6 4.9 7 3.9 9.6 4.7 12 7.2c2.4-2.5 5-3.3 7.4-2.3 3.2 1.3 4 5 2.1 7.9C18.7 16.65 12 21 12 21z" />
    </svg>
  )
}
