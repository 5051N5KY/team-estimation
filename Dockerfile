FROM --platform=$BUILDPLATFORM docker.io/library/node:lts-slim AS node_builder
WORKDIR /angular
COPY angular/ /angular
RUN npm config set update-notifier false && \
  npm config set fund false && \
  npm config set audit false && \
  npm ci
RUN npm run build team-estimation

FROM docker.io/library/python:3.11.7-alpine3.18
RUN adduser -H -D -u 1001 -G root default
WORKDIR /app
COPY --chown=1001:0 flask/ ./
COPY --chown=1001:0 --from=node_builder /angular/dist/team-estimation ./static
RUN pip install --upgrade pip && \
  pip install --requirement requirements.txt && \
  mkdir /data && \
  chown -R 1001:0 /app /data && \
  chmod -R g+w /app /data
USER 1001
CMD [ "gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "--bind", "0.0.0.0:8000" ]
