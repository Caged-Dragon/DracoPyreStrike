import {
  Rocket, Spline, Grid3x3, Blocks, Bird, Bomb, Brain, Scissors, Hash, Target,
  Crosshair, Compass, Joystick, Puzzle, Car, Volleyball, Swords, Coffee, Users, Gamepad2,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Rocket, Spline, Grid3x3, Blocks, Bird, Bomb, Brain, Scissors, Hash, Target,
  Crosshair, Compass, Joystick, Puzzle, Car, Volleyball, Swords, Coffee, Users, Gamepad2,
}

interface GameThumbProps {
  title: string
  icon: string
  gradient: string
  className?: string
  iconClassName?: string
}

/** Procedural game/category artwork: a themed gradient tile + icon + faint
 *  dot-grid texture. No external image assets to license (Section 51). */
export default function GameThumb({ title, icon, gradient, className = '', iconClassName = '' }: GameThumbProps) {
  const Icon = ICONS[icon] ?? Gamepad2
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.5) 1px, transparent 0)',
          backgroundSize: '14px 14px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" aria-hidden="true" />
      <Icon className={`relative text-white/95 drop-shadow-lg ${iconClassName || 'h-10 w-10 sm:h-12 sm:w-12'}`} strokeWidth={1.6} aria-hidden="true" />
      <span className="sr-only">{title}</span>
    </div>
  )
}
