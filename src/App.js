import React from 'react';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App;