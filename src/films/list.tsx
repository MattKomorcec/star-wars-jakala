import { FilmCard } from "./film-card"
import { useGetFilms } from "./hooks/use-get-films"

function FilmsList() {
  const { data, isLoading, isError } = useGetFilms()

  if (isLoading) {
    return <p className="text-text-muted text-center mt-20">Loading...</p>
  }

  if (isError) {
    return <p className="text-red text-center mt-20">Error fetching data</p>
  }

  if (!data) {
    return <p className="text-text-muted text-center mt-20">No data found</p>
  }

  return (
    <div className="mt-14">
      <div className="flex flex-col md:grid gap-4 grid-cols-3">
        {data.map((film) => (
          <FilmCard key={film.url} film={film} />
        ))}
      </div>
    </div>
  )
}

export { FilmsList }