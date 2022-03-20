import React from 'react';
import Home from './views/home/home';
import Clients from './views/clients/clients';
import Signin from './views/authentication/signin';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route element={<ProtectedRoutes />} >
          <Route exact path="/" element={<Home/>} />
          <Route path="/clients" element={<Clients/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;