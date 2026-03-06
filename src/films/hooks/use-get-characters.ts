import { useQueries } from "@tanstack/react-query"
import type { Person } from "../../people/types"
import { extractIdFromUrl } from "../../util"

/**
 * Lazily fetches details for a set of characters given their SWAPI resource URLs.
 * Queries are only fired when `showCharacters` is `true`.
 *
 * @param characterUrls - Array of SWAPI people URLs, e.g. `["https://swapi.dev/api/people/1/"]`.
 * @param showCharacters - When `false`, all queries are disabled and no requests are made.
 * @returns An array of TanStack Query results, one per character URL.
 */
function useGetCharacters(characterUrls: string[] = [], showCharacters: boolean) {
  const characterIds = characterUrls.map((url) => extractIdFromUrl(url))

  return useQueries({
    queries: characterIds.map((id) => ({
      queryKey: ["people", id],
      queryFn: async (): Promise<Person> => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/people/${id}/`)
        if (!res.ok) throw new Error("Failed to fetch character")
        return res.json()
      },
      enabled: showCharacters,
    })),
  })
}

export { useGetCharacters }