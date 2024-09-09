# Tekkare - Dashboard Crypto

Tekkare est une application **frontend** pour visualiser des indicateurs de performance clé (KPI) liés aux cryptomonnaies comme Bitcoin (BTC) et Ethereum (ETH). Elle propose une interface utilisateur moderne et réactive, avec des graphiques interactifs et des données en temps réel.

## Choix techniques

### 1. **React**
React est utilisé comme **framework** principal pour construire l'interface utilisateur. Il permet de créer des composants réutilisables et facilite la gestion des états complexes.

### 2. **React Router**
Pour la gestion des routes, nous utilisons **React Router v6**. Cela permet de gérer facilement la navigation à travers les différentes pages de l'application.

### 3. **Tanstack React Query**
**React Query** est utilisé pour gérer la récupération des données depuis des APIs externes (comme CoinGecko). Il permet un **caching** efficace des données, des requêtes optimisées, et une gestion simple des états de chargement et d'erreurs.

### 4. **TailwindCSS**
**TailwindCSS** est utilisé pour le **design**. Il permet de styliser les composants de manière réactive et modulaire grâce à des classes utilitaires. Des bibliothèques supplémentaires comme `tailwindcss-animate` sont utilisées pour ajouter des animations.

### 5. **Recharts**
**Recharts** est utilisé pour créer des graphiques interactifs et visuels, comme des **bar charts** et des **pie charts**. C'est une bibliothèque puissante et facile à utiliser pour les visualisations de données.

### 6. **Radix UI**
**Radix UI** est utilisé pour les composants interactifs accessibles tels que les **tooltips**, **avatars**, **menus déroulants** et plus encore. Radix assure une interface fluide et moderne.

### 7. **TypeScript**
L'application est développée en **TypeScript** pour profiter d'un typage fort et réduire les erreurs potentielles lors du développement. Cela permet également une meilleure documentation interne du code.

### 8. **ESLint**
**ESLint** est utilisé pour assurer la qualité et la cohérence du code. Il permet d'éviter les erreurs courantes et assure un style de code uniforme.

## Installation et exécution

Suivez les étapes ci-dessous pour installer et exécuter le projet localement.

### Prérequis

- **Node.js** (version recommandée : 18.x.x ou supérieure)
- **npm** ou **pnpm** installé globalement

## Structure du projet
- **src/components** : Contient les composants réutilisables comme GraphAPI, CryptoCard, BarChart, etc.
- **src/hooks** : Contient les hooks personnalisés comme usePortfolio, useCryptoCard pour la gestion des états et des fonctionnalités spécifiques.
- **src/utils** : Contient des services comme FetchAPI et des types TypeScript pour gérer les appels API et les types de données.
- **src/data** : Contient les données JSON mockées et statiques pour le développement local.

## API utilisée
L'application utilise l'API CoinGecko pour récupérer les données de marché en temps réel pour les cryptomonnaies. React Query permet de gérer les appels API, avec des fonctionnalités de mise en cache et de rafraîchissement automatique.

## Fonctionnalités
- **Graphiques interactifs** : Affichage des frais de transaction (Gas Fees) sous forme de bar chart, et répartition du portefeuille sous forme de graphique circulaire.
- **Mode privé** : Possibilité d'activer un mode privé pour masquer les informations sensibles.
- **Support multi-devises** : Le projet supporte différentes devises (USD, EUR) avec des conversions dynamiques.
- **Mobile-first design** : Le design est responsive et fonctionne aussi bien sur desktop que sur mobile.

### Installation

Clonez le dépôt Git du projet et installez les dépendances nécessaires :

```bash
# Cloner le dépôt
git clone https://github.com/AdrienPoua/tekkare_test

# Accédez au répertoire du projet
cd tekkare

# Installer les dépendances avec pnpm (ou npm/yarn)
pnpm install

