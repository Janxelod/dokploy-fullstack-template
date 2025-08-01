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
RUN turbo prune --scope web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM pnpm AS installer
# First install the dependencies (as they change less often)
COPY --from=workspace /app/out/json/ .
COPY --from=workspace /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
# Build the project
COPY --from=workspace /app/out/full/ .
RUN pnpm exec turbo build --filter=web

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD [ "node", "apps/web/server.js" ]
