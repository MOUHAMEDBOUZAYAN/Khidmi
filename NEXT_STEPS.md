# 🎯 Prochaines Étapes - Khidmi

## ✅ Étape 1: Installation des Dépendances - TERMINÉE

- ✅ Backend packages installés (446)
- ✅ Frontend packages installés (1002)
- ✅ Documentation créée

---

## 🔧 Étape 2: Configuration Backend

### 2.1 Créer le fichier .env

```bash
cd Server-Khidmi
```

Créer `.env` avec:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/khidmi
# OU utiliser MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/khidmi

# JWT
JWT_SECRET=khidmi_super_secret_jwt_key_2025_change_in_production
JWT_EXPIRE=30d

# Cloudinary (obtenir depuis cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optionnel)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Payment (optionnel - CMI, Stripe, etc.)
PAYMENT_API_KEY=your_payment_key
PAYMENT_API_SECRET=your_payment_secret
```

### 2.2 Installer et démarrer MongoDB

**Option A: MongoDB Local**
```bash
# Windows - Télécharger depuis mongodb.com
# Après installation:
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Aller sur mongodb.com/cloud/atlas
2. Créer un compte gratuit
3. Créer un cluster
4. Obtenir connection string
5. Mettre à jour MONGODB_URI dans .env

### 2.3 Tester le serveur

```bash
cd Server-Khidmi
npm run dev

# Devrait afficher:
# 🚀 Server running in development mode on port 5000
# ✅ MongoDB Connected: ...
```

Tester: http://localhost:5000/health

---

## 📱 Étape 3: Configuration Frontend

### 3.1 Configurer l'API Base URL

Éditer `Client-Khidmi/lib/config/api.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

**Pour Android Emulator:**
```typescript
export const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

**Pour iOS Simulator:**
```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

**Pour device physique:**
```typescript
export const API_BASE_URL = 'http://VOTRE_IP_LOCALE:5000/api';
```

### 3.2 Démarrer le frontend

```bash
cd Client-Khidmi
npm start
```

Scanner le QR code avec Expo Go app sur mobile.

---

## 🏗️ Étape 4: Développement Étape par Étape

### Phase 1: Backend Core

**Priorité 1: Configuration & Base**
- [ ] Configurer MongoDB
- [ ] Créer fichier .env
- [ ] Tester connexion DB
- [ ] Configurer Cloudinary

**Priorité 2: Modèles**
- [ ] Modèle User (client + prestataire)
- [ ] Modèle Service
- [ ] Modèle Booking
- [ ] Modèle Review
- [ ] Modèle Message

**Priorité 3: Authentification**
- [ ] User registration
- [ ] Login JWT
- [ ] Middleware auth
- [ ] Logout

**Priorité 4: CRUD Services**
- [ ] Create service
- [ ] Get services list
- [ ] Get service by ID
- [ ] Update service
- [ ] Delete service

**Priorité 5: Bookings**
- [ ] Create booking
- [ ] Get bookings
- [ ] Update booking status
- [ ] Cancel booking

**Priorité 6: Reviews**
- [ ] Create review
- [ ] Get reviews
- [ ] Update review

**Priorité 7: Chat**
- [ ] Socket.IO setup
- [ ] Chat messages
- [ ] Real-time updates

---

### Phase 2: Frontend Core

**Priorité 1: Configuration**
- [ ] Redux store setup
- [ ] API service
- [ ] Auth context

**Priorité 2: Authentification**
- [ ] Login screen
- [ ] Register screen
- [ ] Auth flow

**Priorité 3: Home & Services**
- [ ] Home screen
- [ ] Services list
- [ ] Service detail
- [ ] Search & filters

**Priorité 4: Bookings**
- [ ] Booking list
- [ ] Booking detail
- [ ] Create booking

**Priorité 5: Profile**
- [ ] Profile screen
- [ ] Edit profile
- [ ] Settings

**Priorité 6: Chat**
- [ ] Chat list
- [ ] Chat screen
- [ ] Socket integration

**Priorité 7: Payments**
- [ ] Payment methods
- [ ] Payment history

---

## 📊 Ordre de Développement Recommandé

### Sprint 1: Base Backend (Semaine 1)
1. Configuration MongoDB + .env
2. Modèle User
3. Auth (register, login)
4. Middleware JWT
5. Tests API

### Sprint 2: Services (Semaine 2)
1. Modèle Service
2. CRUD Services
3. Modèle Booking
4. CRUD Bookings
5. Tests API

### Sprint 3: Frontend Auth (Semaine 3)
1. Redux setup
2. API service
3. Login screen
4. Register screen
5. Navigation auth

### Sprint 4: Home & Services (Semaine 4)
1. Home screen
2. Services list
3. Service detail
4. Search & filters
5. Booking flow

### Sprint 5: Features (Semaine 5)
1. Profile screens
2. Reviews
3. Chat setup
4. Settings

### Sprint 6: Polish (Semaine 6)
1. Real-time chat
2. Payments
3. Maps
4. Notifications
5. UI/UX improvements

---

## 🎯 Commencer Maintenant

### 1. Configuration MongoDB

**Si MongoDB n'est pas installé:**

```bash
# Télécharger MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Ou utiliser MongoDB Atlas (recommandé pour débuter)
# https://www.mongodb.com/cloud/atlas/register
```

### 2. Créer .env Backend

```bash
cd Server-Khidmi
# Créer .env manuellement ou via IDE
```

### 3. Première Commande

```bash
cd Server-Khidmi
npm run dev
```

Si ça fonctionne, vous verrez:
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: ...
```

**Prochaine étape:** Implémenter le code backend dans les fichiers vides !

---

## 📚 Ressources

- [MongoDB Installation](https://docs.mongodb.com/manual/installation/)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Cloudinary Setup](https://cloudinary.com/documentation)
- [Expo Docs](https://docs.expo.dev/)

---

**Prêt à commencer le développement !** 🚀

