import { Link } from 'react-router-dom'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { SITE_CONFIG } from '@/data/configuration'

interface InfoPageProps {
  title: string
  paragraphs: string[]
}

/** Lightweight, honest content for the footer's secondary links — real
 *  copy instead of dead-end or fake navigation (Section 58). */
export default function InfoPage({ title, paragraphs }: InfoPageProps) {
  useDocumentMeta(`${title} — ${SITE_CONFIG.siteName}`, paragraphs[0])
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-textMuted sm:text-base">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Link to="/games" className="btn-focus mt-8 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary2">
        Browse Games
      </Link>
    </div>
  )
}

export const ABOUT_COPY = {
  title: 'About DracoPyre Strike',
  paragraphs: [
    `${SITE_CONFIG.siteName} is a free browser gaming platform built by ${SITE_CONFIG.studioName}. Every game in the Realm is dragon-forged — the idea is simple: open the site, pick a game, click play. No installs, no accounts, no friction.`,
    "The library launched with 10 original, fully playable games spanning arcade, puzzle, action and strategy — each one reimagined with the Realm's own dragons, hoards and lairs. It's built to grow — the same game registry that powers 10 titles today is designed to scale to hundreds without a redesign.",
    'Every game runs entirely in your browser. Favorites, recently played games and high scores are saved locally on your device.',
  ],
}

export const HELP_COPY = {
  title: 'Help & FAQ',
  paragraphs: [
    'Do I need an account? No. Every game is playable instantly, and your favorites, recently played list and high scores are saved to this browser automatically.',
    "Where is my data stored? Locally, in your browser's storage. Clearing your browser data or switching devices will reset it, since nothing is sent to a server in this version of DracoPyre Strike.",
    "A game won't load — what do I do? Use the Try Again button on the game screen, or refresh the page. If it persists, it may not be supported in your current browser.",
    'Can I play on my phone? Yes — every game supports touch controls, and the layout adapts to any screen size.',
  ],
}

export const CONTACT_COPY = {
  title: 'Contact',
  paragraphs: [
    `Questions, bug reports or game ideas — we'd like to hear them. Reach the ${SITE_CONFIG.studioName} team at hello@dracopyrestrike.game.`,
    'For fastest results with a bug report, include the game name, your browser, and what you were doing right before it happened.',
  ],
}

export const PRIVACY_COPY = {
  title: 'Privacy Policy',
  paragraphs: [
    `${SITE_CONFIG.siteName} does not require an account and does not operate a backend in this version of the platform.`,
    "Favorites, recently played games, high scores and your sound preference are stored locally on your device using your browser's localStorage. This data never leaves your browser and is not transmitted to our servers, because — in this version — we don't have any.",
    "Clearing your browser's site data, using a different browser, or switching devices will reset this local data.",
    'If a future version of DracoPyre Strike introduces accounts or cloud sync, this policy will be updated before that data leaves your device.',
  ],
}

export const TERMS_COPY = {
  title: 'Terms of Service',
  paragraphs: [
    `${SITE_CONFIG.siteName} is provided by ${SITE_CONFIG.studioName} for free, personal, non-commercial use.`,
    "All games are original works built for this platform. Don't redistribute, resell, or claim them as your own.",
    'The platform is provided "as is" without warranty. We aim for reliability but can\'t guarantee uninterrupted access.',
  ],
}
