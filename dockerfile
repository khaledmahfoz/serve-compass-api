FROM node:22-alpine3.21 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
RUN apk add --no-cache curl && \
  adduser --disabled-password --gecos '' --no-create-home appuser && \
  mkdir -p /app/logs && chown -R appuser:appuser /app/logs
COPY --from=deps --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --from=builder --chown=appuser:appuser /app/src/lib/templates ./templates
COPY --from=builder --chown=appuser:appuser /app/documentation* ./documentation
COPY --chown=appuser:appuser package.json ./
USER appuser
EXPOSE 3000
CMD ["node", "dist/main.js"]

