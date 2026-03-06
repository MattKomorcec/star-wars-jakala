import { useQuery } from "@tanstack/react-query"
import type { Film } from "../types"

/**
 * Fetches details for a single Star Wars film from the SWAPI.
 *
 * @param filmId - The numeric ID of the film, e.g. `"1"`.
 * @returns A TanStack Query result containing a {@link Film} object.
 */
function useGetFilmDetails(filmId: string) {
  return useQuery<Film>({
    queryKey: ["films", filmId],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/films/${filmId}/`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json() as Promise<Film>
    },
  })
}

export { useGetFilmDetails }