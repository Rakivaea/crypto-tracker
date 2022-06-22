import React from "react";
import "./CryptoTable.css";
import "../../styles/colors.css";
import { nanoid } from "nanoid";

function roundPercentage(input) {
  return Math.round((input + Number.EPSILON) * 100) / 100;
}

function roundPriceUsd(input) {
  let roundedVal = 0;
  if (input < 0.01) {
    roundedVal = input
      .toPrecision(2)
      .toLocaleString(undefined, { maximumFractionDigits: 15 });
  } else {
    roundedVal = Math.round((input + Number.EPSILON) * 100) / 100;
    roundedVal = roundedVal.toFixed(2);
  }
  return roundedVal.toLocaleString();
}

function CryptoCard(props) {
  return (
    <div className="crypto-card">
      <h3>{props.name}</h3>
      <p>{props.symbol}</p>
    </div>
  );
}

export default function CryptoTable(props) {
  const cryptoAssets = props.cryptoAssets;
  const cryptoTableElements = cryptoAssets.map((asset) => {
    const priceUsd = roundPriceUsd(Number(asset.priceUsd));
    const changePercent24hr = roundPercentage(Number(asset.changePercent24Hr));
    const gainOrLoss = changePercent24hr > 0 ? "gain" : "loss";
    return (
      <tr key={nanoid()}>
        <td colSpan="5">
          <CryptoCard name={asset.name} symbol={asset.symbol} />
        </td>
        <td colSpan="3">${priceUsd}</td>
        <td colSpan="3" className={gainOrLoss}>
          {changePercent24hr}%
        </td>
      </tr>
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
            <th colSpan="2">Past 24hrs</th>
          </tr>
        </thead>
        <tbody>{cryptoTableElements}</tbody>
      </table>
    </div>
  );
}
