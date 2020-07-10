Status do Projeto: Concluido :heavy_check_mark:

## Leonardo Crispim

**Canais de comunicação**:
- [Linkedin](https://www.linkedin.com/in/leonardo-crispim-371a23134/)
- [Github](https://github.com/leocrispim)
- <leonardo.crispim@outlook.com.br>
## Labenu | Full-Stack Web Development Bootcamp
Desenvolvimento de aplicações completas, incluindo frontend Web com React e backend com Node.js.
[![Screenshot_1](https://github.com/leocrispim/stuff/blob/master/Lbn.png)](https://www.labenu.com.br/)
# Spotnu-backend
<br>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/leocrispim/spotnu-backend">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leocrispim/spotnu-backend">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/leocrispim/spotnu-backend">
  <a href="https://github.com/leocrispim/spotnu-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/leocrispim/spotnu-backend">
  </a>
</p>

<br>

#### Escopo do Projeto
<p align="center">
O Spotnu é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas). Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores.
</p>

  <br>

1. **Signup de usuario ouvinte:**
  - Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha. Faça as validações básicas e garanta que a senha tenha, no mínimo, 6 caracteres. Em todos os cadastros e logins, vamos usar somente o access token.
  
  <br>

2. **Cadastro de administrador:**
  - Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, esse endpoint deve ser autenticado e verificar se o token é de um administrador)
  
    <br>
    
3. **Signup de bandas:**
  - A banda precisa informar o seu nome, o nickname, o email, a sua descrição e uma senha, com, no mínimo 6 caracteres. Uma banda deve começar com o status de não aprovada (ou seja, não retorne um access token nesse endpoint)
  
    <br>
    
4. **Ver todas as bandas:**
  - Esse endpoint deve retornar uma lista com todas as bandas registradas no banco, com as informações: nome, email,  nickname e um booleano indicando se está aprovado ou não. Somente administradores podem ter acesso a essa funcionalidade.
  
    <br>
    
5. **Aprovação de bandas:**
  - Um administrador pode aprovar uma banda, para que ela, então, consiga se logar. Caso um administrador tente aprovar uma banda que já tinha sido aprovada, um erro deve ser retornado (e, obviamente, se a banda não existir também).
  
    <br>
    
6. **Login:**
  - Todos os usuários (ouvintes, administradores ou bandas) devem se logar pelo mesmo endpoint. Eles podem fornecer o email ou o nickname e a senha correta.
  
    <br>
    
7. **Adicionar Gênero:**
  - Somente um administrador pode adicionar gêneros na nossa aplicação. Para isso, deve fornecer um nome. Caso já exista um gênero com esse nome, um erro deve ser retornado.
  
    <br>
    
8. **Ver gêneros músicais:**
  - Tanto um administrador como um usuário banda podem ver todos os gêneros músicas. Retorne uma lista com id e nome.
  
    <br>

9. **Criação de álbuns:**
  - Uma banda pode criar um álbum para colocar as suas músicas. Deve fornecer o nome e uma lista de gêneros. Quando o álbum for criado, ele deve ser diretamente atrelado à banda que estiver autenticada na aplicação. Só bandas podem criar álbuns.
  
    <br>
    
10. **Criação de músicas:**
  - Para criar uma música, um nome e um álbum devem ser informados. Caso o álbum não exista, um erro deve ser informado. Se já existir uma música com esse nome no álbum, outro erro deve ser retornado. 
  
    <br>
    
### LINGUAGENS
* Typescript
* JavaScript
### TECNOLOGIAS/FERRAMENTAS
* Git
* Vanilla Javascript
* Node.js
* MySQL
* Postman
### O que a plataforma é capaz de fazer :checkered_flag:
:trophy: Simular os endpoints de um website de armazenamento e gerenciamento de listas de músicas. <br>
### Libs utilizadas :books:
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): versão 8.5.1
- [Knex](http://knexjs.org/): versão 0.21.1
- [Express](https://www.npmjs.com/package/express): versão 4.17.6
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs): versão 2.4.2
- [Dotenv](https://www.npmjs.com/package/dotenv): versão 8.2.0
- [Uuid](https://www.npmjs.com/package/uuid): versão 8.0.0
### Como rodar a aplicação :arrow_forward:
No terminal, clone o projeto: 
```
git clone https://github.com/leocrispim/spotnu-backend.git
```
Navegue para dentro da raiz do projeto
```
cd spotnu-backend
```
Instale as dependências

<p>
  Crie um arquivo <b>.env</b> com as configurações do seu banco de dados (preferencialmente MySQL, caso deseje utilizar outro, adaptações no código e dependências serão necessárias)
</p>

```
DB_HOST = endereço_host
DB_USER = usuário
DB_PASSWORD = senha
DB_DATABASE_NAME = banco_de_dados
JWT_KEY = chave_para_jwt
JWT_EXPIRE_TIME = tempo_expiração (exemplo: 15 minutes)
BCRYPT_COST = cost_encriptação (em caráter de desenvolvimento: no minimo 12)
```
Execute a aplicação
```
npm start
```

Você poderá utilizar os endpoints através de um cliente HTTP (ex. [Postman](https://www.postman.com/users/api-client/)) tendo o endereço [localhost:3003](http:localhost:3003) como URL base para as requisições. <br>
<br>
Para informações de cada endpoint disponível conferir a [documentação](https://documenter.getpostman.com/view/10584507/T17M5jaw?version=latest#intro)

### ADICIONAL
#### Queries realizadas paras as criações de tabelas utilizando o MySQL Workbench

**Tabela Usuário**

```SQL
CREATE TABLE USER 
  ( 
     id          VARCHAR(255) PRIMARY KEY, 
     NAME        VARCHAR(255) NOT NULL, 
     nickname    VARCHAR(255) NOT NULL, 
     email       VARCHAR(255) UNIQUE NOT NULL, 
     password    VARCHAR(255) NOT NULL, 
     description VARCHAR(255), 
     type        VARCHAR(255) NOT NULL, 
     approved    BOOLEAN 
  ); 
```

**Tabela Album**

```SQL
CREATE TABLE album 
  ( 
     id      VARCHAR(255) PRIMARY KEY, 
     NAME    VARCHAR(255) NULL, 
     band_id VARCHAR(255) NOT NULL, 
     FOREIGN KEY (band_id) REFERENCES USER (id) 
  ); 
```

**Tabela Genero**

```SQL
CREATE TABLE genre 
  ( 
     id   VARCHAR(255) PRIMARY KEY, 
     NAME VARCHAR(255) NULL 
  ); 
```

```SQL
CREATE TABLE album_genre 
  ( 
     id       VARCHAR(255), 
     album_id VARCHAR(255) NOT NULL, 
     genre_id VARCHAR(255) NOT NULL, 
     FOREIGN KEY (album_id) REFERENCES album (id), 
     FOREIGN KEY (genre_id) REFERENCES genre (id) 
  ); 
```

**Tabela Musica**

```SQL
CREATE TABLE song 
  ( 
     id       VARCHAR(255) PRIMARY KEY, 
     NAME     VARCHAR(255) NOT NULL, 
     link     VARCHAR(255) NOT NULL, 
     album_id VARCHAR(255) NOT NULL, 
     FOREIGN KEY (album_id) REFERENCES album (id) 
  ); 
```
Instale as dependências do projeto
```
npm i
```

Execute a aplicação

```
npm start
```

<br>

**Projeto inicialmente desenvolvido em 18/06/2020**
