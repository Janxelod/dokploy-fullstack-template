FROM node:22-alpine AS base
WORKDIR /app


FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

FROM builder as pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM builder as workspace
RUN yarn global add turbo
# Set working directory
COPY . .
RUN turbo prune --scope api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM pnpm AS installer
# WORKDIR /app
# First install dependencies (as they change less often)
COPY --from=workspace /app/out/json/ .
COPY --from=workspace /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
# Build the project and its dependencies
COPY --from=workspace /app/out/full/ .
RUN pnpm exec turbo build --filter=api

FROM base AS runner
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer /app .
# EXPOSE 3000
# ENV PORT=3000
CMD ["node", "apps/api/dist/src/main.js"]
