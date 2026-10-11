import { Link } from 'react-router-dom'
import { Heart, Play, Star, ExternalLink } from 'lucide-react'
import GameThumb from '@/components/GameThumb'
import type { GameMeta } from '@/data/games'
import { CATEGORIES } from '@/data/categories'
import { useFavorites } from '@/hooks/usePlayerData'
import { formatPlayCount } from '@/utils/format'

export default function GameCard({ game }: { game: GameMeta }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(game.slug)
  const categoryLabel = CATEGORIES.find((c) => c.id === game.category)?.title ?? game.category

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-text/5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <Link to={`/games/${game.slug}`} className="btn-focus relative block aspect-[4/3] overflow-hidden">
        <GameThumb
          title={game.title}
          icon={game.icon}
          gradient={game.gradient}
          className="h-full w-full transition-transform duration-500 group-hover:scale-110"
        />
        {/* Desktop hover overlay — mobile never depends on hover (Section 12) */}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100 sm:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-bg shadow-lg">
            <Play className="h-3.5 w-3.5 fill-bg" /> {game.externalUrl ? 'View Details' : 'Play Now'}
          </span>
        </div>
        <div className="absolute left-2 top-2 flex gap-1">
          {game.new && <span className="badge bg-secondary text-bg">NEW</span>}
          {game.hot && <span className="badge bg-danger text-white">HOT</span>}
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(game.slug)}
        aria-pressed={fav}
        aria-label={fav ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
        className="btn-focus absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-transform active:scale-90"
      >
        <Heart className={`h-4 w-4 transition-colors ${fav ? 'fill-danger text-danger' : ''}`} />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link
          to={`/games/${game.slug}`}
          className="btn-focus line-clamp-1 rounded font-display text-sm font-semibold text-text hover:text-primary sm:text-base"
        >
          {game.title}
        </Link>
        <div className="flex items-center justify-between text-xs text-textMuted">
          <span>{categoryLabel}</span>
          <span className="stat-mono flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {game.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="stat-mono text-xs text-muted">{formatPlayCount(game.playCount)} plays</span>
          {game.externalUrl ? (
            <a href={game.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-focus flex items-center gap-0.5 rounded text-xs font-semibold text-primary sm:hidden">
              Play <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <Link to={`/games/${game.slug}/play`} className="btn-focus rounded text-xs font-semibold text-primary sm:hidden">
              Play →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
