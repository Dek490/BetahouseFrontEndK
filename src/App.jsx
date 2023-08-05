import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import Clients from './components/Clients/Clients'
import Houses from './components/HousesPage/Houses'
// import Images from './components/Images/Images'
// import Gallery from './components/Gallery/Gallery'
import Service from './components/Services/Service'
import Home from './components/Home/Home'
import About from './components/About/About'
import ImageUpdloading from './components/HousesPage/Images'
import { Route, Routes } from 'react-router-dom'
function app() {
  return ( 
    <>

<Routes>

<Route path='/' element={<h1>Welcome to a login page</h1>}/>
<Route path='/Dashboard' element={<Dashboard/>}>
<Route path='home' element={<Home/>}/>
<Route path='client' element={<Clients/>}/>
<Route path='houses' element={<Houses/>}/>
<Route path='imageupload/:id/:Type' element={<ImageUpdloading/>}/>
{/* <Route path='images' element={<Images/>}/>
<Route path='gallery' element={<Gallery/>}/> */}
<Route path='services' element={<Service/>}/>
<Route path='about' element={<About/>}/>
<Route path='owner' element={<h1>Owner Feels Okey</h1>}/>

</Route>
</Routes>
    </>
   );
}

export default app;