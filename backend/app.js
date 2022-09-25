import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

// Routes
import cryptoRouter from "./src/routes/cryptoRouter.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use("/crypto", cryptoRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
