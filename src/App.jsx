import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Prodi from './pages/Prodi';
import Mahasiswa from './pages/Mahasiswa';
import "./App.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prodi' element={<Prodi />} />
        <Route path='/mahasiswa/:id' element={<Mahasiswa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App