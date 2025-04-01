"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("all")
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:3001/clients")
      setClients(response.data)
      setFilteredClients(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clients)
      return
    }

    const term = searchTerm.toLowerCase()

    const filtered = clients.filter((client) => {
      if (searchBy === "id") {
        return client.id.toString().includes(term)
      } else if (searchBy === "nom") {
        return client.nom.toLowerCase().includes(term)
      } else if (searchBy === "adresse") {
        return client.adresse.toLowerCase().includes(term)
      } else {
        // "all" - recherche dans tous les champs
        return (
          client.id.toString().includes(term) ||
          client.nom.toLowerCase().includes(term) ||
          client.adresse.toLowerCase().includes(term) ||
          client.tel.toLowerCase().includes(term)
        )
      }
    })

    setFilteredClients(filtered)
  }, [searchTerm, searchBy, clients])

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchBy("all")
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
        {/* Barre de recherche */}
        <div className="search-container mb-4">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <div className="search-wrapper">
                <div className="input-group search-input-group">
                  <span className="input-group-text search-icon">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm && (
                    <button
                      className="btn btn-clear"
                      type="button"
                      onClick={clearSearch}
                      aria-label="Effacer la recherche"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                  <select
                    className="form-select search-select"
                    value={searchBy}
                    onChange={handleSearchByChange}
                    aria-label="Critère de recherche"
                  >
                    <option value="all">Tous les champs</option>
                    <option value="id">ID</option>
                    <option value="nom">Nom</option>
                    <option value="adresse">Adresse</option>
                  </select>
                </div>
                {searchTerm && (
                  <div className="search-results-info">
                    <span className="results-count">{filteredClients.length}</span> résultat(s) trouvé(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
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
                      <td>{client.id}</td>
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
                    <td colSpan="6" className="text-center py-5">
                      {searchTerm ? (
                        <div className="no-results">
                          <div className="no-results-icon">
                            <i className="bi bi-search"></i>
                          </div>
                          <p className="no-results-text">Aucun client ne correspond à votre recherche</p>
                          <button className="btn btn-outline-primary btn-sm mt-2" onClick={clearSearch}>
                            <i className="bi bi-arrow-counterclockwise"></i> Réinitialiser la recherche
                          </button>
                        </div>
                      ) : (
                        <div className="no-results">
                          <div className="no-results-icon">
                            <i className="bi bi-inbox"></i>
                          </div>
                          <p className="no-results-text">Aucun client trouvé</p>
                        </div>
                      )}
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

