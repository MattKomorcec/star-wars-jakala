import { Routes, Route } from "react-router-dom"
import { PeopleDetails } from "./people/details"
import { FilmsList } from "./films/list"
import { FilmDetails } from "./films/details"

function App() {
  return (
    <div className="p-14">
      <h1 className='text-gold text-center'>Star Wars | Jakala</h1>
      <hr className="mt-2 w-1/2 mx-auto bg-gold" />
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/films/:id" element={<FilmDetails />} />
        <Route path="/people/:id" element={<PeopleDetails />} />
      </Routes>
    </div>
  )
}

export default App
