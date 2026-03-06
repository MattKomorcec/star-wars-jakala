import { useQuery } from "@tanstack/react-query"
import type { Film } from "../types"

/**
 * Fetches the full list of Star Wars films from the SWAPI.
 *
 * @returns A TanStack Query result containing an array of {@link Film} objects.
 */
function useGetFilms() {
  return useQuery<Film[]>({
    queryKey: ["films"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/films/`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      return data.results as Film[]
    },
  })
}

export { useGetFilms }