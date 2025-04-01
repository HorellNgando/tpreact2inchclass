"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const ClientDetails = () => {
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/clients/${id}`)
        setClient(response.data)
        setError(null)
      } catch (err) {
        setError("Erreur lors de la récupération des détails du client")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id])

  if (loading)
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger">{error}</div>
          <Link to="/clients" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Retour à la liste
          </Link>
        </div>
      </div>
    )

  if (!client)
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-warning">Client non trouvé</div>
          <Link to="/clients" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Retour à la liste
          </Link>
        </div>
      </div>
    )

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Détails du client</h2>
        <div>
          <Link to={`/clients/${id}/update`} className="btn btn-outline-warning me-2">
            <i className="bi bi-pencil"></i> Modifier
          </Link>
          <Link to="/clients" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Retour
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="detail-item">
          <div className="detail-label">Nom</div>
          <div className="detail-value">{client.nom}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Adresse</div>
          <div className="detail-value">{client.adresse}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Téléphone</div>
          <div className="detail-value">{client.tel}</div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails

