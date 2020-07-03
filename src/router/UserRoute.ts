import express from "express";
import { UserController } from "../controller/UserController";
import { User } from "../model/User";
//linha responsável por criar um módulo de rotas no express


export const userRouter = express.Router();

userRouter.post(`/signup`, new UserController().signup)
userRouter.get(`/bands`, new UserController().getAllBands)
userRouter.put(`/approval`, new UserController().setApprovedBand)
userRouter.post(`/login`, new UserController().login)
userRouter.get(`/allmusicgenres`, new UserController().getAllGenres)
userRouter.post(`/addgenre`, new UserController().addMusicGenre)
userRouter.post(`/createalbum`, new UserController().createAlbum)
userRouter.post(`/createsong`, new UserController().createSong)