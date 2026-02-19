# Prodaric Framework — imagen para Podman/Docker (equivalente al flujo Pack)
# Build: podman build -t prodaric-framework .
# Run:   podman run -p 3000:3000 prodaric-framework

FROM node:20-bookworm-slim

WORKDIR /app

# Dependencias del sistema para módulos nativos (node-pty, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar solo archivos de dependencias para aprovechar caché
COPY package.json package-lock.json ./

# Monorepo: instalar dependencias de todos los workspaces
RUN npm ci

# Copiar el resto del código
COPY . .

# Build completo (workspaces + Theia en modo producción)
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

# La plataforma debe exponer PORT; por defecto 3000
CMD ["sh", "-c", "npm start"]
