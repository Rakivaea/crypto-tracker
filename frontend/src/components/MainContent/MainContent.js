import React, { useEffect, useState } from "react";
import CryptoTable from "../CryptoTable/CryptoTable";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./MainContent.css";
export default function MainContent() {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(10);
  const isDesktop = useMediaQuery("(min-width: 960px");

  async function handleClick() {
    try {
      const response = await fetch(
        `http://localhost:3000/crypto/assets/?limit=${currentPosition}`
      );
      const data = await response.json();
      console.log(data);
      setCryptoAssets(data.data);

      setCurrentPosition((prevValue) => prevValue + 5);
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  }
  useEffect(() => {
    async function fetchCryptoAssets() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:3000/crypto/assets/?limit=5"
        );
        const data = await response.json();
        console.log(data);
        setCryptoAssets(data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(true);
      }
    }
    fetchCryptoAssets();
  }, []);

  return (
    <main>
      {isLoading ? (
        <h1>Bro it's loading, lol</h1>
      ) : (
        !isLoading && (
          <>
            <CryptoTable cryptoAssets={cryptoAssets} isDesktop={isDesktop} />
            <LoadMoreButton handleClick={handleClick} />
          </>
        )
      )}
    </main>
  );
}
