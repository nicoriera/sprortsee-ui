# SportSee - Dashboard

Application de tableau de bord d'analytics sportives développée avec React, Vite et Tailwind CSS.

## Technologies Utilisées

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Recharts (pour les graphiques)

## Prérequis

- Node.js (version 16 ou supérieure)
- npm

## Installation et Configuration

### 1. Backend

1. Clonez le repository du backend :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/SportSee.git backend
cd backend
yarn
yarn dev
```

### 2. Frontend

1. Clonez le repository du frontend :

```bash
git clone https://github.com/nicoriera/sprortsee-ui
cd sprortsee-ui
npm install
npm run dev
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez l'application :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## API Endpoints Disponibles

- `http://localhost:3000/user/${userId}` - Informations utilisateur
- `http://localhost:3000/user/${userId}/activity` - Activité quotidienne
- `http://localhost:3000/user/${userId}/average-sessions` - Sessions moyennes
- `http://localhost:3000/user/${userId}/performance` - Performances

Note : Seuls les utilisateurs avec les ID 12 et 18 sont disponibles.

## Fonctionnalités Principales

### 1. Tableau de bord

- Affichage des graphiques de statistiques sportives
- Filtrage des données par utilisateur
- Sélection des périodes de temps
- Visualisation des métriques clés

## Structure du Projet

### 1. Dossiers Principaux

- `src/` : Contient le code source principal

### 2. Composants Principaux

- `src/components/` : Contient les composants réutilisables
- `src/pages/` : Contient les pages principales de l'application
- `src/utils/` : Contient les utilitaires communs
