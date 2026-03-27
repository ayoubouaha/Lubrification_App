Graissage et Lubrification

Application full-stack pour afficher les points de graissage des grues, lire les donnees depuis SQL Server, et presenter l'etat des points dans une interface React avec schemas interactifs.

## Vue d'ensemble

Le projet est compose de 3 parties:

- `Backend/`: API Spring Boot qui lit les donnees dans la base SQL Server
- `frontend/App_Marsa/`: interface React + Vite
- Base de donnees SQL Server: source des points, des valeurs planifiees et des releves reels

Le flux principal est:

1. Le frontend connait un identifiant de point comme `K3-STR-D02`
2. Il appelle l'API `GET /api/lubrication/latest/{name}`
3. Le backend cherche ce point dans `dbo.Admin`
4. Le backend recupere la ligne la plus recente et utile dans `dbo.Calender`
5. L'API retourne `plannedAmount`, `actualAmount`, `interval`, `timestamp`
6. Le frontend affiche ces donnees dans le popup et colore les points critiques

## Structure du projet

```text
BU-Maintenance-
├─ Backend/
│  ├─ src/main/java/com/marsa/luberight/
│  │  ├─ config/
│  │  ├─ domain/
│  │  ├─ dto/
│  │  ├─ exception/
│  │  ├─ repository/
│  │  ├─ service/
│  │  └─ web/
│  └─ src/main/resources/application.properties
├─ frontend/
│  └─ App_Marsa/
│     ├─ src/components/
│     ├─ src/hooks/
│     ├─ src/services/
│     ├─ src/config/
│     └─ vite.config.ts
└─ README.md
```

## Backend

### Role

Le backend expose une API REST qui retourne l'etat courant d'un point de graissage a partir de son nom.

Exemple:

```http
GET /api/lubrication/latest/K3-STR-D02
```

### Organisation logique

- `domain/Admin.java`
  - represente la table `dbo.Admin`
- `repository/LubricationPointRepository.java`
  - contient la requete SQL native
- `service/LubricationPointService.java`
  - transforme le resultat SQL en DTO
- `web/LubricationPointController.java`
  - expose l'endpoint HTTP
- `dto/LubricationPointResponse.java`
  - format JSON retourne au frontend

### Endpoint principal

Le controleur principal est:

- `GET /api/lubrication/latest/{name}`

Il retourne un JSON comme:

```json
{
  "name": "K3-STR-D02",
  "interval": 5,
  "plannedAmount": 12000.0,
  "actualAmount": 256100.0,
  "timestamp": "2026-03-13T12:34:59.647"
}
```

### Logique pour lire les donnees

Le backend lit les donnees depuis 2 tables principales:

#### 1. `dbo.Admin`

Table des points de graissage.

Colonnes importantes:

- `Index`: identifiant du point
- `Name`: nom logique du point, par exemple `K3-STR-D02`
- `Interval`: intervalle planifie
- `Amount`: quantite planifiee
- `Active`: point actif ou non

Cette table fournit les donnees statiques du point.

#### 2. `dbo.Calender`

Table des releves et evenements dans le temps.

Colonnes importantes:

- `AdminIndex`: lien vers `dbo.Admin.Index`
- `ActualAmount`: quantite reelle relevee
- `ActualInterval`: intervalle reel
- `TimeStamp`: date/heure du releve
- `Index`: identifiant de la ligne
- `Loaded`: colonne obligatoire lors des insertions de test

Cette table fournit les donnees dynamiques.

### Comment le backend choisit "la derniere valeur"

La logique actuelle se trouve dans `LubricationPointRepository`.

Requete:

- on cherche d'abord le point dans `dbo.Admin` avec:
  - `adm.Active = 1`
  - `adm.Name = :name`
- ensuite `OUTER APPLY` cherche la meilleure ligne dans `dbo.Calender` pour ce `AdminIndex`

Ordre utilise pour choisir la ligne:

1. les lignes avec `ActualAmount` non null sont prioritaires
2. puis la plus grande valeur de `TimeStamp`
3. puis la plus grande valeur de `Index`

Cela permet d'eviter un cas observe dans la base:

- une ligne plus recente existe
- mais `ActualAmount` est `NULL`
- une ligne un peu plus ancienne contient la vraie mesure

Dans ce cas, l'application prefere afficher la derniere mesure reelle disponible plutot qu'une ligne vide.

### Mapping du resultat

Le JSON retourne par l'API suit cette logique:

- `name` <- `Admin.Name`
- `interval` <- `Calender.ActualInterval` si present, sinon `Admin.Interval`
- `plannedAmount` <- `Admin.Amount`
- `actualAmount` <- `Calender.ActualAmount`
- `timestamp` <- `Calender.TimeStamp`

### Cache HTTP

Le controleur force des headers anti-cache:

- `Cache-Control: no-store, must-revalidate`
- `Pragma: no-cache`
- `Expires: 0`

But:

- eviter qu'un navigateur ou proxy retourne une ancienne reponse
- garantir que chaque appel frontend lit bien l'etat actuel du backend

### Lancement du backend

Prerequis:

- Java 17+
- Maven
- fichier `Backend/.env` configure avec:
  - `DB_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`

Commande:

```bash
cd Backend
mvn spring-boot:run
```

Par defaut, le backend tourne sur:

```text
http://localhost:8081
```

## Frontend

### Role

Le frontend affiche:

- le dashboard des grues
- les schemas interactifs
- les marqueurs de points
- les popups avec les donnees du backend
- les points critiques

Technos principales:

- React
- TypeScript
- Vite

### Comment le frontend obtient les donnees du backend

