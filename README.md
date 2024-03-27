# GNYB Website

Dies ist der Quellcode für die GNYB-Website welcher mit `create-t3-app` bootstrapped wurde.

## Features

Die Website hat neben dem Zweck die Benutzer zu informieren noch einige weitere Features.

- Aktuelle Serverliste
- Random League of Legends Champion Generator
- Random Apex Legends Legend Generator
- Online-Wichteln

## Die Website ausführen

### Production

Docker image herunterladen

```
docker pull ghcr.io/jannikac/gnyb-website:latest
```

Image mit der `docker-compose.yml` in dieser Repo starten.

### Development

Diese repo herunterladen

```bash
git clone https://github.com/jannikac/gnyb-website.git
```

Eine Postgres Datenbank aufsetzen. Dazu kann die Datei `docker-dev/docker-compose.yml` in dieser Repo verwendet werden.

```bash
docker compose up -d
```

Abhängigkeiten installieren

```bash
npm i
```

Das Datenbankschema auf die Datenbank übertragen

```bash
npx prisma db push
```

Entwicklungsserver starten

```bash
npm run dev
```
