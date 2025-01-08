# Stage 1: Build the application
FROM --platform=linux/arm64/v8 node:23 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM --platform=linux/arm64/v8 node:23
WORKDIR /app
COPY --from=build /app/build /app
COPY --from=build /app/package*.json /app/
COPY --from=build /app/static /app/static
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "/app/index.js"]