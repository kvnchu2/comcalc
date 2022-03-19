import React from 'react';
import Home from './views/home/home';
import Clients from './views/clients/clients';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/clients" element={<Clients/>} />
      </Routes>
    </div>
  )
}

export default App;