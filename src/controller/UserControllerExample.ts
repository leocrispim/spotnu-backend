// import { Request, Response } from "express";
// import { UserBusiness } from "../business/UserBusinessExample";
// import { TokenGenerator } from "../services/tokenGenerator";
// import { UserDatabase } from "../data/UserDatabase";
// import { HashGenerator } from "../services/hashGenerator";
// import { IdGenerator } from "../services/idGenerator";
// export class UserController {
//   private static UserBusiness = new UserBusiness(
//     new UserDatabase(),
//     new HashGenerator(),
//     new TokenGenerator(),
//     new IdGenerator()
//   );

//   async signup(req: Request, res: Response) {
//     try {
//       const result = await UserController.UserBusiness.signup(
//         req.body.name,
//         req.body.email,
//         req.body.password,
//         req.body.role
//       );
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(err.errorCode || 400).send({ message: err.message });
//     }
//   }

//   public async login(req: Request, res: Response) {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//       const result = await UserController.UserBusiness.login(email, password);
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(err.errorCode || 400).send({ message: err.message });
//     }
//   }

//   public async getUserById(req: Request, res: Response) {
//     const id = req.params.id
//     try {
//       const result = await UserController.UserBusiness.getUserById(id);
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(err.errorCode || 400).send({ message: err.message });
//     }
//   }

//   public async getAllUsers(req: Request, res: Response) {
//     const token = req.headers.token as string

//     try {
//       const result = await UserController.UserBusiness.getAllUsers(token);
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(err.errorCode || 400).send({ message: err.message });
//     }
//   }

// }
