import React, { useEffect, useState } from "react";
import { LineChart } from "../LineChart/LineChart";
import "./CryptoTable.css";
import "../../styles/colors.css";
import { nanoid } from "nanoid";

function roundPercentage(input) {
  return Math.round((input + Number.EPSILON) * 100) / 100;
}

function roundPriceUsd(input) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let roundedVal = 0;
  if (input < 0.01) {
    roundedVal = input
      .toPrecision(2)
      .toLocaleString(undefined, { maximumFractionDigits: 15 });
    return roundedVal.toLocaleString();
  } else {
    roundedVal = Math.round((input + Number.EPSILON) * 100) / 100;
    roundedVal = roundedVal.toFixed(2);
    return numberWithCommas(roundedVal);
  }
}

function getCurrentDate() {
  const monthDict = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  let today = new Date();
  let day = String(today.getDate());
  let month = monthDict[today.getMonth()];
  let year = today.getFullYear();
  return `${month} ${day} ${year}`;
}

function CryptoCardExpanded(props) {
  let minPrice = 0;
  let maxPrice = 0;
  let averagePrice = 0;

  let currentDate = getCurrentDate();
  let isGain = false;
  if (Number(props.changePercent24Hr) > 0) {
    isGain = true;
  }
  if (props.cryptoDetailedData.length !== 0) {
    minPrice = roundPriceUsd(Number(props.cryptoDetailedData.minPrice));
    maxPrice = roundPriceUsd(Number(props.cryptoDetailedData.maxPrice));
    averagePrice = roundPriceUsd(Number(props.cryptoDetailedData.averagePrice));
  }
  console.log(props.changePercent24Hr);
  return (
    <div className={`crypto-card--expanded`}>
      {props.isLoading ? (
        <h1 className="center">Loading...</h1>
      ) : (
        <>
          <div className="crypto-card__title">
            <h2>
              {props.name} ({props.symbol})
            </h2>
            <span>{currentDate}</span>
          </div>
          <div className="crypto-card__info">
            <div className="column">
              <span className="info-title">HIGH</span>
              <span>${maxPrice}</span>
              <br />

              <span className="info-title">LOW</span>
              <span> ${minPrice}</span>
            </div>
            <div className="column">
              <span className="info-title">AVERAGE</span>
              <span>${averagePrice}</span>
              <br />
              <span className="info-title">CHANGE</span>
              <span> {props.changePercent24Hr}%</span>
            </div>
          </div>
          <div className="crypto-card__chart">
            <LineChart data={props.cryptoDetailedData.data} isGain={isGain} />
          </div>
        </>
      )}
    </div>
  );
}

function NameCard(props) {
  return (
    <>
      <div className="name-card">
        <h3>{props.name}</h3>
        <p>{props.symbol}</p>
      </div>
    </>
  );
}

export default function CryptoTable(props) {
  const cryptoAssets = props.cryptoAssets;
  const cryptoTableElements = cryptoAssets.map((asset) => {
    const priceUsd = roundPriceUsd(Number(asset.priceUsd));
    const changePercent24Hr = roundPercentage(Number(asset.changePercent24Hr));
    const gainOrLoss = changePercent24Hr > 0 ? "gain" : "loss";
    const isSelected = props.selectedKey === asset.id;
    const showCardClass = () => (isSelected ? "visible" : "hidden");
    // INTERESTING STUFF BELOW
    // const pricesWs = new WebSocket(
    //   "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
    // );

    // pricesWs.onmessage = function (msg) {
    //   console.log(msg.data);
    // };
    return (
      <>
        <tr key={nanoid()} onClick={() => props.handleClick(asset.id, "m5")}>
          <td colSpan="5">
            <NameCard name={asset.name} symbol={asset.symbol} />
          </td>
          <td colSpan="3">${priceUsd}</td>
          <td colSpan="3" className={gainOrLoss}>
            {changePercent24Hr}%
          </td>
        </tr>
        <tr className={showCardClass()}>
          <td colSpan="11" className="expanded-row">
            <CryptoCardExpanded
              cryptoDetailedData={props.cryptoDetailedData}
              isLoading={props.isLoading}
              name={asset.name}
              symbol={asset.symbol}
              priceUsd={priceUsd}
              changePercent24Hr={changePercent24Hr}
            />
          </td>
        </tr>
      </>
    );
  });
  return (
    <div
      className={
        props.isDesktop ? "table-container--desktop" : "table-container--mobile"
      }
    >
      <table>
        <thead className="table-header--light-mode">
          <tr>
            <th colSpan="5">Name</th>
            <th colSpan="3">Price</th>
            <th colSpan="3">Past 24hrs</th>
          </tr>
        </thead>
        <tbody>{cryptoTableElements}</tbody>
      </table>
    </div>
  );
}
