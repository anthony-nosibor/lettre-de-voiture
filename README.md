# Lettre de voiture - Expo + Firebase

Application mobile React Native (Expo) pour créer des lettres de voiture dans le cadre de livraisons de médicaments à domicile.

## Fonctionnalités (MVP)

- Formulaire de création d'une lettre de voiture.
- Enregistrement des données dans Firebase Firestore (`lettres_de_voiture`).
- Structure prête pour une évolution (authentification, suivi de statut, historique, etc.).

## Prérequis

- Node.js 18+
- npm
- Un projet Firebase avec Firestore activé

## Installation

```bash
npm install
cp .env.example .env
```

Renseignez ensuite les variables Firebase dans `.env`.

## Lancer l'application

```bash
npm run start
```

Puis utilisez Expo Go (Android/iOS) ou `w` pour le web dans le terminal Expo.

## Structure

- `app/index.tsx`: écran principal et création de lettre de voiture.
- `services/firebase.ts`: initialisation Firebase + Firestore.
- `app.config.ts`: injection des variables d'environnement Expo.

## Idées d'évolution

- Ajouter une authentification (dispatcher, livreur).
- Ajouter une signature numérique du client.
- Ajouter un écran liste/filtre des livraisons.
- Générer un PDF de lettre de voiture.
