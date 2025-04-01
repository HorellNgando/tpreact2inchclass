"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"

const UpdateClient = () => {
  const { id } = useParams()
  const [client, setClient] = useState({ nom: "", adresse: "", tel: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3001/clients/${id}`)
        setClient(response.data)
        setError(null)
      } catch (err) {
        setError("Erreur lors de la récupération des données du client")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id])

  const validateForm = () => {
    const newErrors = {}
    if (!client.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!client.adresse.trim()) newErrors.adresse = "L'adresse est requise"
    if (!client.tel.trim()) newErrors.tel = "Le téléphone est requis"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setSubmitting(true)
      await axios.put(`http://localhost:3001/clients/${id}`, client)
      navigate("/clients")
    } catch (err) {
      setError("Erreur lors de la mise à jour du client")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setClient({ ...client, [name]: value })
  }

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

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Modifier le client</h2>
        <Link to="/clients" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Retour
        </Link>
      </div>
      <div className="card-body">
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">
              Nom du client
            </label>
            <input
              type="text"
              className={`form-control ${errors.nom ? "is-invalid" : ""}`}
              id="nom"
              name="nom"
              value={client.nom}
              onChange={handleChange}
            />
            {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="adresse" className="form-label">
              Adresse
            </label>
            <input
              type="text"
              className={`form-control ${errors.adresse ? "is-invalid" : ""}`}
              id="adresse"
              name="adresse"
              value={client.adresse}
              onChange={handleChange}
            />
            {errors.adresse && <div className="invalid-feedback">{errors.adresse}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              Téléphone
            </label>
            <input
              type="text"
              className={`form-control ${errors.tel ? "is-invalid" : ""}`}
              id="tel"
              name="tel"
              value={client.tel}
              onChange={handleChange}
            />
            {errors.tel && <div className="invalid-feedback">{errors.tel}</div>}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Mise à jour en cours...
                </>
              ) : (
                <>
                  <i className="bi bi-save"></i> Mettre à jour
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateClient

