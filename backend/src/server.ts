import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./routes/user";
import auth from "./routes/auth";
import cookieParser from "cookie-parser";
import application from "./routes/application";

dotenv.config();

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options = {
  socketTimeoutMS: 180000, // Increase socket timeout to 3 minutes (180000 ms)
  connectTimeoutMS: 180000, // Increase connection timeout to 3 minutes (180000 ms)
  serverSelectionTimeoutMS: 180000, // The timeout for server selection (3 minutes)
  maxPoolSize: 50, // Increase pool size to handle more concurrent connections if needed
};


(async () => {
try {
  await mongoose.connect(uri, options);
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database", error);
}
})();

app.use("/auth", auth);
app.use("/api", user);
app.use("/api/application", application);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

setInterval(() => {
  console.log("Server health check. Server is running on port:" + PORT);
}, 60000);

app.use((err: any, _req: Request, res: Response, next: Function) => {
  if (err.code && err.code === 11000) {
    console.error("Duplicate key error:", err.message);
    return res.status(400).json({ error: "Duplicate key error", message: err.message });
  }
  next(err);
});
