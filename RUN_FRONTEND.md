# 🚀 Comment Lancer le Frontend Khidmi

## 📱 Option 1: Sur Device Physique (Recommandé)

### 1. Installer Expo Go
- **Android:** Google Play Store - Cherchez "Expo Go"
- **iOS:** App Store - Cherchez "Expo Go"

### 2. Lancer le serveur Expo
```bash
cd Client-Khidmi
npm start
```

### 3. Scanner le QR Code
- **Android:** Ouvrez Expo Go et scannez le QR code
- **iOS:** Ouvrez l'app Caméra et scannez le QR code

---

## 📱 Option 2: Sur Emulateur Android

### 1. Installer Android Studio
- Téléchargez depuis: https://developer.android.com/studio
- Installez Android SDK et un émulateur

### 2. Lancer l'émulateur
- Ouvrez Android Studio
- Démarrez un émulateur (Pixel 6 par exemple)

### 3. Lancer l'app
```bash
cd Client-Khidmi
npm run android
```

---

## 📱 Option 3: Sur iOS Simulator (Mac uniquement)

### 1. Installer Xcode
- Téléchargez depuis l'App Store
- Installer les outils de ligne de commande

### 2. Lancer le simulateur
- Ouvrez Xcode
- Tools > Simulator

### 3. Lancer l'app
```bash
cd Client-Khidmi
npm run ios
```

---

## 🌐 Option 4: Sur Navigateur Web

```bash
cd Client-Khidmi
npm run web
```

L'application s'ouvrira dans votre navigateur par défaut.

---

## ⚠️ Important: Configurer l'URL du Backend

Avant de tester, vous devez configurer l'URL de votre backend dans:
**`Client-Khidmi/lib/config/api.ts`**

### Pour Emulateur Android:
```typescript
export const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

### Pour iOS Simulator:
```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Pour Device Physique:
```typescript
export const API_BASE_URL = 'http://VOTRE_IP_LOCALE:5000/api';
```

Pour trouver votre IP locale:
- **Windows:** `ipconfig` dans PowerShell
- **Mac/Linux:** `ifconfig` dans Terminal

---

## 🧪 Tester les Écrans Auth

### Naviguer vers Login:
```typescript
// Dans l'app
import { router } from 'expo-router';
router.push('/(auth)/login');
```

### Naviguer vers Register:
```typescript
router.push('/(auth)/register');
```

---

## 📋 Checklist

- [ ] Expo Go installé
- [ ] npm start lancé
- [ ] QR code scanné
- [ ] Backend démarré (port 5000)
- [ ] API_BASE_URL configuré correctement

---

## 🐛 Problèmes Courants

### "Network request failed"
- Vérifiez que le backend tourne
- Vérifiez l'URL dans api.ts
- Vérifiez votre connexion réseau

### "Cannot connect to Expo"
- Redémarrez `npm start`
- Vérifiez que l'appareil et le PC sont sur le même WiFi

### "Port 8081 already in use"
```bash
# Tuer le processus
npx kill-port 8081
# Relancer
npm start
```

---

**Prêt à tester!** 🎉

