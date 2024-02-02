import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from '../page/Main'
import About from '../page/About'
import Skills from '../page/Skills'
import Projects from '../page/Projects'
import Contact from '../page/Contact'


function Router() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/About" element={<About />} />
            <Route path="/Skills" element={<Skills />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Contact" element={<Contact />} />
        </Routes>
    </>

  )
}

export default Router