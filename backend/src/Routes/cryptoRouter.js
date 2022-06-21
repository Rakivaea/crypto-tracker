import fetch from "node-fetch";
import dotenv from "dotenv";

import { Router } from "express";

dotenv.config();

const router = Router();

// define home page route
router.get("/", (req, res) => {
  res.send(`Crypto Router home page ${process.env.PORT}`);
});

// define GET request for getting all a list of crypto assets
router.get("/assets", (req, res) => {
  async function fetchAssets() {
    const searchParams = new URLSearchParams(req.query);
    const headers = {
      Authorization: `Bearer ${process.env.COINCAP_API_KEY}`,
    };

    try {
      let response = await fetch(
        "https://api.coincap.io/v2/assets/?" + searchParams,
        headers
      );
      let data = await response.json();
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  }
  fetchAssets();
});

export default router;
