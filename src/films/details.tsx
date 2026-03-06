import { useParams, Link } from "react-router-dom"
import { useGetFilmDetails } from "./hooks/use-get-film-details"
import { FilmStats } from "./film-stats"
import { FilmCharacters } from "./characters"

function FilmDetails() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetFilmDetails(id ?? "")

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

      <FilmCharacters characterUrls={data.characters} />

      <FilmStats film={data} />
    </div>
  )
}

export { FilmDetails }
