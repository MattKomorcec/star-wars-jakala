import { describe, expect, test } from "vitest";
import { extractIdFromUrl } from "./util";

describe("extractIdFromUrl", () => {
  test.each([
    ["https://swapi.dev/api/films/1/", "1"],
    ["https://swapi.dev/api/people/5/", "5"],
    ["https://swapi.dev/api/starships/9/", "9"],
    ["https://swapi.dev/api/planets/3/", "3"],
    ["https://swapi.dev/api/species/2/", "2"],
    ["https://swapi.dev/api/vehicles/4/", "4"],
    ["https://swapi.dev/api/films/10/", "10"],
  ])("should extract the ID from the URL %s -> %s", (url, expected) => {
    expect(extractIdFromUrl(url)).toBe(expected);
  });
});