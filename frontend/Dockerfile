FROM node:23-alpine

# Install chromium and necessary dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    # Additional dependencies for Puppeteer
    libstdc++ \
    libgcc \
    libx11 \
    libxcb \
    libxext \
    libxrender \
    libxi \
    mesa-gl

# Set Chromium path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Ensure vite is available in PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# Run dev server with host configuration
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
