import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import mainRouter from "../routes";

const server = express();

server.use(helmet());
server.use(cors({ origin: "http://localhost:5173", credentials: true }));
server.use(express.json());
server.use(cookieParser());

server.use("/api", mainRouter);
server.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Undefined path", path: req.url });
})

const initServer = (port: string | number) => {
    server.listen(port, () => console.log(`Server listening at --> http://localhost:${port}`))
}

export default initServer;