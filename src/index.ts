import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./router/UserRoute";
import { AddressInfo } from "net";

dotenv.config();
const app = express();
app.use(express.json());

async function main(){
    app.use("/users", userRouter);
}

main();

const server = app.listen(process.env.Port || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`)
    }
    else{
        console.log(`Deu ruim no servidor.`)
    }
})