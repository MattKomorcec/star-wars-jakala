import { useState } from "react"
import { Link } from "react-router"
import { extractIdFromUrl } from "../util"
import { useGetCharacters } from "./hooks/use-get-characters"
import type { Person } from "../people/types"

function FilmCharacters({ characterUrls }: { characterUrls: string[] }) {
  const [showCharacters, setShowCharacters] = useState(false)
  const characterQueries = useGetCharacters(characterUrls, showCharacters)

  const characters = characterQueries.map((q) => q.data).filter(Boolean) as Person[]
  const charactersLoading = characterQueries.some((q) => q.isLoading)

  return (
    <div className="bg-surface rounded-xl p-4 border border-surface-alt space-y-3">
      <p className="text-yellow text-2xl font-bold">{characterUrls.length}</p>
      <p className="text-text-muted text-xs uppercase mt-1">Characters</p>
      <button className="text-blue text-sm underline hover:text-gold cursor-pointer" onClick={() => setShowCharacters(!showCharacters)} aria-expanded={showCharacters} aria-controls="character-list">
        View all characters
      </button>

      {showCharacters && (
        <ul className="mt-2 space-y-1" id="character-list">
          {charactersLoading && <li className="text-text-muted text-sm">Loading characters...</li>}
          {characters.map((person) => (
            <li key={person.url}>
              <Link to={`/people/${extractIdFromUrl(person.url)}`} className="text-text text-sm hover:text-gold" aria-label={`See more about ${person.name}`}>
                - {person.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FilmCharacters }