import { Link } from 'react-router-dom'
import { Play, Info, Star, Users, ExternalLink } from 'lucide-react'
import GameThumb from '@/components/GameThumb'
import type { GameMeta } from '@/data/games'
import { CATEGORIES } from '@/data/categories'
import { formatPlayCount } from '@/utils/format'

export default function GameHero({ game }: { game: GameMeta }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === game.category)?.title ?? game.category

  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-20`} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
        <div className="order-2 animate-fadeUp lg:order-1">
          <p className="eyebrow mb-3">Featured Game</p>
          <h1 className="font-display text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">{game.title}</h1>
          <p className="mt-4 max-w-lg text-base text-textMuted sm:text-lg">{game.shortDescription}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="rounded-full bg-surface2 px-3 py-1 text-xs font-semibold text-text">{categoryLabel}</span>
            <span className="stat-mono flex items-center gap-1.5 text-sm text-textMuted">
              <Star className="h-4 w-4 fill-warning text-warning" />
              {game.rating.toFixed(1)}
            </span>
            <span className="stat-mono flex items-center gap-1.5 text-sm text-textMuted">
              <Users className="h-4 w-4" />
              {formatPlayCount(game.playCount)} plays
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {game.externalUrl ? (
              <a href={game.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-focus flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105 hover:bg-primary2">
                <Play className="h-4 w-4 fill-white" /> Play Now <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link to={`/games/${game.slug}/play`} className="btn-focus flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105 hover:bg-primary2">
                <Play className="h-4 w-4 fill-white" /> Play Now
              </Link>
            )}
            <Link
              to={`/games/${game.slug}`}
              className="btn-focus flex items-center gap-2 rounded-full border border-text/15 bg-text/5 px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-text/10"
            >
              <Info className="h-4 w-4" /> View Details
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md animate-floatSlow overflow-hidden rounded-3xl border border-text/10 shadow-glow">
            <GameThumb
              title={game.title}
              icon={game.icon}
              gradient={game.gradient}
              className="h-full w-full"
              iconClassName="h-20 w-20 sm:h-24 sm:w-24"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
