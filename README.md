# 🏠 Khidmi - Marketplace de Services au Maroc

## 📋 Description

**Khidmi** est une application mobile moderne qui connecte les particuliers avec des prestataires de services locaux (électriciens, plombiers, femmes de ménage, coiffeurs, etc.) partout au Maroc.

L'objectif est de simplifier la recherche, la réservation et le paiement de services domestiques en toute confiance.

---

## 🎯 Fonctionnalités Principales

### Pour les Clients
- 🔍 **Recherche de services** par catégorie ou localisation
- 📅 **Réservation** immédiate ou planifiée
- ⭐ **Évaluation** du prestataire après la prestation
- 💬 **Communication** via chat intégré
- 💳 **Paiement** après service ou différé

### Pour les Prestataires
- 👤 **Profil professionnel** avec photos et tarifs
- 📊 **Dashboard** pour gérer réservations et revenus
- 🌟 **Premium** pour améliorer la visibilité
- 💬 **Chat** avec les clients

---

## 🏗️ Structure du Projet

```
Application Mobile Khidmi/
│
├── 📱 Client-Khidmi/        # Frontend - React Native (Expo)
│   ├── app/                 # Écrans (Expo Router)
│   ├── lib/                 # Code source
│   ├── components/          # Composants réutilisables
│   └── assets/              # Ressources
│
├── 🔧 Server-Khidmi/        # Backend - Node.js + Express
│   ├── models/              # Modèles MongoDB
│   ├── controllers/         # Contrôleurs API
│   ├── routes/              # Routes API
│   ├── services/            # Services externes
│   └── middlewares/         # Middlewares
│
├── 📄 Documentation/
│   ├── README.md            # Ce fichier
│   ├── SUMMARY.md           # Résumé complet
│   └── STRUCTURE.md         # Guide de structure
```

---

## 🛠️ Technologies Utilisées

### Frontend
- **React Native** avec Expo
- **TypeScript**
- **Expo Router** (file-based routing)
- **Redux Toolkit** (état global)
- **Axios** (HTTP client)
- **React Hook Form** (formulaires)
- **Socket.IO Client** (chat temps réel)
- **React Native Maps** (cartes)

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** (authentification)
- **Cloudinary** (upload images)
- **Socket.IO** (websocket)
- **Multer** (upload fichiers)

---

## 🚀 Installation

### Backend (Server-Khidmi)

```bash
cd Server-Khidmi

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Configurer les variables d'environnement
# MongoDB URI, JWT Secret, Cloudinary, etc.

# Démarrer le serveur
npm run dev
```

### Frontend (Client-Khidmi)

```bash
cd Client-Khidmi

# Installer les dépendances
npm install

# Démarrer l'application
npm start

# Ou directement sur Android/iOS
npm run android
npm run ios

# Ou sur web
npm run web
```

---

## 📦 Structure Détaillée

Consultez les fichiers de documentation :
- `SUMMARY.md` - Vue d'ensemble complète
- `Server-Khidmi/STRUCTURE.md` - Structure backend
- `Client-Khidmi/STRUCTURE.md` - Structure frontend

---

## 🔑 Configuration

### Variables d'Environnement Backend

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/khidmi

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Configuration Frontend

```typescript
// lib/config/api.ts
export const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🎯 Prochaines Étapes

1. **Configuration** - MongoDB, Cloudinary, variables d'environnement
2. **Authentification** - Implémenter login/register avec JWT
3. **CRUD Services** - Créer, lire, mettre à jour, supprimer les services
4. **Réservations** - Système de booking
5. **Chat** - Messagerie en temps réel
6. **Paiements** - Intégration gateway
7. **Notifications** - Push notifications
8. **Maps** - Géolocalisation

---

## 📚 Documentation

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

---

## 📝 Licence

Ce projet est un projet personnel.

---

## 👥 Équipe

Projet développé pour le marché marocain.

---

**Khidmi** - Simplifier les services à domicile au Maroc 🇲🇦✨

