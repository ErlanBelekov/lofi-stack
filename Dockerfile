FROM node:21-bookworm-slim AS base
RUN npm install -g pnpm@8.7.1
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json vite.config.ts ./
COPY /public ./public
COPY ./app ./app

FROM base AS production-deps
WORKDIR /app
ENV NODE_ENV production
RUN pnpm install --prod

FROM base AS builder
WORKDIR /app
RUN pnpm install
ENV NODE_ENV production
RUN pnpm build

# Runner
FROM base AS runner
RUN npm install -g pnpm@8.7.1
ENV NODE_ENV production

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/build/client ./public
COPY --from=builder /app/build/client .

WORKDIR /app
CMD ["pnpm", "dlx", "@remix-run/serve@2.8.1", "./build/server/index.js"]
