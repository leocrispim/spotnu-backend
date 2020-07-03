// import { Request, Response } from "express";
// import { UserBusiness } from "../business/UserBusiness";
// import { TokenGenerator } from "../services/tokenGenerator";
// import { UserDatabase } from "../data/UserDatabase";
// import { HashGenerator } from "../services/hashGenerator";
// import { IdGenerator } from "../services/idGenerator";
// import { User } from "../model/User";

// export class UserController{

//     async signup(req: Request, res: Response){
//         try{
//            const name = req.body.name
//            const nickname = req.body.nickname
//            const email = req.body.email
//            const password = req.body.password
//            const type = req.body.type
//            const token = await new UserBusiness().signup(name, nickname, email, password, type)
//            res.status(200).send({token: token})
//         }
//         catch(error){
//             res.status(400).send({error_message: error})
//         }
//     }
//}