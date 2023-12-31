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
import RecipesDetail from "./components/reecipes/RecipesDetail";
import { recipeDetailsLoader } from "./components/reecipes/loader";
import Loginpage from "./pages/Loginpage";
import { TokenProvider } from "./pages/TokenContext";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Profile from "./pages/Profile";
import { profileLoader } from "./components/reecipes/loader";
import AdminPanel from "./components/auth/AdminPanel";
import Signup from "./components/auth/Signup";
import SearchResult from "./components/reecipes/SearchResult";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<TokenProvider />}>
      <Route element={<ProtectedRoutes path={"/login"} />}>
        <Route path="/AdminPanel" element={<AdminPanel />} loader={catLoader} />
      </Route>
      <Route path="/Search" element={<SearchResult/> } loader={catLoader}/>

      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} loader={catLoader} />

        <Route element={<ProtectedRoutes path={"/login"} confirm={"token"} />}>
          <Route path="/profile" element={<Profile />} loader={profileLoader} />
        </Route>

        <Route path=":id" element={<Catdetails />} loader={catDetailsLoader} />

        <Route
          path="recipe/:id"
          element={<RecipesDetail />}
          loader={recipeDetailsLoader}
        ></Route>
        <Route
          path="recipe/:id/:id"
          element={<Catdetails />}
          loader={catDetailsLoader}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
