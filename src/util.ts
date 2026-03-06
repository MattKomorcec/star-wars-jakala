function extractIdFromUrl(url: string): string {
  return url.split("/").filter(Boolean).at(-1) ?? ""
}

export { extractIdFromUrl }