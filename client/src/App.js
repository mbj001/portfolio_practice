import React from 'react'
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './page/Header'
import Router from './routes/Router'


function App() {
  return (
    <>
    <BrowserRouter basename= {process.env.PUBLIC_URL} >
        <Header />
        <Router />
    </BrowserRouter>
    </>
  )
}

export default App