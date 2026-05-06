# PadelPlay - Guide unique

Ce `README.md` centralise les instructions de lancement, compilation, tests, base de donnees, import frontend et depannage pour le projet.

## Sommaire

- [1. Prerequis](#1-prerequis)
- [2. Structure du projet](#2-structure-du-projet)
- [3. Configuration de la base de donnees](#3-configuration-de-la-base-de-donnees)
- [4. Installation rapide](#4-installation-rapide)
- [5. Lancer le projet](#5-lancer-le-projet)
- [6. Commandes de compilation](#6-commandes-de-compilation)
- [7. Commandes de test](#7-commandes-de-test)
- [8. Comptes et donnees de test](#8-comptes-et-donnees-de-test)
- [9. Imports utiles frontend](#9-imports-utiles-frontend)
- [10. URLs utiles](#10-urls-utiles)
- [11. Depannage rapide](#11-depannage-rapide)
- [12. Etat verifie localement](#12-etat-verifie-localement)

## 1. Prerequis

- Java 21+
- Maven Wrapper (`mvnw.cmd` fourni dans le projet)
- Node.js 18+ ou plus recent
- npm
- Docker Desktop (pour PostgreSQL)

## 2. Structure du projet

- Backend Spring Boot : `src/main/java`
- Ressources backend : `src/main/resources`
- Configuration backend : `src/main/resources/application.properties`
- Frontend Angular : `frontend/`
- Scripts frontend : `frontend/package.json`
- Docker PostgreSQL : `docker-compose.yml`

## 3. Configuration de la base de donnees

Le projet utilise PostgreSQL via Docker Compose.

- Host : `localhost`
- Port : `5440`
- Base : `padelService`
- Utilisateur : `padel`
- Mot de passe : `padel`

La configuration backend actuellement utilisee est dans `src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5440/padelService
spring.datasource.username=padel
spring.datasource.password=padel
spring.jpa.hibernate.ddl-auto=update
```

### Demarrer la base

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
docker compose up -d postgres
```

### Arreter la base

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
docker compose stop postgres
```

### Voir l'etat du conteneur

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
docker compose ps
```

### Verifier les tables

```powershell
docker exec padel-db psql -U padel -d padelService -c "\dt"
```

### Verifier le contenu de quelques tables

```powershell
docker exec padel-db psql -U padel -d padelService -c "select count(*) from membres;"
docker exec padel-db psql -U padel -d padelService -c "select count(*) from administrateurs;"
docker exec padel-db psql -U padel -d padelService -c "select count(*) from sites;"
docker exec padel-db psql -U padel -d padelService -c "select count(*) from terrains;"
```

## 4. Installation rapide

### Installer les dependances frontend

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm install
```

### Verifier Maven Wrapper

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd -v
```

## 5. Lancer le projet

## Backend

### Lancement standard

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd spring-boot:run
```

### Si le port 8080 est deja pris

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

## Frontend

### Lancement standard

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm start
```

### Lancement sur un autre port si `4200` est occupe

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm start -- --port 4201
```

### Script frontend force sur le port 4200

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run start:4200
```

## 6. Commandes de compilation

## Backend

### Compilation simple

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd compile
```

### Nettoyage + compilation

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd clean compile
```

### Packaging complet

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd clean package
```

### Packaging sans tests

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd clean package -DskipTests
```

## Frontend

### Build de production

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run build
```

### Build en mode watch

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run watch
```

## 7. Commandes de test

## Backend

### Tous les tests backend

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd test
```

### Variante silencieuse

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd -q test
```

### Executer une classe de test precise

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd -Dtest=MembreServiceTest test
```

### Executer une methode de test precise

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd -Dtest=MembreServiceTest#shouldCreateMember test
```

## Frontend

Les scripts disponibles dans `frontend/package.json` sont : `start`, `start:4200`, `build`, `watch`, `test`, `test:watch`.

### Tous les tests frontend

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run test
```

### Tests frontend en mode watch

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run test:watch
```

### Build frontend avant commit

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run build
```

### Sequence de verification conseillee avant livraison

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd test

cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm run build
npm run test
```

## 8. Comptes et donnees de test

### Membres

- `G1001`
- `G1002`
- `S10001`
- `S10002`
- `L10001`

### Administrateur

- Email : `admin@padel.com`
- Mot de passe : `Admin1234!`

### Donnees seedees verifiees dans la base

- `sites` : 2
- `terrains` : 5
- `membres` : 5
- `administrateurs` : 3
- `jours_fermeture` : 3

## 9. Imports utiles frontend

Le barrel export est dans `frontend/src/app/shared/components/index.ts`.

### Import propre de composants partages

```typescript
import {
  PageHeaderComponent,
  MatchCardComponent,
  StatusBadgeComponent,
  KpiCardComponent,
  FilterBarComponent,
} from './shared/components';
```

### Exemple d'import depuis un autre dossier Angular

```typescript
import { MatchCardComponent } from '@app/shared/components';
```

## 10. URLs utiles

### Application

- Frontend : `http://localhost:4200`
- Backend : `http://localhost:8080`

### Si ports alternatifs

- Frontend alternatif : `http://localhost:4201`
- Backend alternatif : `http://localhost:8081`

### Swagger / OpenAPI

Si le backend est lance, l'interface Swagger SpringDoc est en general accessible ici :

- `http://localhost:8080/swagger-ui/index.html`

## 11. Depannage rapide

### Port 4200 occupe

```powershell
Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
Stop-Process -Id <PID> -Force
```

### Port 8080 occupe

```powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
Stop-Process -Id <PID> -Force
```

### Reinstallation frontend propre

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
```

### Nettoyage Maven local du projet

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
.\mvnw.cmd clean
```

### Regenerer les tables a partir des entites

Le projet utilise actuellement :

```properties
spring.jpa.hibernate.ddl-auto=update
```

Il faut donc simplement demarrer la base puis relancer le backend.

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
docker compose up -d postgres
.\mvnw.cmd spring-boot:run
```

## 12. Etat verifie localement

Verification effectuee dans ce workspace :

- `npm run build` : OK
- `.\mvnw.cmd -q test` : OK
- `npm run test` : OK

Etat actuel : build frontend OK, tests frontend OK, tests backend OK.

## Checklist de demarrage rapide

1. Demarrer PostgreSQL
2. Lancer le backend
3. Lancer le frontend
4. Ouvrir l'application

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1"
docker compose up -d postgres
.\mvnw.cmd spring-boot:run
```

Dans un second terminal :

```powershell
cd "C:\Users\user\Desktop\projetPadel1\projetPadel1\frontend"
npm install
npm start
```

Ensuite ouvrir :

- `http://localhost:4200`

