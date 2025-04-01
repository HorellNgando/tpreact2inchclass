TP : Application CRUD avec React JS

## Objectif
Créer une application React JS permettant de gérer des clients avec les fonctionnalités CRUD (Create, Read, Update, Delete) en utilisant JSON Server comme backend simulé.

## Prérequis
- Node.js installé (version 16 ou supérieure)
- Éditeur de code (VS Code recommandé)
- Connaissances de base en JavaScript et React

## Installation

1. **Installer Node.js**  
   Téléchargez et installez Node.js depuis [https://nodejs.org/](https://nodejs.org/).

2. **Créer une application React**  
   Exécutez les commandes suivantes dans votre terminal :

   npx create-react-app crud_app
   cd crud_app
   npm start
   
Installer JSON Server
Pour simuler une API REST, installez JSON Server : npm install -g json-server

Créer un fichier db.json
À la racine du projet, créez un fichier db.json avec les données des clients :

{
  "clients": [
    {
      "id": 1,
      "nom": "Client 1",
      "adresse": "Adresse 1",
      "tel": "123456789"
    },
    {
      "id": 2,
      "nom": "Client 2",
      "adresse": "Adresse 2",
      "tel": "987654321"
    }
  ]
}
Démarrer JSON Server
Lancez le serveur dans un terminal séparé : json-server --watch db.json --port 3001

Installer les dépendances
Installez les bibliothèques nécessaires : npm install axios react-router-dom bootstrap

Structure des composants
ClientsList.jsx : Affiche la liste des clients et permet la suppression.

ClientDetails.jsx : Affiche les détails d'un client.

CreateClient.jsx : Formulaire pour ajouter un nouveau client.

UpdateClient.jsx : Formulaire pour modifier un client existant.

Routes
Configurez les routes dans App.jsx :

javascript
Copy
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsList from './components/ClientsList';
import ClientDetails from './components/ClientDetails';
import CreateClient from './components/CreateClient';
import UpdateClient from './components/UpdateClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/clients/create" element={<CreateClient />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/clients/:id/update" element={<UpdateClient />} />
      </Routes>
    </Router>
  );
}

export default App;
Fonctionnalités implémentées
Create : Ajout d'un nouveau client via CreateClient.jsx.

Read : Affichage de la liste des clients (ClientsList.jsx) et des détails (ClientDetails.jsx).

Update : Modification d'un client existant via UpdateClient.jsx.

Delete : Suppression d'un client depuis ClientsList.jsx.

Style avec Bootstrap
Importez Bootstrap dans App.jsx pour styliser l'application :

import 'bootstrap/dist/css/bootstrap.min.css';
Exemple d'utilisation :

<button className="btn btn-success">Ajouter</button>
<table className="table table-striped">

Lancement de l'application

Démarrez JSON Server :"json-server --watch db.json --port 3001"

Démarrez l'application React : "npm start"
Accédez à l'application via [localhost:3000/clients](http://localhost:5174/clients).

Résultat attendu
Une interface fonctionnelle permettant de gérer les clients.

Des captures d'écran illustrant chaque étape dans un fichier PDF.

Un dossier src compressé contenant le code source.

Évaluation
Le tuteur évaluera :

Le respect des consignes.

La qualité du code et de l'interface.

La fonctionnalité complète de l'application.