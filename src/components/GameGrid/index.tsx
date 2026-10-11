import GameCard from '@/components/GameCard'
import { GameCardSkeletonGrid } from '@/components/Skeletons'
import type { GameMeta } from '@/data/games'

interface GameGridProps {
  games: GameMeta[]
  loading?: boolean
  skeletonCount?: number
}

export default function GameGrid({ games, loading = false, skeletonCount = 8 }: GameGridProps) {
  if (loading) return <GameCardSkeletonGrid count={skeletonCount} />
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  )
}
