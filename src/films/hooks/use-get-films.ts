import { useQuery } from "@tanstack/react-query"
import type { Film } from "../types"

function useGetFilms() {
  return useQuery<Film[]>({
    queryKey: ["films"],
    queryFn: async () => {
      const response = await fetch("https://swapi.dev/api/films/")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      return data.results as Film[]
    },
  })
}

export { useGetFilms }