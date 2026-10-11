import { Link } from 'react-router-dom'
import { ArrowRight, Crosshair, Compass, Joystick, Puzzle, Car, Volleyball, Swords, Coffee, Users, type LucideIcon } from 'lucide-react'
import type { Category } from '@/data/categories'
import { GAMES } from '@/data/games'

const ICONS: Record<string, LucideIcon> = { Crosshair, Compass, Joystick, Puzzle, Car, Volleyball, Swords, Coffee, Users }

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = ICONS[category.icon] ?? Joystick
  const count = GAMES.filter((g) => g.category === category.id).length
  return (
    <Link
      to={`/category/${category.id}`}
      className={`group btn-focus relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} p-5 transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" aria-hidden="true" />
      <Icon className="relative h-7 w-7 text-white drop-shadow" strokeWidth={1.75} aria-hidden="true" />
      <div className="relative">
        <h3 className="font-display text-lg font-bold text-white">{category.title}</h3>
        <p className="stat-mono mt-0.5 text-xs text-white/80">
          {count} {count === 1 ? 'game' : 'games'}
        </p>
      </div>
      <ArrowRight className="relative mt-3 h-4 w-4 text-white/80 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
