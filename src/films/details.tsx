import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useQueries } from "@tanstack/react-query"
import { useGetFilmDetails } from "./hooks/use-get-film-details"
import type { Person } from "../people/types"
import { extractIdFromUrl } from "../util"
import { FilmSpecifics } from "./film-specifics"

function FilmDetails() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetFilmDetails(id ?? "")
  const [showCharacters, setShowCharacters] = useState(false)

  const characterIds = data?.characters.map((url) => extractIdFromUrl(url)) ?? []

  const characterQueries = useQueries({
    queries: characterIds.map((id) => ({
      queryKey: ["people", id],
      queryFn: async (): Promise<Person> => {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`)
        if (!res.ok) throw new Error("Failed to fetch character")
        return res.json()
      },
      enabled: showCharacters,
    })),
  })

  const characters = characterQueries.map((q) => q.data).filter(Boolean) as Person[]
  const charactersLoading = characterQueries.some((q) => q.isLoading)

  if (isLoading) {
    return <p className="text-text-muted text-center mt-20">Loading...</p>
  }

  if (isError) {
    return <p className="text-red text-center mt-20">Error fetching data</p>
  }

  if (!data) {
    return <p className="text-text-muted text-center mt-20">No data for this movie found</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      <Link to="/" className="text-blue text-sm underline hover:text-gold cursor-pointer">← Back to films</Link>

      <div className="text-center">
        <p className="text-yellow text-sm tracking-widest uppercase">Episode {data.episode_id}</p>
        <h2 className="text-yellow">{data.title}</h2>
        <p className="text-text-muted text-sm">{data.release_date}</p>
      </div>

      <div className="bg-surface rounded-xl p-6 border border-surface-alt">
        <p className="text-text-muted text-sm leading-relaxed italic text-center whitespace-pre-line">
          {data.opening_crawl}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-surface-alt">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-1">Director</p>
          <p className="text-text font-semibold">{data.director}</p>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-surface-alt">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-1">Producer</p>
          <p className="text-text font-semibold">{data.producer}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl p-4 border border-surface-alt space-y-3">
        <p className="text-yellow text-2xl font-bold">{data.characters.length}</p>
        <p className="text-text-muted text-xs uppercase mt-1">Characters</p>
        <button className="text-blue text-sm underline hover:text-gold cursor-pointer" onClick={() => setShowCharacters(!showCharacters)}>
          View all characters
        </button>
        {showCharacters && (
          <ul className="mt-2 space-y-1">
            {charactersLoading && <li className="text-text-muted text-sm">Loading characters...</li>}
            {characters.map((person) => (
              <li key={person.url}>
                <Link to={`/people/${extractIdFromUrl(person.url)}`} className="text-text text-sm hover:text-gold">
                  - {person.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <FilmSpecifics film={data} />
    </div>
  )
}

export { FilmDetails }
