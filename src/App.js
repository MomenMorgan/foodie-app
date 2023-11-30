import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Rootlayout from "./layouts/Rootlayout";
import Catdetails from "./components/reecipes/Catdetails";
import { catDetailsLoader } from "./components/reecipes/loader";
import { catLoader } from "./components/reecipes/loader";
import Recipelayout from "./layouts/Recipelayout";
import RecipesDetail from "./components/reecipes/RecipesDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index element={<Home />} loader={catLoader} />

      <Route
        path="details/:id"
        element={<Catdetails />}
        loader={catDetailsLoader}
      />

      <Route path="/:id" element={<Recipelayout />}>
        <Route
          index
          element={<RecipesDetail />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// {
//   "name":"Morgan",
//   "email":"mominnmorgan10@gmail.com",
//   "password":"Savasshbrt88"
// }