Le point d'entree principal est:

- `frontend/App_Marsa/src/services/lubricationApi.ts`

Fonction principale:

- `fetchLubricationPoint(name)`

Elle appelle:

```text
/api/lubrication/latest/{name}?__ts=<timestamp>
```

avec:

- `cache: 'no-store'`
- un parametre `__ts` pour casser tout cache intermediaire

Dans l'environnement de dev, Vite proxifie `/api` vers le backend via:

- `frontend/App_Marsa/vite.config.ts`

Donc:

- frontend sur `http://localhost:5173`
- backend sur `http://localhost:8081`
- le navigateur appelle `/api/...`
- Vite redirige vers `http://localhost:8081/api/...`

### Polling

Le frontend ne charge pas une seule fois. Il reinterroge periodiquement l'API.

Hooks utilises:

- `useLubricationPoint`
  - pour le popup du point actif
  - poll toutes les 5 secondes
- `useLubricationPointBatch`
  - pour charger beaucoup de points a la fois
  - utilise pour les couleurs des marqueurs et le panel des points critiques

### Resolution du nom de point

Le frontend doit savoir quel nom envoyer au backend.

Cette logique est dans:

- `diagramPointUtils.ts`

Fonctions importantes:

- `getDbNameCandidates(point)`
  - construit une liste de noms candidats a partir de:
    - `dbName`
    - `tagPrimary`
    - `tagSecondary`
    - parfois `name`
- `pickLubricationData(map, candidates)`
  - prend le premier resultat trouve dans les donnees deja chargees

Exemple:

- un marqueur peut exposer `K3-STR-C21`
- le frontend envoie ce nom a l'API
- l'API retourne les donnees correspondantes

### Affichage dans le popup

Le popup affiche actuellement:

- identifiants
- frequence
- quantite planifiee
- quantite reelle
- pourcentage de graissage

La ligne "Derniere mise a jour" a ete retiree.

Les quantites sont converties dans le frontend avec une division par `1000`.

Exemple:

- `plannedAmount = 14000` devient `14`
- `actualAmount = 256100` devient `256.1`

Si `actualAmount` est `NULL`:

- `Quantite reelle` apparait vide
- `Pourcentage de graissage` affiche `N/A`

### Points critiques

Le panel "Points critiques" utilise les donnees batch chargees par le frontend.

Regle actuelle:

- un point est critique si `actualAmount` est absent
- ou si `actualAmount < plannedAmount * 0.5`

Correction appliquee:

- pour la grue TUKAN, le panel utilise maintenant les marqueurs TUKAN
- il n'affiche plus les points critiques de KRANBAU/ARDELT par erreur

### Lancement du frontend

Prerequis:

- Node.js 18+
- npm 9+

Commandes:

```bash
cd frontend/App_Marsa
npm install
npm run dev
```

Le frontend tourne en dev sur:

```text
http://localhost:5173
```

## Base de donnees

### Tables importantes

#### `dbo.Admin`

Contient la definition du point:

- nom du point
- quantite planifiee
- intervalle planifie
- statut actif

#### `dbo.Calender`

Contient les releves:

- quantite reelle
- intervalle reel
- horodatage
- lien vers le point

### Requetes utiles pour verifier les donnees

#### Voir la quantite planifiee d'un point

```sql
SELECT [Index], Name, Amount AS plannedAmount, [Interval], Active
FROM dbo.Admin
WHERE Name = 'K3-STR-D02';
```

#### Voir les dernieres lignes reelles d'un point

```sql
SELECT TOP (5)
  adm.Name,
  adm.Amount AS plannedAmount,
  cal.ActualAmount AS actualAmount,
  cal.ActualInterval AS actualInterval,
  cal.[TimeStamp],
  cal.[Index]
FROM dbo.Admin adm
JOIN dbo.Calender cal ON cal.AdminIndex = adm.[Index]
WHERE adm.Name = 'K3-STR-D02'
ORDER BY
  CASE WHEN cal.ActualAmount IS NULL THEN 1 ELSE 0 END,
  cal.[TimeStamp] DESC,
  cal.[Index] DESC;
```

La premiere ligne de cette requete correspond a la logique actuelle du backend.

### Mise a jour de la quantite planifiee

La quantite planifiee vient de `dbo.Admin.Amount`.

Exemple:

```sql
UPDATE dbo.Admin
SET Amount = 14000
WHERE Name = 'K3-STR-D02';
```

### Insertion d'une quantite reelle pour test

Exemple:

```sql
INSERT INTO dbo.Calender (AdminIndex, ActualAmount, ActualInterval, [TimeStamp], Loaded)
VALUES (45600, 85000, 5, SYSDATETIME(), 0);
```

Important:

- `Loaded` est obligatoire dans votre schema
- `TimeStamp` doit etre recent
- sinon l'application ne considerera pas cette ligne comme la meilleure ligne a afficher

## Build

Frontend:

```bash
cd frontend/App_Marsa
npm run build
```

Backend:

```bash
cd Backend
mvn -DskipTests clean package
```

## Resume logique complet

La logique metier principale est:

1. un marqueur frontend represente un point de graissage
2. le frontend determine le nom BD du point
3. le frontend appelle le backend sans cache
4. le backend lit `dbo.Admin`
5. le backend recupere la meilleure ligne correspondante dans `dbo.Calender`
6. le backend retourne les valeurs planifiees et reelles
7. le frontend transforme les valeurs pour affichage
8. le frontend met a jour le popup et les points critiques

En bref:

- `Admin` = definition et planification
- `Calender` = historique et mesures reelles
- backend = selection de la meilleure ligne
- frontend = polling + affichage
