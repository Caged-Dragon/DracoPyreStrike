import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GameHero from '@/components/GameHero'
import Section from '@/components/Section'
import GameGrid from '@/components/GameGrid'
import CategoryCard from '@/components/CategoryCard'
import { GAMES, getFeaturedGame, sortGames, getGameBySlug, type GameMeta } from '@/data/games'
import type { CategoryId } from '@/data/categories'
import { CATEGORIES } from '@/data/categories'
import { useRecentlyPlayed, useFavorites } from '@/hooks/usePlayerData'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { SITE_CONFIG } from '@/data/configuration'

export default function Home() {
  useDocumentMeta(
    `${SITE_CONFIG.siteName} — ${SITE_CONFIG.tagline}`,
    `${SITE_CONFIG.description} Discover and play ${GAMES.length} free browser games instantly on ${SITE_CONFIG.siteName}.`,
  )

  const featured = getFeaturedGame()
  const trending = GAMES.filter((g) => g.trending)
  const popular = sortGames(GAMES, 'popular').slice(0, 10)
  const flaggedNew = GAMES.filter((g) => g.new)
  const newGames = flaggedNew.length ? flaggedNew : sortGames(GAMES, 'newest').slice(0, 5)

  const { recent } = useRecentlyPlayed()
  const { favorites } = useFavorites()
  const recentGames = recent.map((r) => getGameBySlug(r.slug)).filter((g): g is GameMeta => Boolean(g))
  const recommended = getRecommended(favorites, recent.map((r) => r.slug))

  return (
    <div>
      <GameHero game={featured} />

      <Section eyebrow="Trending Now" title="Trending Games" viewAllTo="/trending">
        <GameGrid games={trending.length ? trending : popular.slice(0, 5)} />
      </Section>

      <Section eyebrow="All-Time" title="Popular Games" viewAllTo="/popular">
        <GameGrid games={popular} />
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-5">
          <p className="eyebrow mb-1">Browse</p>
          <h2 className="font-display text-xl font-bold sm:text-2xl">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <Section eyebrow="Just Added" title="New Games" viewAllTo="/new">
        <GameGrid games={newGames} />
      </Section>

      {recentGames.length > 0 && (
        <Section eyebrow="Jump Back In" title="Recently Played">
          <GameGrid games={recentGames.slice(0, 5)} />
        </Section>
      )}

      <Section eyebrow="Picked For You" title="Recommended Games">
        <GameGrid games={recommended} />
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready for one more round?</h2>
        <p className="mx-auto mt-2 max-w-md text-textMuted">Every game in the library, in one place.</p>
        <Link
          to="/games"
          className="btn-focus mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105 hover:bg-primary2"
        >
          Explore All Games <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

/**
 * Lightweight, honest recommendation heuristic: favor games sharing a
 * category with what the player has favorited/played, fall back to
 * highest-rated. No account or backend required for this to work, and the
 * same shape lets a real recommendation API replace it later untouched.
 */
function getRecommended(favoriteSlugs: string[], recentSlugs: string[]): GameMeta[] {
  const seedSlugs = [...favoriteSlugs, ...recentSlugs]
  if (seedSlugs.length === 0) return sortGames(GAMES, 'rating').slice(0, 5)

  const excludeSet = new Set(seedSlugs)
  const seedCategories = new Set<CategoryId>(
    seedSlugs.map((slug) => getGameBySlug(slug)?.category).filter((c): c is CategoryId => Boolean(c)),
  )
  const affinity = sortGames(GAMES.filter((g) => !excludeSet.has(g.slug) && seedCategories.has(g.category)), 'rating')
  const rest = sortGames(GAMES.filter((g) => !excludeSet.has(g.slug) && !seedCategories.has(g.category)), 'rating')
  return [...affinity, ...rest].slice(0, 5)
}
