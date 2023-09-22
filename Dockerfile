FROM oven/bun AS deps
WORKDIR /var/wwww/html/app

COPY package.json package-lock.json bun.lockb ./
RUN bun install

FROM oven/bun AS builder
WORKDIR /var/wwww/html/app
COPY --from=deps /var/wwww/html/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

FROM oven/bun AS runtime
WORKDIR /var/wwww/html/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=www-data:www-data /var/wwww/html/app/public ./public
COPY --from=builder --chown=www-data:www-data /var/wwww/html/app/.next ./.next
COPY --from=builder /var/wwww/html/app/node_modules ./node_modules
COPY --from=builder /var/wwww/html/app/package.json ./package.json

USER www-data

EXPOSE 3000

ENV PORT 3000

CMD ["bun", "start"]