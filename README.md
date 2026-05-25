# ENGWEB2026 - Exame Época Normal
**Data:** 25 de Maio de 2026
**Aluno:** Francisco Maia ([A108962])

---
## Exercício 1: API de Dados (Jogos de Tabuleiro)

A solução do Exercício 1 encontra-se na diretoria `/ex1` e consiste numa API REST desenvolvida em Node.js/Express, suportada por uma base de dados MongoDB.

### Persistência de Dados e Setup da Base de Dados
A persistência é garantida através de um contentor MongoDB. Para facilitar a avaliação, o povoamento inicial da base de dados foi automatizado:
* Foi configurado um serviço `mongo-seed` no `docker-compose.yml`.
* No arranque da infraestrutura, este serviço executa o comando `mongoimport` que carrega automaticamente os dados do ficheiro `jogos.json` para a base de dados `engweb2026`, na coleção `jogos`.
* Este processo assegura que a API tem dados disponíveis assim que o servidor arranca, não requerendo scripts manuais.

### Instruções de Execução
Para colocar o sistema do Exercício 1 em funcionamento:
1. Abrir o terminal na diretoria raiz do exercício: `cd ex1`
2. Construir e iniciar os contentores em background: `docker-compose up -d --build`
3. A API ficará disponível no endereço local configurado (consultar porta mapeada no `docker-compose.yml`, ex: `http://localhost:XXXX`).

### Respostas Textuais (Queries MongoDB)
Conforme solicitado no enunciado, abaixo encontram-se as queries correspondentes às perguntas do MongoDB (também disponíveis no ficheiro `queries.txt`):

1. **Quantos jogos existem na base de dados?**
   `db.jogos.countDocuments()`

2. **Quantos jogos têm a categoria "Card Game"?**
   `db.jogos.countDocuments({ categorias: "Card Game" })`

3. **Produz uma lista de todos os autores (nome), ordenada alfabeticamente.**
   `db.jogos.distinct("autores.name").sort()`

4. **Produz uma lista com os jogos recomendados para 4 jogadores (ou seja, 4 tem de estar entre os valores de minPlayers e maxPlayers).**
   `db.jogos.find({ minPlayers: { $lte: 4 }, maxPlayers: { $gte: 4 } })`

*(Após testar os serviços, pode encerrar com `docker-compose down`)*

---

## 📚 Exercício 2: Engenharia Reversa (Lista de Leituras)

A solução do Exercício 2 encontra-se na diretoria `/ex2` e contempla uma arquitetura full-stack (MEVN) para suportar uma interface de gestão de leituras (Vue.js).

### Persistência de Dados e Setup da Base de Dados
A aplicação utiliza uma base de dados MongoDB isolada numa rede virtual Docker (`engweb2026-network`). 
* **Segurança:** O MongoDB **não expõe** portas para a máquina host. O acesso é feito exclusivamente pela API de Dados através da rede interna do Docker, cumprindo o requisito de segurança do enunciado.
* O povoamento inicial faz-se através de um dataset exemplificativo `livros.json` (com pelo menos 6 registos) integrado no arranque.
* O modelo de dados (`lido` como boolean, `titulo`, `autor`, etc.) foi derivado com base na engenharia reversa feita ao código front-end (Vue+Axios).

### Instruções de Execução
Para colocar o sistema do Exercício 2 em funcionamento:
1. Abrir o terminal na diretoria raiz do exercício: `cd ex2`
2. Construir e iniciar os contentores: `docker-compose up -d --build`
3. A arquitetura ficará disponível nos seguintes acessos:
   * **Frontend (Nginx estático):** Acessível num browser em `http://localhost:19021` (O Nginx serve o ficheiro `index.html` em formato read-only por segurança).
   * **API de Dados (Node.js):** Acessível em `http://localhost:19020` (recebe pedidos da interface).
   * **Base de Dados (MongoDB):** Protegida na rede interna, sem acesso exterior.

*(Após testar os serviços, pode encerrar com `docker-compose down`)*
