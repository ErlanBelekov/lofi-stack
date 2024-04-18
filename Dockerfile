FROM node:21-bookworm-slim AS base
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY ./app ./app

FROM base AS dev-deps
WORKDIR /app
RUN pnpm install

FROM base AS production-deps
WORKDIR /app
ENV NODE_ENV production
RUN pnpm install --prod

FROM base AS builder
WORKDIR /app
RUN corepack enable
ENV NODE_ENV production
COPY --from=dev-deps /app/node_modules .
RUN pnpm build

# Runner
FROM base AS runner
ARG APP_DIRNAME

ENV NODE_ENV production

COPY --from=pruner /app/out/full/ .
COPY --from=production-deps /app .
COPY --from=builder /app/apps/$APP_DIRNAME/server.js ./apps/$APP_DIRNAME/index.js
COPY --from=builder /app/apps/$APP_DIRNAME/build ./apps/$APP_DIRNAME/build
COPY --from=builder /app/apps/$APP_DIRNAME/public ./apps/$APP_DIRNAME/public

WORKDIR /app/apps/easystats
CMD ["node", "--security-revert=CVE-2023-46809", "server.js"]
