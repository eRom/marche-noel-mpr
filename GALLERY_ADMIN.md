# Administration de la Galerie Photos

Ce document explique comment utiliser le système d'upload de photos pour la galerie.

## 🔐 Accès

L'interface d'administration est accessible à l'URL : `/galerie/admin`

**Mot de passe par défaut** : `admin123`

⚠️ **Important** : Changez le mot de passe par défaut en production !

## 📝 Configuration

### Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Token Vercel Blob Storage (obligatoire)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# Mot de passe admin (SECRET - côté serveur uniquement)
# ⚠️ NE JAMAIS utiliser NEXT_PUBLIC_ pour des secrets !
ADMIN_PASSWORD=votre_mot_de_passe_securise
```

**Important :** Le mot de passe est vérifié côté serveur via l'API `/api/gallery/auth`. 
Il n'est JAMAIS exposé dans le JavaScript côté client.

### Obtenir le token Vercel Blob

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Storage** → **Blob**
4. Créez un nouveau store si nécessaire
5. Copiez le token `BLOB_READ_WRITE_TOKEN`

## 📸 Upload de photos

### Étapes d'upload

1. **Accédez à la page admin** : `/galerie/admin`
2. **Connectez-vous** avec le mot de passe
3. **Sélectionnez une catégorie** :
   - Stands
   - Animations
   - Visiteurs
   - Ambiance
   - MPR
4. **Ajoutez des images** :
   - Glissez-déposez les fichiers dans la zone
   - Ou cliquez pour sélectionner depuis votre ordinateur
5. **Prévisualisez** les images sélectionnées
6. **Cliquez sur "Uploader"** pour envoyer les images

### Formats acceptés

- **Types** : JPG, PNG, WebP
- **Taille max** : 10MB par image
- **Upload multiple** : Oui, vous pouvez uploader plusieurs images à la fois

### Organisation des fichiers

Les images sont automatiquement organisées sur Vercel Blob selon cette structure :

```
gallery/
  ├── stands/
  │   ├── photo-001-1699876543210.jpg
  │   └── stand-vin-chaud-1699876543211.jpg
  ├── animations/
  ├── visiteurs/
  ├── ambiance/
  └── MPR/
```

Le nom de fichier inclut :
- Le titre personnalisé (si fourni) ou "photo"
- Un timestamp unique
- L'extension originale

## 🔧 Fonctionnalités

### Interface d'upload

- ✅ **Drag & Drop** : Glissez-déposez vos images
- ✅ **Sélection multiple** : Uploadez plusieurs images d'un coup
- ✅ **Preview** : Visualisez les images avant upload
- ✅ **Progression** : Suivi en temps réel de l'upload
- ✅ **Gestion d'erreurs** : Messages clairs en cas de problème
- ✅ **Validation** : Vérification de type et taille côté client et serveur

### Sécurité

- 🔒 Protection par mot de passe
- 🔒 Validation des fichiers (type, taille)
- 🔒 Nom de fichiers sécurisés (pas de caractères dangereux)
- 🔒 Token d'authentification pour l'API

## 🚀 API d'upload

### Endpoint

`POST /api/gallery/upload`

### Headers

```
Authorization: Bearer {ADMIN_PASSWORD}
```

### Body (FormData)

```
file: File (image)
category: string (stands|animations|visiteurs|ambiance|MPR)
title: string (optionnel, nom personnalisé)
```

### Réponse succès

```json
{
  "success": true,
  "url": "https://xxx.public.blob.vercel-storage.com/gallery/stands/photo-001.jpg",
  "pathname": "gallery/stands/photo-001.jpg",
  "message": "Image uploadée avec succès"
}
```

### Réponse erreur

```json
{
  "error": "Message d'erreur"
}
```

## 🐛 Dépannage

### Erreur "Non autorisé"
- Vérifiez que `ADMIN_PASSWORD` est défini dans `.env.local`
- Vérifiez que vous utilisez le bon mot de passe

### Erreur "Type de fichier non autorisé"
- Seuls JPG, PNG et WebP sont acceptés
- Convertissez votre image dans un format compatible

### Erreur "Fichier trop volumineux"
- La taille maximale est 10MB
- Réduisez la taille ou compressez l'image

### Images n'apparaissent pas dans la galerie
- Vérifiez que le `BLOB_READ_WRITE_TOKEN` est correct
- Vérifiez la structure du pathname (doit commencer par `gallery/`)
- Rechargez la page galerie (les images sont chargées côté serveur)

## 💡 Recommandations

### Pour de meilleures performances

1. **Optimisez vos images avant upload** :
   - Résolution recommandée : 1920px de largeur max
   - Compressez avec des outils comme TinyPNG
   - Privilégiez le format WebP si possible

2. **Nommez vos fichiers de manière descriptive** :
   - Le nom sera utilisé comme titre par défaut
   - Exemple : `stand-crepes-2024.jpg` → "Stand Crepes 2024"

3. **Organisez par catégorie** :
   - Utilisez les bonnes catégories dès le départ
   - Cela facilite la navigation dans la galerie

### Sécurité en production

1. **Changez le mot de passe** :
   - Utilisez un mot de passe fort et unique
   - Ne partagez pas le mot de passe publiquement

2. **Considérez une vraie authentification** :
   - Pour un usage en production sérieux
   - Utilisez NextAuth.js ou un service d'authentification

3. **Limitez l'accès** :
   - Ajoutez une liste blanche d'IPs si possible
   - Utilisez des variables d'environnement différentes par environnement

## 📚 Support

Pour toute question ou problème, contactez l'équipe de développement.

