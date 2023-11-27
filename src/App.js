import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Rootlayout from "./layouts/Rootlayout";
import Catlist, { catLoader } from "./components/reecipes/Catlist";
import Catdetails from "./components/reecipes/Catdetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index element={<Home />} loader={catLoader} />

      <Route path="details" element={<Catdetails />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
