# Team Estimation

A small, self-hosted application for collaborative agile estimation.

It supports Fibonacci, modified Fibonacci, T-shirt sizes, powers of two and
trust-vote decks, spectator mode, responsive layouts, vote summaries and
multiple interface languages.

This project is a customized fork of an archived MIT-licensed application by
Axel Leroy. The original copyright and license are preserved in `LICENSE`.

## Run with Docker

```bash
docker run \
  -v team-estimation-data:/data \
  -p 8000:8000 \
  ghcr.io/5051n5ky/team-estimation:latest
```

## Docker Compose

```yaml
services:
  team-estimation:
    image: ghcr.io/5051n5ky/team-estimation:latest
    ports:
      - "8000:8000"
    volumes:
      - team-estimation-data:/data
    restart: always

volumes:
  team-estimation-data:
```

The SQLite database is stored in `/data`. Reusing the existing data volume
preserves rooms and application state when replacing the container image.

### Environment variables

| Variable | Meaning | Example |
| --- | --- | --- |
| `APP_ROOT` | Optional URL subpath used to serve the application. | `/estimation/` |
| `APP_TITLE` | Optional browser title for the initial server response. | `Team Estimation` |

## Development

### Backend

```bash
cd flask
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python -m unittest
```

### Frontend

```bash
cd angular
npm ci
npm test -- --watch=false --browsers=ChromeHeadless
npm run build -- team-estimation
```

### Container image

```bash
docker build . -t team-estimation:local
```
