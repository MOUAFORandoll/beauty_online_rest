<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo">
  </a>
</p>

<h1 align="center">Beauty Online API & DeepLinks</h1>

<p align="center">
  <strong>Une architecture modulaire en <a href="https://nestjs.com" target="_blank">NestJS</a> pour construire une API REST et un système de Deep Links scalable.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Version NPM"></a>
  <a href="https://github.com/nestjs/nest/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License"></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI"></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master" alt="Coverage"></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"></a>
</p>

---

## 🧩 Description

> **Beauty Online** est une application backend développée avec **NestJS**.  
> Elle se compose de **deux modules indépendants** :
>
> - 🌐 **REST API** : Gestion des utilisateurs, services, notifications, etc.
> - 🔗 **DeepLinks** : Génération de liens universels pour mobile (iOS & Android).

---

## 🛠️ Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env

ENVIRONMENT=production

# Firebase
FIREBASE_SECRET_PATH=./firebase-adminsdk.json

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/beauty_online

# API REST
APP_NAME=Beauty online
PORT=8080
APP_API_URL=http://localhost:8080
APP_ROUTE_PREFIX=api
APP_ROUTE_DOCUMENTATION=/api/documentation

# DeepLinks
DEEPLINKS_NAME=Link app
DEEPLINKS_PORT=8081
DEEPLINKS_URL=http://localhost:8081
DEEPLINKS_BASE_URL=https://share.beauty.petite-monnaie.com
DEEPLINKS_ROUTE_DOCUMENTATION=/api/documentation


# Link App settings
STREAM_NAME="STREAM app"
STREAM_PORT=8082
STREAM_ROUTE_DOCUMENTATION='/api/documentation'
STREAM_URL="http://localhost:8082"
STREAM_BASE_URL="https://stream.beauty.petite-monnaie.com"



APPLE_APP_SITE_ASSOCIATION_PATH=src/deeplinks/dto/apple-app-site-association.template.json
ASSETLINKS_PATH=src/deeplinks/dto/assetlinks.template.json

# AWS (S3 + SES)
AWS_ACCESS_KEY_ID=...
AWS_ACCESS_KEY_SECRET=...
AWS_REGION=us-east-2
AWS_BUCKET=mystore4274
AWS_CLOUDFRONT_URL=https://dam8qtg35ovlt.cloudfront.net



MAIL_USER=hari.randoll@gmail.com
MAIL_PASS=sfisvbboqrlmxblf
MAIL_FROM_NAME=Beauty Online

# Notifications
NOTIFICATION_URL=http://localhost:2000/api/send-notification

# Tests unitaires
npm run test

# Tests end-to-end
npm run test:e2e

# Rapport de couverture
npm run test:cov

npm run build

# Fichier de deploiement
ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'api-rest',
      script: 'dist/main_api.js',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'deeplinks',
      script: 'dist/main_deeplink.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

# Commande de deploient

pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
