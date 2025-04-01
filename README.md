```markdown
# TP : Application CRUD Clients avec Vite + React (JSX)

## Objectifs
Développer une application SPA (Single Page Application) de gestion de clients avec les fonctionnalités CRUD en utilisant :
- Vite comme outil de build
- React avec des composants en `.jsx`
- JSON Server pour l'API mock
- React Router pour la navigation
- Axios pour les requêtes HTTP

## Prérequis
- Node.js (v18+ recommandé)
- npm (inclus avec Node.js)
- VS Code (ou autre éditeur)

## Installation

1. **Créer le projet avec Vite** :
```bash
npm create vite@latest crud-client -- --template react
cd crud-client
npm install
```

2. **Installer les dépendances** :
```bash
npm install axios react-router-dom json-server
```

## Structure du projet
```
src/
├── components/
│   ├── ClientList.jsx
│   ├── ClientDetails.jsx
│   ├── CreateClient.jsx
│   └── UpdateClient.jsx
├── App.jsx
├── main.jsx
├── db.json (à créer)
```

## Configuration

1. **JSON Server** :
Créez `db.json` à la racine :
```json
{
  "clients": [
    {
      "id": 1,
      "nom": "Client 1",
      "adresse": "Adresse 1",
      "tel": "123456789"
    }
  ]
}
```

Lancez le serveur :
```bash
npx json-server --watch db.json --port 3001
```

2. **Routes principales** (`App.jsx`) :
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientList from './components/ClientList'
import CreateClient from './components/CreateClient'
import ClientDetails from './components/ClientDetails'
import UpdateClient from './components/UpdateClient'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/create" element={<CreateClient />} />
        <Route path="/:id" element={<ClientDetails />} />
        <Route path="/:id/update" element={<UpdateClient />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## Composants clés

### ClientList.jsx
```jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ClientList() {
  const [clients, setClients] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:3001/clients')
    setClients(res.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/clients/${id}`)
    fetchClients()
  }

  return (
    <div>
      <h1>Liste des clients</h1>
      <Link to="/create">
        <button>Nouveau client</button>
      </Link>
      
      <table>
        {/* Affichage des clients */}
      </table>
    </div>
  )
}
```

### CreateClient.jsx
```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function CreateClient() {
  const [client, setClient] = useState({ nom: '', adresse: '', tel: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/clients', client)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Champs du formulaire */}
    </form>
  )
}
```

## Lancement de l'application

1. **Développement** :
```bash
npm run dev
```
Ouvrez [http://localhost:5173](http://localhost:5173)

2. **Production** :
```bash
npm run build
npm preview
```

## Bonnes pratiques

1. **Structure des composants** :
- Utiliser des composants fonctionnels
- Nommer les fichiers en `.jsx`
- Organiser le code en dossiers logiques

2. **Gestion d'état** :
- `useState` pour l'état local
- `useEffect` pour les effets secondaires
- `useNavigate` pour la navigation

3. **Stylisation** :
Optionnel : Ajouter Tailwind CSS ou un autre framework
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## Remise du TP

1. Compresser le dossier du projet (sans `node_modules`)
2. Inclure un PDF avec :
   - Captures d'écran des différentes vues
   - Explications des choix techniques

## Ressources
- [Documentation Vite](https://vitejs.dev/)
- [React avec JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React Router v6](https://reactrouter.com/en/main)
- [JSON Server](https://www.npmjs.com/package/json-server)
- Boostrap
``` 

Ce README.md est adapté pour un projet utilisant Vite + React avec des composants en `.jsx`. Il inclut les spécificités de cette stack tout en conservant les objectifs pédagogiques du TP CRUD.