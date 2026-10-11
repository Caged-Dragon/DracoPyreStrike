import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionProps {
  eyebrow?: string
  title: string
  viewAllTo?: string
  children: ReactNode
}

export default function Section({ eyebrow, title, viewAllTo, children }: SectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
          <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
        </div>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="btn-focus flex shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
