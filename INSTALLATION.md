# 🔧 Guide d'Installation - Khidmi

## ✅ Dépendances Installées

Toutes les dépendances nécessaires ont été installées avec succès !

---

## 📦 Backend (Server-Khidmi)

### Dépendances Principales
- ✅ **express** ^4.18.2 - Framework web
- ✅ **mongoose** ^7.5.0 - ODM MongoDB
- ✅ **dotenv** ^16.3.1 - Variables d'environnement
- ✅ **bcryptjs** ^2.4.3 - Hachage mots de passe
- ✅ **jsonwebtoken** ^9.0.2 - JWT auth
- ✅ **socket.io** ^4.6.1 - WebSocket chat
- ✅ **cloudinary** ^1.41.0 - Upload images
- ✅ **multer** ^1.4.5 - Upload fichiers
- ✅ **express-validator** ^7.0.1 - Validation
- ✅ **cors** ^2.8.5 - CORS
- ✅ **helmet** ^7.0.0 - Sécurité
- ✅ **express-rate-limit** ^6.10.0 - Rate limiting
- ✅ **morgan** ^1.10.0 - Logging
- ✅ **express-fileupload** ^1.4.0 - Upload fichiers

### Dev Dependencies
- ✅ **nodemon** ^3.0.1 - Auto-reload
- ✅ **jest** ^29.7.0 - Testing

### Total
**446 packages** installés en **4 minutes**

---

## 📱 Frontend (Client-Khidmi)

### Dépendances Principales
- ✅ **expo** ~54.0.20 - Framework React Native
- ✅ **react** 19.1.0 - Library UI
- ✅ **react-native** 0.81.5 - Mobile framework
- ✅ **expo-router** ~6.0.13 - Navigation
- ✅ **@reduxjs/toolkit** ^2.9.2 - État global
- ✅ **react-redux** ^9.2.0 - Redux bindings
- ✅ **axios** ^1.13.1 - HTTP client
- ✅ **react-hook-form** ^7.65.0 - Formulaires
- ✅ **socket.io-client** ^4.8.1 - WebSocket client
- ✅ **expo-location** ^19.0.7 - Géolocalisation
- ✅ **expo-notifications** ^0.32.12 - Notifications push
- ✅ **expo-image-picker** ^17.0.8 - Sélection images
- ✅ **react-native-maps** ^1.26.18 - Cartes
- ✅ **expo-secure-store** ^15.0.7 - Stockage sécurisé
- ✅ **@react-native-async-storage/async-storage** ^2.2.0 - Stockage local

### Expo Hooks & Components
- ✅ **@expo/vector-icons** ^15.0.3
- ✅ **expo-haptics** ~15.0.7
- ✅ **expo-image** ~3.0.10
- ✅ **expo-status-bar** ~3.0.8

### React Navigation
- ✅ **@react-navigation/native** ^7.1.8
- ✅ **@react-navigation/bottom-tabs** ^7.4.0
- ✅ **@react-navigation/elements** ^2.6.3
- ✅ **react-native-gesture-handler** ~2.28.0
- ✅ **react-native-reanimated** ~4.1.1
- ✅ **react-native-safe-area-context** ~5.6.0
- ✅ **react-native-screens** ~4.16.0

### Dev Dependencies
- ✅ **typescript** ~5.9.2
- ✅ **eslint** ^9.25.0
- ✅ **eslint-config-expo** ~10.0.0

### Total
**1002 packages** installés (déjà présents)

---

## 🚀 Commandes Disponibles

### Backend

```bash
cd Server-Khidmi

# Mode développement (avec auto-reload)
npm run dev

# Production
npm start

# Tests
npm test
```

### Frontend

```bash
cd Client-Khidmi

# Démarrer Expo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web

# Linter
npm run lint
```

---

## 📋 Prochaines Étapes

### 1. Configuration Backend

Créer le fichier `.env` dans `Server-Khidmi/` :

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/khidmi

JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRE=30d

CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

PAYMENT_API_KEY=votre_api_payment
```

### 2. Configuration Frontend

Configurer l'URL de l'API dans `Client-Khidmi/lib/config/api.ts` :

```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### 3. Démarrer MongoDB

```bash
# Windows (via MongoDB installer)
mongod

# Ou utiliser MongoDB Atlas (cloud)
```

### 4. Tester l'Installation

#### Backend
```bash
cd Server-Khidmi
npm run dev
# Vérifier: http://localhost:5000/health
```

#### Frontend
```bash
cd Client-Khidmi
npm start
# Scanner le QR code avec Expo Go
```

---

## ⚠️ Notes Importantes

1. **MongoDB** doit être démarré pour le backend
2. **Node.js** version 18+ recommandée
3. **Expo Go** app nécessaire pour tester sur mobile
4. **Android Studio** / **Xcode** pour les builds natifs

---

## 🎯 Structure des Commandes

```
Application Mobile Khidmi/
│
├── Server-Khidmi/
│   ├── npm install          ✅ Fait
│   ├── npm run dev         ⏭️ À faire
│   └── .env                ⏭️ À créer
│
└── Client-Khidmi/
    ├── npm install          ✅ Fait
    ├── npm start           ⏭️ À faire
    └── lib/config/api.ts   ⏭️ À configurer
```

---

## ✅ Checklist Installation

- [x] Backend dependencies installées
- [x] Frontend dependencies installées
- [ ] MongoDB installé et démarré
- [ ] Fichier .env créé (backend)
- [ ] Configuration API (frontend)
- [ ] Backend démarré
- [ ] Frontend démarré
- [ ] Tests de connexion

---

**Installation terminée ! Prêt pour le développement** 🚀

