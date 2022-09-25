import fetch from "node-fetch";
import dotenv from "dotenv";
import { min, max } from "mathjs";

import { Router } from "express";

dotenv.config();

const router = Router();

// define home page route
router.get("/", (req, res) => {
  res.send(`Crypto Router home page ${process.env.PORT}`);
});

// define GET request for getting all a list of crypto assets
router.get("/assets", (req, res) => {
  async function fetchAllAssets() {
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
  fetchAllAssets();
});

// define GET request for getting all a list of crypto assets
router.get("/:assetId/history", (req, res) => {
  async function fetchCoinHistory() {
    const searchParams = new URLSearchParams(req.query);
    const headers = {
      Authorization: `Bearer ${process.env.COINCAP_API_KEY}`,
    };

    try {
      let response = await fetch(
        "https://api.coincap.io/v2/assets/" +
          req.params.assetId +
          "/history/?" +
          searchParams,
        headers
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let dataLength = data.data.length;
      let minPrice = Number(data.data[0].priceUsd);
      let maxPrice = Number(data.data[0].priceUsd);

      let averagePrice = 0;
      for (let i = 0; i < dataLength - 1; i++) {
        averagePrice += Number(data.data[i].priceUsd);
      }
      averagePrice /= dataLength;
      for (let i = 1; i < dataLength - 1; i++) {
        minPrice = min(Number(data.data[i].priceUsd), minPrice);
        maxPrice = max(Number(data.data[i].priceUsd), maxPrice);
      }
      const newData = {
        ...data,
        minPrice: minPrice,
        maxPrice: maxPrice,
        averagePrice: averagePrice,
      };

      console.log(`min: ${minPrice}`);
      console.log(`max: ${maxPrice}`);
      console.log(`average: ${averagePrice}`);

      res.send(newData);
    } catch (err) {
      console.log(err);
    }
  }
  fetchCoinHistory();
});

export default router;
