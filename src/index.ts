import express, { Request, Response, urlencoded, NextFunction } from "express";
import { dbConnect } from "./services/databaseService";
import { APIError } from "./utilities/APIError";
import { NOT_FOUND } from "./utilities/errorConstants";
import { errorHandler } from "./middlewares/errorMiddleware";
import CookieParser from "cookie-parser";
import { PORT } from "./config";
import jobScheduler from "./services/CronJobService";

const app = express();

app.use(CookieParser());

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/", async (req, res) => {
  res.send('Health OK')  
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new APIError(404, NOT_FOUND));
});

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`server started on the port ${PORT}`);
  jobScheduler();
  dbConnect().then((x) => console.log(`Database connected successfully`));
});
