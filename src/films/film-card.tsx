import { Link } from "react-router-dom"
import type { Film } from "./types"
import { extractIdFromUrl } from "../util"

function FilmCard({ film }: { film: Film }) {
  return (
    <div className="bg-surface rounded-xl p-6 border border-blue">
      <h3>{film.title}</h3>
      <p>Directed by: {film.director}</p>
      <p>Produced by: {film.producer}</p>
      <p>Release date: {film.release_date}</p>
      <Link to={`/films/${extractIdFromUrl(film.url)}`} className="text-blue mt-2 inline-block underline hover:text-gold" aria-label={`Read more about ${film.title}`}>
        Read more
      </Link>
    </div>
  )
}

export { FilmCard }