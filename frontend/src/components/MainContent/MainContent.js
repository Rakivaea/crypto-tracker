import React, { useEffect, useState } from "react";
import CryptoTable from "../CryptoTable/CryptoTable";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import useMediaQuery from "../../hooks/useMediaQuery";
import { ThreeDots } from "react-loader-spinner";
import "./MainContent.css";

export default function MainContent() {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [cryptoDetailedData, setCryptoDetailedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExpanded, setIsLoadingExpanded] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(10);
  const [selectedKey, setSelectedKey] = useState("");

  const isDesktop = useMediaQuery("(min-width: 960px");

  async function handleClick() {
    try {
      const response = await fetch(
        `http://localhost:3000/crypto/assets/?limit=${currentPosition}`
      );
      const data = await response.json();
      setCryptoAssets(data.data);

      setCurrentPosition((prevValue) => prevValue + 5);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleExpandClick(key, interval) {
    async function fetchCryptoExpanded(key, interval) {
      try {
        setIsLoadingExpanded(true);

        const response = await fetch(
          `http://localhost:3000/crypto/${key.toLowerCase()}/history/?interval=${interval}`
        );
        if (response.ok === false) {
          throw new Error("Not good!!");
        }
        const data = await response.json();

        setCryptoDetailedData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoadingExpanded(false);
      }
    }

    if (key === selectedKey) {
      setSelectedKey("");
    } else {
      setSelectedKey(key);
      fetchCryptoExpanded(key, interval);
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
        setCryptoAssets(data.data);
        console.log(data.data);
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
        <div className="center">
          <ThreeDots
            height="60"
            width="60"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <>
          <CryptoTable
            cryptoAssets={cryptoAssets}
            cryptoDetailedData={cryptoDetailedData}
            isDesktop={isDesktop}
            isLoading={isLoadingExpanded}
            handleClick={handleExpandClick}
            selectedKey={selectedKey}
          />
          <LoadMoreButton handleClick={handleClick} />
        </>
      )}
    </main>
  );
}
