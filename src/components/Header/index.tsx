import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search as SearchIcon, Heart, ChevronDown } from 'lucide-react'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { CATEGORIES } from '@/data/categories'
import { useFavorites } from '@/hooks/usePlayerData'

interface HeaderProps {
  /** Used on the gameplay screen — keeps the logo + exit affordances, drops the rest (Section 17: don't clutter gameplay). */
  minimal?: boolean
}

export default function Header({ minimal = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const catRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const q = searchValue.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    setMobileSearchOpen(false)
    setMobileOpen(false)
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn-focus rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-text' : 'text-textMuted hover:text-text'
    }`

  const mobileLinkClass = 'block rounded-lg px-3 py-2.5 text-sm font-medium text-textMuted transition-colors hover:bg-surface2 hover:text-text'

  return (
    <header className="glass sticky top-0 z-40">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Logo />

        {!minimal && (
          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/games" className={linkClass}>
              Games
            </NavLink>
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={catOpen}
                className="btn-focus flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-textMuted transition-colors hover:text-text"
              >
                Categories
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div role="menu" className="glass absolute left-0 top-full mt-2 grid w-64 grid-cols-1 gap-0.5 rounded-xl p-2 shadow-glow">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      role="menuitem"
                      to={`/category/${c.id}`}
                      onClick={() => setCatOpen(false)}
                      className="btn-focus rounded-lg px-3 py-2 text-sm text-textMuted transition-colors hover:bg-surface2 hover:text-text"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/popular" className={linkClass}>
              Popular
            </NavLink>
            <NavLink to="/new" className={linkClass}>
              New
            </NavLink>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          {!minimal && (
            <form onSubmit={submitSearch} className="relative hidden items-center sm:flex">
              <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                placeholder="Search games..."
                aria-label="Search games"
                className="btn-focus w-40 rounded-full border border-text/10 bg-surface py-2 pl-9 pr-3 text-sm text-text placeholder:text-muted transition-[width] focus:w-56"
              />
            </form>
          )}

          {!minimal && (
            <button
              onClick={() => setMobileSearchOpen((o) => !o)}
              className="btn-focus rounded-full p-2 text-textMuted transition-colors hover:bg-surface2 hover:text-text sm:hidden"
              aria-label="Search"
              aria-expanded={mobileSearchOpen}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          )}

          <ThemeToggle />

          <Link
            to="/favorites"
            className="btn-focus relative rounded-full p-2 text-textMuted transition-colors hover:bg-surface2 hover:text-text"
            aria-label={`Favorites, ${favorites.length} saved`}
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="stat-mono absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {!minimal && (
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="btn-focus rounded-full p-2 text-textMuted transition-colors hover:bg-surface2 hover:text-text lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {mobileSearchOpen && !minimal && (
        <form onSubmit={submitSearch} className="border-t border-text/5 px-4 py-3 sm:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              placeholder="Search games..."
              aria-label="Search games"
              className="btn-focus w-full rounded-full border border-text/10 bg-surface py-2.5 pl-9 pr-3 text-sm text-text placeholder:text-muted"
            />
          </div>
        </form>
      )}

      {mobileOpen && !minimal && (
        <nav aria-label="Mobile" className="space-y-1 border-t border-text/5 px-4 py-3 lg:hidden">
          <Link to="/" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Home
          </Link>
          <Link to="/games" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Games
          </Link>
          <Link to="/popular" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Popular
          </Link>
          <Link to="/trending" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Trending
          </Link>
          <Link to="/new" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            New Games
          </Link>
          <Link to="/favorites" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Favorites
          </Link>
          <Link to="/feedback" onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
            Feedback & Ratings
          </Link>
          <div className="pt-3">
            <p className="eyebrow px-3 pb-1.5">Categories</p>
            <div className="grid grid-cols-2 gap-0.5">
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/category/${c.id}`} onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
