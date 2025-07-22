# Stufe 1: Build mit Node.js
FROM node:20-alpine AS build

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# Projektdateien kopieren
COPY . .

# Vite-Build ausführen
RUN npm run build

# Stufe 2: Produktionsserver mit Nginx
FROM nginx:stable-alpine AS production

# Build-Ergebnis aus vorheriger Stufe kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Standard-Nginx-Konfiguration überschreiben (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port freigeben (optional, Standard ist 80)
EXPOSE 80

# Startbefehl
CMD ["nginx", "-g", "daemon off;"]
