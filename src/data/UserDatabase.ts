import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";
import { Genre } from "../model/Genre";
import { Band } from "../model/Band";
import { Album } from "../model/Album";
import { IdGenerator } from "../services/idGenerator";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "User";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.nickname,
        dbModel.email,
        dbModel.password,
        dbModel.description,
        dbModel.type,
        dbModel.approved
      )
    );
  }

  public async createUser(user: User): Promise<void> {
    console.log(user)
    await super.getConnection().raw(`
        INSERT INTO ${this.tableName} (id, name, nickname, email, password, description, type, approved)
        VALUES (
          '${user.getId()}', 
          '${user.getName()}', 
          '${user.getNickname()}', 
          '${user.getEmail()}',
          '${user.getPassword()}', 
          '${user.getDescription()}', 
          '${user.getType()}', 
          ${user.getApproved() ? 1 : 0}
        )`);
  }

  public async getUserById(id: string): Promise<User> {
    const result = await super.getConnection()
      .select("*")
      .from(this.tableName)
      .where({ id })

    const user = new User(
      result[0].id,
      result[0].name,
      result[0].nickname,
      result[0].email,
      result[0].password,
      result[0].description,
      result[0].type,
      result[0].approved
    )

    return user
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE email = '${email}'
      `);
    return this.toModel(result[0][0]);
  }

  public async getUserByNickname(nickname: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE email = '${nickname}'
      `);
    return this.toModel(result[0][0]);
  }

  public async getAllBands(): Promise<User | any> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE type = 'Banda'
      `);

      let users = []
      for(let i = 0; i < result[0].length; i++){
        users.push(
          {
            name: result[0][i].name,
            email: result[0][i].email,
            nickname: result[0][i].nickname,
            approved: result[0][i].approved
          }
        )
      }

    return users;
  }

  public async setApprovedBand(id: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
    UPDATE ${this.tableName} SET approved = 1
    WHERE id = '${id}'
      `);
    return this.toModel(result[0][0]);
  }

  public async getAllGenres(): Promise<any | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from Genre
      `);

      let genres = []
      for(let i = 0; i < result[0].length; i++){
        genres.push(
          {
            name: result[0][i].name
          }
        )
      }

    return genres;
  }

  public async getGenreByName(name: string): Promise<any> {
    const result = await super.getConnection().raw(`
      SELECT * from Genre WHERE name = '${name}'
      `);
    return result[0][0];
  }

  public async addMusicGenre(genre: Genre): Promise<void> {
    await super.getConnection()
      .insert(genre)
      .into("Genre")
  }

  public async createAlbum(album: Album, genres: string[]): Promise<void>{
    await super.getConnection()
    .insert(album.getData())
    .into("Album");


    const albumGenreID = new IdGenerator().generate()
    let genreID: string[]
    genreID = []

    for(let i = 0; i < genres.length; i++){
     const id = await super.getConnection().raw(`
      SELECT id FROM Genre WHERE name = "${genres[i]}"
    `)
      genreID.push(id[0][0].id)
    }

    for(let i = 0; i < genres.length; i++){
      await super.getConnection().raw(`
      INSERT INTO Album_Genre (id, album_id, genre_id)
      VALUES (
        '${albumGenreID}',
        '${album.getId()}',
        '${genreID[i]}'
      )
      `)
    }
  }

  public async getAlbumByID(id: string): Promise<any>{
    const album = await super.getConnection().raw(`
    SELECT * FROM Album WHERE id = "${id}"
    `)

    return album[0]
  }

  public async getSongsByAlbumID(id: string): Promise<any>{
    const songs = await super.getConnection().raw(`
    SELECT * FROM Song WHERE album_id = "${id}"
    `)

    return songs[0]
  }

  public async createSong(songID: string, name: string, link: string, albumID: string): Promise<void>{
    await super.getConnection().raw(`
      INSERT INTO Song   (id, name, link, album_id)
      VALUES (
        '${songID}',
        '${name}',
        '${link}',
        '${albumID}'
      )
      `)
  }






  public async getAllUsers(): Promise<User[]> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName}
    `);
    return result[0].map((res: any) => {
      return this.toModel(res);
    });
  }
}
