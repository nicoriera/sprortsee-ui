# SportSee - Dashboard

Application de tableau de bord d'analytics sportives développée avec React, Vite et Tailwind CSS.

## Technologies Utilisées

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- D3.js (pour les grapiques)
- PropTypes (pour la validation des props)

## Prérequis

- Node.js (version 16 ou supérieure)
- npm
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Connexion internet pour les dépendances

## Installation et Configuration

### 1. Backend

1. Clonez le repository du backend :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/SportSee.git backend
cd backend
yarn
yarn dev
```

Le backend sera accessible sur `http://localhost:3000`

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

  - Retourne les informations de base de l'utilisateur
  - Format : `{ id, userInfos, score, keyData }`

- `http://localhost:3000/user/${userId}/activity` - Activité quotidienne

  - Retourne les données d'activité sur 7 jours
  - Format : `{ userId, sessions: [{ day, kilogram, calories }] }`

- `http://localhost:3000/user/${userId}/average-sessions` - Sessions moyennes

  - Retourne la durée moyenne des sessions
  - Format : `{ userId, sessions: [{ day, sessionLength }] }`

- `http://localhost:3000/user/${userId}/performance` - Performances
  - Retourne les données de performance par catégorie
  - Format : `{ userId, kind: { 1: 'cardio', ... }, data: [{ value, kind }] }`

Note : Seuls les utilisateurs avec les ID 12 et 18 sont disponibles.

## Fonctionnalités Principales

### 1. Tableau de bord

- Affichage des graphiques de statistiques sportives
  - Graphique d'activité quotidienne (poids et calories)
  - Graphique de durée des sessions
  - Graphique radar des performances
  - Score circulaire de progression
- Filtrage des données par utilisateur
- Sélection des périodes de temps
- Visualisation des métriques clés
  - Calories brûlées
  - Protéines consommées
  - Glucides ingérés
  - Lipides consommés

### 2. Visualisations Interactives

- Tooltips détaillés sur tous les graphiques
- Animations fluides des données
- Mise à jour en temps réel
- Interface responsive

## Structure du Projet

### 1. Dossiers Principaux

- `src/` : Contient le code source principal
  - Composants React
  - Logique métier
  - Utilitaires
  - Assets

### 2. Composants Principaux

- `src/components/` : Contient les composants réutilisables
  - `BarChart/` : Graphique d'activité quotidienne
  - `LineChart/` : Graphique de durée des sessions
  - `RadarChart/` : Graphique des performances
  - `RadialBarChart/` : Graphique de score
  - `Loader/` : Composant de chargement
- `src/pages/` : Contient les pages principales de l'application
  - `Dashboard/` : Page principale du tableau de bord
  - `Profile/` : Page de profil utilisateur
- `src/utils/` : Contient les utilitaires communs
  - `chartCore.js` : Fonctions de base pour les graphiques
  - `buildBarChart.js` : Construction du graphique à barres
  - `buildLineChart.js` : Construction du graphique linéaire
  - `buildRadarChart.js` : Construction du graphique radar
  - `buildRadialBarChart.js` : Construction du graphique circulaire

### 3. Documentation

- JSDoc pour tous les composants et fonctions
- PropTypes pour la validation des props
- Commentaires explicatifs dans le code
- Guide de contribution disponible

### 4. Tests

- Tests unitaires avec Jest
- Tests d'intégration
- Tests de composants avec React Testing Library

### 5. Styles

- Utilisation de Tailwind CSS
- Styles modulaires
- Variables CSS personnalisées
- Thème cohérent
