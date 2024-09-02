# Use a imagem oficial do Node.js como imagem base
FROM node:18 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência e instale-as
COPY package.json package-lock.json ./
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Crie a imagem final
FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app /app

# Instale o servidor de produção
RUN npm install -g next

# Exponha a porta usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o Next.js
CMD ["next", "start"]
