import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import type { ReactNode } from "react"
import { useGetFilms } from "./use-get-films"
import type { Film } from "../types"

vi.stubEnv("VITE_API_BASE_URL", "https://swapi.dev/api")

const mockFilms: Film[] = [
  {
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: "It is a period of civil war...",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    url: "https://swapi.dev/api/films/1/",
  },
]

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Creates a wrapper component that provides a QueryClient to the hook being tested
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe("useGetFilms", () => {
  it("returns films data on a successful response", async () => {
    server.use(
      http.get("https://swapi.dev/api/films/", () =>
        HttpResponse.json({ results: mockFilms })
      )
    )

    const { result } = renderHook(() => useGetFilms(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockFilms)
  })

  it("returns an error on a failed response", async () => {
    server.use(
      http.get("https://swapi.dev/api/films/", () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    const { result } = renderHook(() => useGetFilms(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
