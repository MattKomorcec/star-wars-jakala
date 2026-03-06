import { useQuery } from "@tanstack/react-query"
import type { Film } from "../types"

function useGetFilmDetails(filmId: string) {
  return useQuery<Film>({
    queryKey: ["films", filmId],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/films/${filmId}/`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json() as Promise<Film>
    },
  })
}

export { useGetFilmDetails }