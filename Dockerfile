# ---- BUILD STAGE ----
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- RUN STAGE ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV PORT=8080
EXPOSE 8080

# copy standalone build
COPY --from=builder /app/.next/standalone ./
# copy static files
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["node", "server.js"]
