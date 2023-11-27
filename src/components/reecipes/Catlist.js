import { useLoaderData, Link } from "react-router-dom"

export default function Catlist() {
  const data = useLoaderData()
  console.log(data);
  return (
    <div> 
      {
      data.documents.map(el => (
      <div key={el.id}>
        <Link to={`/details`}>{el.name}</Link>
      </div>
    

    ))}</div>
  )
}

export const catLoader = async () => {
  const res = await fetch("http://localhost:8080/categories")

  if(!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json()
}