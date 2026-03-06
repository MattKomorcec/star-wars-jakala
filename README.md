# Star Wars | Jakala

Welcome to this Star Wars themed React app that displays the Star Wars movies, statistics about them and characters that were a part of them.

## Running the project
First of all, you need to create an .env file in the root of the project and set the variable `VITE_API_BASE_URL` to `https://swapi.dev/api`, like so: `VITE_API_BASE_URL=https://swapi.dev/api`. 

When that is done, from the root of the project, simply run `npm run dev` and follow the link that is output in the terminal, usually `http://localhost:5173/` to open the app in the browser.

## Running the tests and linting the code
Running the tests and linting the code is done similarly to running the project, for the tests run `npm run test` and for the linter run `npm run lint`.

## Project tech stack
Project is scaffolded using *Vite* with the React TypeScript template, using *Vitest* for the automated tests. *React* is the latest stable, currently version 19.2.

In charge of the routing is the React Router, with 4 defined routes, to show the list of movies, details for each movie, each person's details, and a 404 route when no route is matched.

*TailwindCSS* is used for styling the app, with base theme colors defined in the `index.css` file. Font is `Orbitron`, which was found on Google fonts.

For all network concerns, *React Query* from Tanstack is the choice. It handles fetching of entities from the API, handling loading states and errors. Sensible defaults were kept.

For the consistency and readability purposes, ESLint is used, with the defaults that it comes with when installed with Vite, with the addition of `eslint-plugin-jsx-a11y` that helps with ensuring accessibility targets are met.

Husky is configured to run on the pre-commit hook, which runs the linting and runs the tests, to ensure only working code gets pushed to the repository.

Finally, for testing the React Query hooks, *msw* library is used to mock network requests and responses, and a test wrapper is defined for *React Query* to be used for testing purposes only.

## Why these entities?
Given the constraints, I felt that it was the most natural way to display a list of Star Wars movies that the API returns from the root of the app, while allowing users to navigate to each movie's details, that displays additional information about each movie, like the number of characters that played in it, species, planets, vehicles etc.

It was also necessary to showcase each of the characters through their own detailed pages, with additional information that is not directly available in the movie's details page.

## Limitations
Given that this is a coding challenge that should take 4-8 hours, I've hand picked scenarios and technologies that provide a glimpse into how I work. 

Concretely, the project is usable only for development purposes in its current state, but I've made sure to include production ready stuff as well, like the `.env` file that could control different environments and *husky* that would ensure consistency and readability.

## Why did I use the technologies outlined above?
They're production ready, battle tested - and I'm confident using them in projects.

*React Query* has been a game changer in terms of handling network requests, and eliminates a lot of code that would otherwise have to be written. You'll notice that I haven't used `useEffect` even once in the project, thanks to the hooks (`useGetFilms`, `useGetFilmDetails` etc.) handling the complexity. 

As you can see in `use-get-films.test.tsx` it's also fairly simple to test the hooks themselves.

The test suite includes a couple tests, simply for demonstration purposes. I consider automated testing an important part of good software development, and include them in production-ready projects. Test strategy for me varies, from unit tests and component tests, all the way to E2E tests.

I had the luxury of calling a stable API, so I could make assumptions that I wouldn't otherwise be able to make. For example, `extractIdFromUrl` from the utilities extracts an id from the url, but doesn't handle complex cases, as the urls are always formed the same way and are consistent. In a production environment, the function would have to be much more robust to handle all kinds of edge cases, like malformed urls, no urls passed at all etc.

If this was a production-ready app, I would have used *zod* to validate the responses the API returns, to ensure nothing slips past.

One deliberate performance decision worth mentioning: character data on each movie's details page is only fetched on demand, when the user explicitly clicks the "View characters" button. Some movies can have quite a few characters (up to 40), so fetching them all on page load would have 40 requests in parallel hitting the API. Using the `useQueries` and the `enabled` flag keeps the initial load lean, only fetching the movie details, and fetches characters only when needed.

## Accessibility
I know JAKALA pays a lot of attention to accessibility, hence why I included the ESLint rules for it, and included some `aria-*` tags. In a production app, I would take this a step further, and also include runtime tools like the Google Lighthouse to analyze the app, and not rely only on code analysis.

As I've learned from Daniel in the last interview, Storybook has an accessibility addon that would have been included, had this app been large enough to warrant a component library.

## Note on AI usage
I used AI assistance, in particular Claude Code, during development of this project, primarily for writing JSDoc documentation blocks, scanning for accessibility gaps, and debugging a Vitest `jsdom` issue. Claude also reviewed this Readme file for typos and inconsistencies.

Github Copilot was utilized in VS Code for typing out the API response to a type representation - `types.ts` files.

All architectural decisions, structure, libraries and code choices are my own. I treat AI as an assistant, never as a substitute for engineering judgment.