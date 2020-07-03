// import { UserDatabase } from "../data/UserDatabase";
// import { User, stringToUserRole, UserRole } from "../model/User";
// import { IdGenerator } from "../services/idGenerator";
// import { HashGenerator } from "../services/hashGenerator";
// import { TokenGenerator } from "../services/tokenGenerator";
// import { NotFoundError } from "../errors/NotFoundError";
// import { InvalidParameterError } from "../errors/InvalidParameterError";
// import { UnauthorizedError } from "../errors/UnauthorizedError";

// export class UserBusiness {
//   constructor(
//     private userDatabase: UserDatabase,
//     private hashGenerator: HashGenerator,
//     private tokenGenerator: TokenGenerator,
//     private idGenerator: IdGenerator
//   ) {}

//   public async signup(
//     name: string,
//     email: string,
//     password: string,
//     role: string
//   ) {
//     if (!name || !email || !password || !role) {
//       throw new InvalidParameterError("Missing input");
//     }

//     if (email.indexOf("@") === -1) {
//       throw new InvalidParameterError("Invalid email");
//     }

//     if (password.length < 6) {
//       throw new InvalidParameterError("Invalid password");
//     }

//     const id = this.idGenerator.generate();
//     const cryptedPassword = await this.hashGenerator.hash(password);

//     await this.userDatabase.createUser(
//       new User(id, name, email, cryptedPassword, stringToUserRole(role))
//     );

//     const accessToken = this.tokenGenerator.generate({
//       id,
//       role,
//     });
//     return { accessToken };
//   }

//   public async login(email: string, password: string) {
//     if (!email || !password) {
//       throw new InvalidParameterError("Missing input");
//     }

//     const user = await this.userDatabase.getUserByEmail(email);

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     const isPasswordCorrect = await this.hashGenerator.compareHash(
//       password,
//       user.getPassword()
//     );

//     if (!isPasswordCorrect) {
//       throw new InvalidParameterError("Invalid password");
//     }

//     const accessToken = this.tokenGenerator.generate({
//       id: user.getId(),
//       role: user.getRole(),
//     });

//     return { accessToken };
//   }

//   public async getUserById(id: string) {
//     if (!id) {
//       throw new InvalidParameterError("Missing id");
//     }

//     const user = await this.userDatabase.getUserById(id);

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     return { 
//       id: user.getId(),
//       name: user.getName(),
//       email: user.getEmail(),
//       role: user.getRole()
//     };
//   }

//   public async getAllUsers(token: string) {
//     if (!token) {
//       throw new InvalidParameterError("Missing Token");
//     }

//     const userToken = this.tokenGenerator.verify(token)

//     if(userToken.role !== UserRole.ADMIN){
//       throw new UnauthorizedError("User not an ADMIN.")
//     }

//     const user = await this.userDatabase.getAllUsers();

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     const result = await this.userDatabase.getAllUsers()

//     return result.map(el => {
//       return { 
//         id: el.getId(),
//         name: el.getName(),
//         email: el.getEmail(),
//         role: el.getRole()
//        }
//     });
//   }

// }
