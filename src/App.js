 import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import './index.css';
 import Header from './components/common/Header';
import { Routes } from 'react-router-dom';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element= {<Header/>}>

      </Route>


  )
);

function App() {

  return (
  

  <RouterProvider router={router}/> 
   
  );
}

export default App;
