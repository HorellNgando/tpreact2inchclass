"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const CreateClient = () => {
  const [client, setClient] = useState({ nom: "", adresse: "", tel: "" })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!client.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!client.adresse.trim()) newErrors.adresse = "L'adresse est requise"
    if (!client.tel.trim()) newErrors.tel = "Le téléphone est requis"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setSubmitting(true)
      await axios.post("http://localhost:3001/clients", client)
      navigate("/clients")
    } catch (error) {
      console.error("Erreur lors de la création du client:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setClient({ ...client, [name]: value })
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Créer un nouveau client</h2>
        <Link to="/clients" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Retour
        </Link>
      </div>
      <div className="card-body">
        <form onSubmit={handleCreate}>
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
              placeholder="Entrez le nom du client"
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
              placeholder="Entrez l'adresse"
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
              placeholder="Entrez le numéro de téléphone"
            />
            {errors.tel && <div className="invalid-feedback">{errors.tel}</div>}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Création en cours...
                </>
              ) : (
                <>
                  <i className="bi bi-save"></i> Créer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClient

