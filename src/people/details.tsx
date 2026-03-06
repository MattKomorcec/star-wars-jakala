import { useNavigate, useParams } from "react-router-dom"
import { useGetPersonDetails } from "./hooks/use-get-person-details"

function PeopleDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetPersonDetails(id ?? "")

  if (isLoading) {
    return <p className="text-text-muted text-center mt-20">Loading...</p>
  }

  if (isError) {
    return <p className="text-red text-center mt-20">Error fetching data</p>
  }

  if (!data) {
    return <p className="text-text-muted text-center mt-20">No data for this person found</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      <button onClick={() => navigate(-1)} className="text-blue text-sm underline hover:text-gold cursor-pointer">
        ← Back
      </button>
      <h2 className="text-yellow mt-6">{data.name}</h2>
      <div className="bg-surface rounded-xl p-6 border border-surface-alt">
        <p className="text-text-muted text-sm italic text-center">
          Birth year: {data.birth_year}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Height: {data.height}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Mass: {data.mass}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Hair color: {data.hair_color}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Skin color: {data.skin_color}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Eye color: {data.eye_color}
        </p>
        <p className="text-text-muted text-sm italic text-center">
          Gender: {data.gender}
        </p>
      </div>
    </div >
  )
}

export { PeopleDetails }
