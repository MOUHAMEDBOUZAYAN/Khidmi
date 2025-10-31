# Khidmi Backend - Structure des Fichiers

## 📁 Structure du Projet Backend

```
backend/
│
├── config/                 # Configuration de l'application
│   ├── database.js         # Configuration MongoDB
│   ├── cloudinary.js       # Configuration Cloudinary (images)
│   └── ...                 # Autres configurations
│
├── models/                 # Modèles de données (MongoDB/Mongoose)
│   ├── User.js             # Modèle utilisateur
│   ├── Service.js          # Modèle service
│   ├── Booking.js          # Modèle réservation
│   ├── Review.js           # Modèle avis
│   ├── Message.js          # Modèle message (chat)
│   ├── Subscription.js     # Modèle abonnement premium
│   └── ...                 # Autres modèles
│
├── controllers/            # Contrôleurs (logique métier)
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── service.controller.js
│   ├── booking.controller.js
│   ├── review.controller.js
│   ├── message.controller.js
│   ├── subscription.controller.js
│   ├── payment.controller.js
│   └── ...
│
├── routes/                 # Routes API
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── service.routes.js
│   ├── booking.routes.js
│   ├── review.routes.js
│   ├── message.routes.js
│   ├── subscription.routes.js
│   ├── payment.routes.js
│   └── ...
│
├── middlewares/            # Middlewares
│   ├── auth.middleware.js  # Authentification JWT
│   ├── validation.middleware.js
│   ├── upload.middleware.js
│   ├── error.middleware.js
│   └── ...
│
├── utils/                  # Utilitaires et helpers
│   ├── constants.js
│   ├── helpers.js
│   ├── validators.js
│   └── ...
│
├── services/               # Services externes
│   ├── email.service.js
│   ├── payment.service.js  # Intégration paiement
│   ├── notification.service.js
│   └── ...
│
├── uploads/                # Fichiers uploadés
│   ├── public/
│   │   ├── images/         # Images de profil, services
│   │   └── documents/      # Documents justificatifs
│   └── temp/               # Fichiers temporaires
│
├── logs/                   # Fichiers de logs
│
├── tests/                  # Tests unitaires et d'intégration
│   ├── auth.test.js
│   ├── booking.test.js
│   └── ...
│
├── server.js               # Point d'entrée de l'application
├── package.json            # Dépendances npm
├── .env                    # Variables d'environnement
├── .env.example            # Exemple de configuration
└── .gitignore              # Fichiers ignorés par Git
```

## 🔑 Fichiers Clés

### Configuration
- **config/database.js** : Connexion MongoDB
- **config/cloudinary.js** : Configuration Cloudinary pour les images

### Modèles Principaux
1. **User** : Clients et prestataires
2. **Service** : Catégories de services (électricien, plombier, etc.)
3. **Booking** : Réservations
4. **Review** : Avis clients
5. **Message** : Chat entre client/prestataire
6. **Subscription** : Abonnements Premium

### API Endpoints Principaux
- `/api/auth` : Authentification (login, register)
- `/api/users` : Gestion des utilisateurs
- `/api/services` : Services disponibles
- `/api/bookings` : Réservations
- `/api/reviews` : Système d'évaluation
- `/api/messages` : Chat en temps réel
- `/api/subscriptions` : Abonnements Premium
- `/api/payments` : Traitement des paiements

## 🚀 Prochaines Étapes

1. Définir les modèles de données détaillés
2. Implémenter l'authentification JWT
3. Créer les APIs CRUD pour chaque ressource
4. Intégrer le système de paiement marocain
5. Ajouter Socket.IO pour le chat en temps réel
6. Déployer sur un serveur cloud

