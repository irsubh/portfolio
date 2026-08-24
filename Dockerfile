FROM node:20-alpine

WORKDIR /app

# Install dependencies for alpine
RUN apk add --no-cache libc6-compat

# Install package dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application source
COPY . .

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]
