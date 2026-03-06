/**
 * Extracts the numeric ID from a SWAPI resource URL.
 *
 * @param url - A SWAPI resource URL, e.g. `"https://swapi.dev/api/films/1/"`
 * @returns The ID as a string, e.g. `"1"`. Returns an empty string if the URL has no segments.
 */
function extractIdFromUrl(url: string): string {
  return url.split("/").filter(Boolean).at(-1) ?? ""
}

export { extractIdFromUrl }