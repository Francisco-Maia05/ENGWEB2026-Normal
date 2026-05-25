FROM node:20-alpine
WORKDIR /usr/src/app

# Copiar ficheiros de dependências
COPY package*.json ./
RUN npm install

# Copiar o resto do código
COPY . .

# Expor a porta exigida
EXPOSE 17000 

CMD ["node", "app.js"]