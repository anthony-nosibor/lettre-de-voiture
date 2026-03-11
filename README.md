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

## Dépannage

### Erreur: `Fichier 'expo/tsconfig.base' introuvable.ts`

Cette erreur arrive quand les dépendances Expo ne sont pas installées (ou quand l'environnement bloque `npm install`).

- Dans cette version du projet, `tsconfig.json` n'utilise plus `extends: "expo/tsconfig.base"`, donc l'erreur disparaît même sans ce fichier.
- Si vous êtes en local, installez quand même les dépendances dès que possible:

```bash
npm install
```

Puis redémarrez TypeScript Server dans votre éditeur (VS Code: `Ctrl+Shift+P` → `TypeScript: Restart TS Server`).


## Firebase Firestore avec Expo: pas de `build.gradle`, c'est normal

Si vous utilisez **Expo en mode managed** (ce projet), vous n'avez pas de dossier `android/` ni de fichier `android/build.gradle` tant que vous ne faites pas `prebuild`.

Pour Firestore dans cette app, on utilise le **SDK JavaScript Firebase** (`firebase/app` + `firebase/firestore`).
Donc vous n'avez **pas besoin** de modifier `build.gradle` pour cette intégration.

### Ce que vous devez faire

1. Copier les variables d'environnement:

```bash
cp .env.example .env
```

2. Renseigner vos clés Firebase (`EXPO_PUBLIC_FIREBASE_*`) dans `.env`.
3. Redémarrer Expo:

```bash
npm run start
```

### Quand un `build.gradle` devient nécessaire ?

Seulement si vous passez sur du **native Android** (ex: `npx expo prebuild`, ou `npx expo run:android`) et que vous ajoutez des modules natifs qui l'exigent.
Dans ce cas, Expo génère le dossier `android/` automatiquement.


### Erreur Web: `Unable to resolve "react-native-web/dist/index"`

Cette erreur signifie généralement que les dépendances Web d'Expo ne sont pas installées ou sont incohérentes avec la version d'Expo.

Dans ce projet, il faut avoir **au minimum**:

- `react-dom`
- `react-native-web`

Elles sont maintenant déclarées dans `package.json`.

Ensuite, en local:

```bash
npm install
npm run web
```

Si l'erreur persiste, videz le cache Metro:

```bash
npx expo start -c
```
