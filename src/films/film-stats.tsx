import type { Film } from "./types";

function FilmStats({ film }: { film: Film }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {[
        { label: "Planets", count: film.planets.length },
        { label: "Starships", count: film.starships.length },
        { label: "Vehicles", count: film.vehicles.length },
        { label: "Species", count: film.species.length },
      ].map(({ label, count }) => (
        <div key={label} className="bg-surface rounded-xl p-4 border border-surface-alt">
          <p className="text-yellow text-2xl font-bold">{count}</p>
          <p className="text-text-muted text-xs uppercase mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}

export { FilmStats }