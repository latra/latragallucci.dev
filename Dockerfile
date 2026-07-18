# Builds and serves packages/create-questfolio/template — the live Questfolio
# site — as a standalone Node HTTP server. Build from the monorepo root:
#
#   docker build -t my-questfolio .
#   docker run -p 8080:3000 my-questfolio          # -> http://localhost:8080
#   docker run -p 8080:3000 -e PORT=3000 my-questfolio
#
# PORT (default 3000) is what the server binds to *inside* the container;
# map it to whatever host port you want with `-p <host>:<container>`.

# ---- deps: install once, shared by every workspace build below ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/core/package.json packages/core/package.json
COPY packages/create-questfolio/package.json packages/create-questfolio/package.json
COPY packages/create-questfolio/template/package.json packages/create-questfolio/template/package.json
RUN npm ci

# ---- build: compile the core library, then the template site against it ----
# npm workspaces hoist everything into the root node_modules (with the
# workspace packages themselves symlinked in, e.g. node_modules/questfolio ->
# packages/core), so copying that one directory is enough.
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build -w packages/core \
 && npm run build -w packages/create-questfolio/template

# ---- runtime: only the built static site + the zero-dependency server ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY --from=build /app/packages/create-questfolio/template/dist ./dist
COPY --from=build /app/packages/create-questfolio/template/server.mjs ./server.mjs

USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
