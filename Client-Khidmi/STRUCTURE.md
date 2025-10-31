# 📱 Structure Frontend - Application Khidmi

## ✅ Projet Initialisé

**Framework:** React Native avec Expo Router  
**Language:** TypeScript  
**Navigation:** Expo Router (file-based routing)  
**État:** Redux Toolkit + React Context

---

## 📁 Structure Complète

```
Client-Khidmi/
│
├── app/                       # Expo Router - Écrans de l'application
│   ├── (tabs)/               # Navigation par onglets
│   │   ├── _layout.tsx       # Layout principal avec tabs
│   │   ├── index.tsx         # Home screen (onglet 1)
│   │   └── explore.tsx       # Explore screen (onglet 2)
│   │
│   ├── (auth)/               # Stack d'authentification
│   │   ├── _layout.tsx       # Layout auth
│   │   ├── login.tsx         # Connexion
│   │   ├── register.tsx      # Inscription
│   │   └── forgot-password.tsx
│   │
│   ├── (services)/           # Services
│   │   ├── index.tsx         # Liste des services
│   │   └── [id].tsx          # Détail d'un service
│   │
│   ├── (bookings)/           # Réservations
│   │   ├── index.tsx         # Liste des réservations
│   │   └── [id].tsx          # Détail d'une réservation
│   │
│   ├── (chat)/               # Messagerie
│   │   ├── index.tsx         # Liste des conversations
│   │   └── [id].tsx          # Détail d'une conversation
│   │
│   ├── (profile)/            # Profil utilisateur
│   │   ├── index.tsx         # Profil
│   │   └── settings.tsx      # Paramètres
│   │
│   ├── (payments)/           # Paiements
│   │   ├── index.tsx         # Historique
│   │   └── methods.tsx       # Méthodes de paiement
│   │
│   ├── (reviews)/            # Avis
│   │   └── index.tsx         # Liste des avis
│   │
│   ├── modal.tsx             # Modal example
│   └── _layout.tsx           # Layout racine
│
├── lib/                       # Code source principal
│   ├── config/
│   │   └── api.ts            # Configuration API (Axios)
│   │
│   ├── store/                 # Redux store
│   │   ├── store.ts          # Configuration Redux
│   │   └── slices/
│   │       ├── authSlice.ts      # État authentification
│   │       ├── servicesSlice.ts  # État services
│   │       └── bookingsSlice.ts  # État réservations
│   │
│   ├── services/              # Services API
│   │   ├── api.ts            # Instance Axios
│   │   ├── authService.ts    # API auth
│   │   ├── userService.ts    # API users
│   │   ├── serviceService.ts # API services
│   │   ├── bookingService.ts # API bookings
│   │   ├── messageService.ts # API messages
│   │   └── paymentService.ts # API payments
│   │
│   ├── context/               # React Context
│   │   └── AuthContext.tsx   # Context authentification
│   │
│   ├── hooks/                 # Custom hooks
│   │   └── useAuth.ts        # Hook d'authentification
│   │
│   └── utils/                 # Utilitaires
│       ├── constants.ts      # Constantes
│       └── helpers.ts        # Fonctions helper
│
├── components/                # Composants globaux (Expo starter)
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
│
├── constants/                 # Constantes (Expo starter)
│   └── theme.ts
│
├── hooks/                     # Hooks Expo
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
├── assets/                    # Ressources
│   └── images/
│
├── package.json               # Dépendances
├── app.json                   # Configuration Expo
├── tsconfig.json              # Configuration TypeScript
└── STRUCTURE.md               # Ce fichier
```

---

## 📦 Dépendances Installées

### Core
- ✅ `expo` (~54.0.20)
- ✅ `react` (19.1.0)
- ✅ `react-native` (0.81.5)
- ✅ `expo-router` (~6.0.13)

### Navigation
- ✅ `@react-navigation/native` (^7.1.8)
- ✅ `@react-navigation/bottom-tabs` (^7.4.0)

### État & Données
- ✅ `@reduxjs/toolkit` (^2.0.0)
- ✅ `react-redux` (^9.0.0)
- ✅ `axios` (^1.6.0)

### Formulaires & Stockage
- ✅ `react-hook-form` (^7.48.0)
- ✅ `@react-native-async-storage/async-storage` (1.23.0)

### Fonctionnalités
- ✅ `expo-location` (~17.0.0)
- ✅ `expo-notifications` (~0.27.0)
- ✅ `socket.io-client` (^4.6.0)
- ✅ `expo-image-picker` (~15.0.0)
- ✅ `react-native-maps` (1.14.0)
- ✅ `expo-secure-store` (~14.0.0)

---

## 🎯 Écrans Principaux

### 🔐 Authentification
1. **Login** - `app/(auth)/login.tsx`
2. **Register** - `app/(auth)/register.tsx`
3. **Forgot Password** - `app/(auth)/forgot-password.tsx`

### 🏠 Home & Navigation
4. **Home** - `app/(tabs)/index.tsx`
5. **Explore** - `app/(tabs)/explore.tsx`

### 🛠️ Services
6. **Services List** - `app/(services)/index.tsx`
7. **Service Detail** - `app/(services)/[id].tsx`

### 📅 Réservations
8. **Bookings List** - `app/(bookings)/index.tsx`
9. **Booking Detail** - `app/(bookings)/[id].tsx`

### 💬 Chat
10. **Chat List** - `app/(chat)/index.tsx`
11. **Chat Detail** - `app/(chat)/[id].tsx`

### 👤 Profil
12. **Profile** - `app/(profile)/index.tsx`
13. **Settings** - `app/(profile)/settings.tsx`

### 💳 Paiements
14. **Payments History** - `app/(payments)/index.tsx`
15. **Payment Methods** - `app/(payments)/methods.tsx`

### ⭐ Avis
16. **Reviews** - `app/(reviews)/index.tsx`

---

## 🚀 Prochaines Étapes

### 1. Configuration de Base
- [ ] Configurer l'API Axios dans `lib/config/api.ts`
- [ ] Configurer Redux Store dans `lib/store/store.ts`
- [ ] Configurer AuthContext dans `lib/context/AuthContext.tsx`

### 2. Authentification
- [ ] Implémenter les slices Redux (authSlice)
- [ ] Créer les services API (authService)
- [ ] Développer les écrans d'authentification

### 3. Navigation
- [ ] Configurer la navigation principale
- [ ] Ajouter la navigation conditionnelle (auth/logged in)
- [ ] Créer le menu bottom tabs

### 4. Services Core
- [ ] Développer Home Screen
- [ ] Liste des services avec filtres
- [ ] Détail d'un service

### 5. Fonctionnalités Avancées
- [ ] Système de réservation
- [ ] Chat en temps réel (Socket.IO)
- [ ] Intégration maps
- [ ] Système de paiement
- [ ] Notifications push

---

## 🧪 Commands

```bash
# Démarrer le serveur de développement
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

## 📚 Documentation

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)

---

**Projet Khidmi - Marketplace de Services au Maroc** 🏠✨

