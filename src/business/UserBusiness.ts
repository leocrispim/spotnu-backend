import { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { verify } from "jsonwebtoken";
import { Genre } from "../model/Genre";
import { Album } from "../model/Album";
import e from "express";

export class UserBusiness {
  public async signup(
    name: string,
    nickname: string,
    email: string,
    password: string,
    description: string,
    type: string
  ) {
    if (!name) {
      throw new Error("Missing name");
    }

    if (!nickname) {
      throw new Error("Missing nickname");
    }

    if (!email) {
      throw new Error("Missing email");
    }

    if (!password) {
      throw new Error("Missing password");
    }

    if (!type) {
      throw new Error("Missing type");
    }

    if (email.indexOf("@") === -1 && email.length < 6) {
      throw new Error("Invalid email");
    }

    if (password.length < 6) {
      throw new Error("Invalid password");
    }

    if (type === "Banda") {
      if (!description) {
        throw new Error("Criar um usuario tipo 'Banda' requer uma descricao")
      }
    }

    if (type === "Admin") {
      if (password.length <= 9) {
        throw new Error("Senha curta demais para um Admin.");
      }
    }

    if (type !== "Admin" && type !== "Banda" && type !== "Ouvinte" && type !== "Ouvinte Premium") {
      throw new Error("Tipo invalido de usuario.")
    }


    const idGenerator = new IdGenerator
    const id = idGenerator.generate()

    const hashGenerator = new HashGenerator
    const encryptedPassword = await hashGenerator.hash(password)

    let approved: boolean

    if (type !== "Banda") {
      approved = true;
    }
    else {
      approved = false;
    }

    const user = new User(id, name, nickname, email, encryptedPassword, description, type, approved)

    await new UserDatabase().createUser(user)

    const tokenGenerator = new TokenGenerator
    const token = tokenGenerator.generate({ id: id, type: type })

    return token;

  }

  public async login(input: string, password: string) {
    if (!input || !password) {
      throw new Error("Missing input.")
    }

    const userByEmail = await new UserDatabase().getUserByEmail(input);
    const userByNickname = await new UserDatabase().getUserByNickname(input);

    let loginType

    if (input.indexOf("@")) {
      if (!userByEmail) {
        throw new Error("Email inexistente.")
      }
      loginType = "email"
    }
    else {
      if (!userByNickname) {
        throw new Error("Nickname inexistente.")
      }
      loginType = "nickname"
    }

    if (loginType === "email") {
      const hashGenerator = new HashGenerator
      const passwordCheck = await hashGenerator.compareHash(password, userByEmail!.getPassword())

      if (!passwordCheck) {
        throw new Error("Password invalido")
      }
      else {
        if (!userByEmail) {
          throw new Error("User not found.")
        }
        const tokenGenerator = new TokenGenerator
        let id = userByEmail?.getId()
        let type = userByEmail?.getType()
        const accessToken = tokenGenerator.generate({ id, type })
        return accessToken
      }
    }

    if (loginType === "nickname") {
      const hashGenerator = new HashGenerator
      const passwordCheck = await hashGenerator.compareHash(password, userByNickname!.getPassword())

      if (!passwordCheck) {
        throw new Error("Password invalido")
      }
      else {
        if (!userByNickname) {
          throw new Error("User not found.")
        }
        const tokenGenerator = new TokenGenerator
        let id = userByNickname?.getId()
        let type = userByNickname?.getType()
        const accessToken = tokenGenerator.generate({ id, type })
        return accessToken
      }
    }
  }

  public async getAllBands() {
    const user = await new UserDatabase().getAllBands();

    if (user) {
      return user
    }
    else {
      throw new Error("Bandas nao encontradas.");
    }
  }

  public async setApprovedBand(id: string, token: string) {
    if (!token) {
      throw new Error("Token nao foi enviado")
    }
    else {
      const userID = new TokenGenerator().verify(token).id

      if (!userID) {
        throw new Error("Usuario inexistente.")
      }
      else {
        const userAdmin = await new UserDatabase().getUserById(userID)

        if (userAdmin.getType() !== "Admin") {
          throw new Error("Voce nao tem permissao para executar essa funcao.")
        }
        else {
          const user = await new UserDatabase().getUserById(id);

          if (user) {
            if (!user.getApproved()) {
              await new UserDatabase().setApprovedBand(id);
              return ("Banda aprovada com sucesso.")
            }
            else {
              throw new Error("Essa banda ja foi aprovada.")
            }
          }
          else {
            throw new Error("Banda nao encontrada.");
          }
        }
      }
    }
  }

  public async getAllGenres(token: string) {
    const userID = new TokenGenerator().verify(token).id

    if (!userID) {
      throw new Error("Token nao encontrado.")
    }

    const userCheck = await new UserDatabase().getUserById(userID)

    if (userCheck.getType() !== "Admin" && userCheck.getType() !== "Banda") {
      throw new Error("Voce nao tem permissao para fazer isso.")
    }

    const genre = await new UserDatabase().getAllGenres();

    if (genre) {
      return genre
    }
    else {
      throw new Error("Generos nao encontrados.");
    }
  }

  public async addMusicGenre(genreName: string, token: string) {
    const userID = new TokenGenerator().verify(token).id

    if (!userID) {
      throw new Error("Token nao encontrado.")
    }

    const admin = await new UserDatabase().getUserById(userID)

    if (admin.getType() !== "Admin") {
      throw new Error("Voce nao tem permissao para fazer isso.")
    }

    const genreCheck = await new UserDatabase().getGenreByName(genreName)

    if (!genreCheck) {
      const genre = new Genre(new IdGenerator().generate(), genreName)

      new UserDatabase().addMusicGenre(genre)
    }
    else {
      throw new Error("Esse genero de musica ja existe.")
    }
  }

  public async createAlbum(token: string, albumName: string, genreList: []) {
    const bandID = await new TokenGenerator().verify(token).id
    const user = await new UserDatabase().getUserById(bandID)

    if (user.getType() !== "Banda") {
      throw new Error("Voce nao tem permissao para executar essa acao.")
    }

    if (!albumName) {
      throw new Error("Album name is missing.")
    }

    if (genreList.length <= 0) {
      throw new Error("Genres list is missing.")
    }

    const genreListCheck = await new UserDatabase().getAllGenres()

    let count = 0;
    for (let i = 0; i < genreListCheck.length; i++) {

      for (let j = 0; j < genreList.length; j++) {
        if (genreList[j] === genreListCheck[i].name) {
          count++;
        }
      }

    }
    if (count !== genreList.length) {
      throw new Error("Lista de genero invalida.")
    }

    const album = new Album(await new IdGenerator().generate(), albumName, bandID)

    await new UserDatabase().createAlbum(album, genreList)

  }

  public async createSong(token: string, name: string, songLink: string, albumID: string) {
    const bandID = await new TokenGenerator().verify(token).id
    const user = await new UserDatabase().getUserById(bandID)

    if (user.getType() !== "Banda") {
      throw new Error("Voce nao tem permissao para executar essa acao.")
    }

    if (!name || !albumID || !songLink) {
      throw new Error("Missing input.")
    }

    const albumCheck = await new UserDatabase().getAlbumByID(albumID)

    if (!albumCheck) {
      throw new Error("Esse album nao existe.")
    }

    const songCheck = await new UserDatabase().getSongsByAlbumID(albumID)

    if (songCheck !== undefined) {
      for (let i = 0; i < songCheck.length; i++) {
        if (songCheck[i].album_id === albumID) {
          throw new Error("Musica ja existente nesse album.")
        }
      }
    }

    const songID = await new IdGenerator().generate()

    await new UserDatabase().createSong(songID, name, songLink, albumID)

  }

}