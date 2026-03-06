import { useQuery } from "@tanstack/react-query"
import type { Person } from "../types"

function useGetPersonDetails(personId: string) {
  return useQuery<Person>({
    queryKey: ["people", personId],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/people/${personId}/`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json() as Promise<Person>
    },
  })
}

export { useGetPersonDetails }