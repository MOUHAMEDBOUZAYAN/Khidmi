# ⚡ Quick Start - Voir les Écrans Login/Register

## 🎯 Étape 1: Backend
```bash
cd Server-Khidmi
npm run dev
```

Attendez de voir:
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

---

## 🎯 Étape 2: Frontend

### Option A: Expo Go (Recommandé)

1. **Téléchargez Expo Go** sur votre téléphone
2. **Lancez:**
```bash
cd Client-Khidmi
npm start
```
3. **Scannez le QR code** avec Expo Go
4. L'app va charger automatiquement!

### Option B: Android Emulator

```bash
cd Client-Khidmi
npm run android
```

### Option C: iOS Simulator (Mac)

```bash
cd Client-Khidmi
npm run ios
```

---

## ⚙️ Configuration API

**IMPORTANT:** Configurez l'URL du backend dans `Client-Khidmi/lib/config/api.ts`:

### Pour Android Emulator:
```typescript
export const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

### Pour iOS Simulator:
```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Pour Device Physique:
```typescript
export const API_BASE_URL = 'http://192.168.X.X:5000/api'; // Votre IP locale
```

---

## 🧪 Tester les Écrans

Une fois l'app lancée, vous verrez l'écran Home.

Pour aller sur Login:
- Cliquez sur "Connectez-vous pour commencer"
- OU naviguez vers: `/(auth)/login`

Pour aller sur Register:
- Cliquez sur "Pas de compte? Inscrivez-vous"
- OU naviguez vers: `/(auth)/register`

---

## 📱 Ce que vous verrez

### Login Screen
- Champs: Email, Mot de passe
- Bouton: "Se connecter"
- Lien vers inscription

### Register Screen
- Champs: Nom, Email, Téléphone, Mot de passe
- Choix: Client ou Prestataire
- Bouton: "S'inscrire"
- Lien vers connexion

---

**Lancez maintenant et testez!** 🚀

