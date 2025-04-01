"use client"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ClientList from "./components/ClientsList"
import CreateClient from "./components/CreateClient"
import ClientDetails from "./components/ClientDetails"
import UpdateClient from "./components/UpdateClient"
import React from "react"

function App() {
  React.useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center app-title">Gestion des Clients</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/clients" />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/create" element={<CreateClient />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/clients/:id/update" element={<UpdateClient />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

