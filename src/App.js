import React from 'react';
import Home from './components/home';
import Clients from './components/clients';
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