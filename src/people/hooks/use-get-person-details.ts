import { useQuery } from "@tanstack/react-query"
import type { Person } from "../types"

/**
 * Fetches details for a single Star Wars person from the SWAPI.
 *
 * @param personId - The numeric ID of the person, e.g. `"1"`.
 * @returns A TanStack Query result containing a {@link Person} object.
 */
function useGetPersonDetails(personId: string) {
  return useQuery<Person>({
    queryKey: ["people", personId],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/people/${personId}/`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json() as Promise<Person>
    },
  })
}

export { useGetPersonDetails }