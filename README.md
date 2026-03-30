# LubeRight - Guide d installation general (FR)

Application full-stack pour le suivi de graissage/lubrification.
Le projet contient 3 services:

- `remote-api` (Spring Boot): lit la base source SQL Server (`Admin`, `Calender`).
- `Backend` (Spring Boot): met en cache les donnees et expose `GET /api/lubrication/latest/{name}`.
- `frontend/App_Marsa` (React + Vite): interface utilisateur.

## 1) Prerequis

- Java 17
- Maven 3.9+
- Node.js 18+
- npm 9+
- SQL Server accessible

## 2) Ce que vous devez configurer

### 2.1 `remote-api/.env`

Creer le fichier `remote-api/.env`:

```properties
DB_URL=jdbc:sqlserver://<HOST_SQL>;databaseName=<DB_SOURCE>;encrypt=true;trustServerCertificate=true
DB_USERNAME=<USER_SQL>
DB_PASSWORD=<PASSWORD_SQL>
```

`remote-api` tourne par defaut sur `http://localhost:8082`.

### 2.2 `Backend/.env`

Creer le fichier `Backend/.env`:

```properties
DB_URL=jdbc:sqlserver://<HOST_SQL>;databaseName=<DB_CACHE>;encrypt=true;trustServerCertificate=true
DB_USERNAME=<USER_SQL>
DB_PASSWORD=<PASSWORD_SQL>

REMOTE_API_BASE_URL=http://localhost:8082
SYNC_INTERVAL=5000
```

Important:

- `DB_CACHE` est la base locale de cache (pas la base source).
- `REMOTE_API_BASE_URL` doit pointer vers `remote-api`.
- `SYNC_INTERVAL` est en millisecondes.

### 2.3 Frontend Vite proxy

Verifier `frontend/App_Marsa/vite.config.ts`:

```ts
proxy: {
  '/api': {
    target: 'http://localhost:8081',
    changeOrigin: true,
  },
},
```

Si le backend ne tourne pas sur `8081`, modifier `target`.

### 2.4 CORS backend

Verifier `Backend/src/main/java/com/marsa/luberight/config/WebConfig.java`.
Par defaut:

- `http://localhost:5173`
- `http://localhost:4173`

Si votre frontend utilise une autre URL, ajouter cette URL dans `allowedOrigins(...)`.

### 2.5 HMR/ngrok (optionnel)

Dans `frontend/App_Marsa/vite.config.ts`, la section:

```ts
hmr: {
  host: '...',
  protocol: 'wss',
},
```

est utile pour un acces externe (ngrok).
En local pur, vous pouvez retirer ou adapter cette section.

## 3) Initialisation SQL

### 3.1 Base cache (obligatoire)

Executer:

- `Backend/sql/local_cache_tables.sql`

sur la base `DB_CACHE`.
Ce script cree:

- `lubrication_point_snapshot`
- `calender_snapshot`
- `sync_metadata`

### 3.2 Base source (optionnel recommande)

Executer:

- `Backend/sql/index_latest_lubrication.sql`

sur la base source (`DB_SOURCE`) pour ameliorer les performances de lecture.

## 4) Ordre de demarrage

### 4.1 Demarrer `remote-api`

```bash
cd remote-api
mvn spring-boot:run
```

Test rapide:

```bash
curl "http://localhost:8082/api/data"
```

### 4.2 Demarrer `Backend`

```bash
cd Backend
mvn spring-boot:run
```

Test rapide:

```bash
curl "http://localhost:8081/api/lubrication/latest/K3-STR-D02"
```

### 4.3 Demarrer `frontend`

```bash
cd frontend/App_Marsa
npm install
npm run dev
```

UI dispo sur `http://localhost:5173`.

## 5) Comportement de sync (important)

Le backend fait maintenant deux actions a chaque cycle:

- rafraichissement complet des snapshots (`fetchData(null)`) pour capter les changements `Admin.Amount` et `Admin.Interval`.
- sync incremental base sur `updatedAfter` pour l historique `calender_snapshot`.

Conclusion: aucun changement obligatoire dans `remote-api` pour ce correctif.

## 6) Verification fonctionnelle conseillee

### Cas A: changement planifie (sans nouvelle ligne Calender)

1. Mettre a jour `dbo.Admin.Amount` ou `dbo.Admin.Interval`.
2. Attendre un cycle (`SYNC_INTERVAL`).
3. Appeler `GET /api/lubrication/latest/{name}` sur le backend.
4. Verifier que `plannedAmount`/`interval` sont mis a jour.

### Cas B: changement reel

1. Inserer une ligne dans `dbo.Calender` avec `ActualAmount` et `TimeStamp` recent.
2. Verifier la mise a jour de `actualAmount` et `timestamp` via le backend.

## 7) Build production

Backend:

```bash
cd Backend
mvn -DskipTests clean package
```

Remote API:

```bash
cd remote-api
mvn -DskipTests clean package
```

Frontend:

```bash
cd frontend/App_Marsa
npm run build
```

## 8) Depannage rapide

- Pas de donnees backend:
  - verifier `REMOTE_API_BASE_URL` dans `Backend/.env`
  - verifier `http://localhost:8082/api/data`
  - verifier que les tables cache existent dans `DB_CACHE`
- Erreurs CORS:
  - verifier `allowedOrigins` dans `WebConfig.java`
- Frontend ne touche pas le backend:
  - verifier `proxy.target` dans `vite.config.ts`
- Changement `Amount`/`Interval` non visible:
  - verifier que le backend tourne bien avec la version contenant le nouveau `DataSyncService`
