import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { User } from "../model/User";

export class UserController {

  async signup(req: Request, res: Response) {
    try {
      const name = req.body.name
      const nickname = req.body.nickname
      const email = req.body.email
      const password = req.body.password
      const type = req.body.type
      let token

      if (type === "Banda") {
        const description = req.body.description
        token = await new UserBusiness().signup(name, nickname, email, password, description, type)
      }
      else {
        token = await new UserBusiness().signup(name, nickname, email, password, "", type)
      }

      res.status(200).send({ token: token })
    }
    catch (error) {
      res.status(400).send({ error_message: error.message })
    }
  }

  public async login(req: Request, res: Response){
    const email = req.body.email
    const nickname = req.body.nickname
    const password = req.body.password
    try{
      let result

      if(email){
        result = await new UserBusiness().login(email, password)
      }
      if(nickname){
        result = await new UserBusiness().login(nickname, password)
      }
      res.status(200).send({token: result})
    }
    catch(error){
      res.status(400).send({ error_message: error.message })
    }
  }

  public async getAllBands(req: Request, res: Response) {
    try {
      const result = await new UserBusiness().getAllBands();
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async setApprovedBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const result = await new UserBusiness().setApprovedBand(req.body.id, token);
      res.status(200).send({message: result});
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async addMusicGenre(req: Request, res: Response){
    try{
      await new UserBusiness().addMusicGenre(req.body.name, req.headers.authorization as string);
      res.status(200).send({message: "Genero adicionado com sucesso."})
    }
    catch(err){
      res.status(err.errorCode || 400).send({ message: err.message })
    }
  }

  public async getAllGenres(req: Request, res: Response) {
    try {
      const result = await new UserBusiness().getAllGenres(req.headers.authorization as string);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async createAlbum(req: Request, res: Response){
    try{
      const result = await new UserBusiness().createAlbum(
        req.headers.authorization as string,
        req.body.albumName,
        req.body.genreList
        );
        res.status(200).send({body: "Album criado com sucesso."});
    } catch(err){
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async createSong(req: Request, res: Response){
    try{
      const result = await new UserBusiness().createSong(
        req.headers.authorization as string,
        req.body.name,
        req.body.songLink,
        req.body.albumID
      )
      res.status(200).send({body: "Musica criada com sucesso."});
    }catch (err){
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

}