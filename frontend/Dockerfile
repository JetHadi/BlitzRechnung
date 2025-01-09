FROM node:23-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including Vite
RUN npm ci

# Copy source files
COPY . .

# Ensure vite is available in PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# Run dev server with host configuration
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
