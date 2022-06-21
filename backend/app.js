import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Routes
import cryptoRouter from "./src/routes/cryptoRouter.js";

const app = express();

app.use(cors());
app.use("/crypto", cryptoRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
