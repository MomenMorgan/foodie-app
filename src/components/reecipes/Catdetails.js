import { useParams, useLoaderData } from "react-router-dom";

export default function Catdetails() {
  const data = useLoaderData();


  const {
    document: {
      document: { description }
      
    },
    additionalData: {documents}
    
  } = data || {};



  return (
    <div>
      <div>{description}</div>
      
      {documents.map((document) => (
        <div key={document._id} className="pt-8">
          <h3>{document._id}</h3>
          <p>{document.description}</p>
        </div>
      ))}

    </div>
  );
}


