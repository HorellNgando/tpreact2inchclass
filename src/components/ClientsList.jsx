"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:3001/clients")
      setClients(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client?")) {
      try {
        await axios.delete(`http://localhost:3001/clients/${id}`)
        fetchData()
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Liste des clients</h2>
        <Link to="/clients/create" className="btn btn-success">
          <i className="bi bi-plus-circle"></i> Ajouter un client
        </Link>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}></th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client.id}>
                      <td className="text-center">
                        <Link
                          to={`/clients/${client.id}`}
                          className="icon-button btn btn-light btn-sm"
                          title="Voir les détails"
                        >
                          <i className="bi bi-eye text-primary"></i>
                        </Link>
                      </td>
                      <td>{client.nom}</td>
                      <td>{client.adresse}</td>
                      <td>{client.tel}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/clients/${client.id}/update`}
                            className="btn btn-outline-warning btn-sm"
                            title="Modifier"
                          >
                            <i className="bi bi-pencil"></i> Modifier
                          </Link>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="btn btn-outline-danger btn-sm"
                            title="Supprimer"
                          >
                            <i className="bi bi-trash"></i> Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="bi bi-inbox text-secondary" style={{ fontSize: "2rem" }}></i>
                      <p className="mt-2">Aucun client trouvé</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientList

