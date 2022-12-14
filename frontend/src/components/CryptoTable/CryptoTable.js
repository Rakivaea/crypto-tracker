import React, { useEffect, useState } from "react";
import { LineChart } from "../LineChart/LineChart";
import "./CryptoTable.css";
import "../../styles/colors.css";
import { nanoid } from "nanoid";
import {
  roundPercentage,
  roundPriceUsd,
  formatLargeNumber,
  getCurrentDate,
} from "../../utils/utils.js";

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
  return (
    <div className={`crypto-card--expanded`}>
      <div
        className={
          props.isDesktop
            ? "crypto-card__info desktop"
            : "crypto-card__info mobile"
        }
      >
        <div className="crypto-card__title">
          <h2>
            {props.name} ({props.symbol})
          </h2>
          <span className="span-date">{currentDate}</span>
        </div>
        <div className="crypto-card__stats">
          <div className="column">
            <h5 className="center space-between">
              <span className="info-title">HIGH</span>
              <span>{props.isLoading ? "Loading.." : `$${maxPrice}`}</span>
            </h5>
            <h5 className="center">
              <span className="info-title">LOW</span>
              <span>{props.isLoading ? "Loading.." : `$${minPrice}`}</span>
            </h5>
          </div>
          <div className="column">
            <h5 className="center">
              <span className="info-title">AVERAGE</span>
              <span>{props.isLoading ? "Loading.." : `$${averagePrice}`}</span>
            </h5>
            <h5 className="center">
              <span className="info-title">CHANGE</span>
              <span>
                {props.isLoading ? "Loading.." : `${props.changePercent24Hr}%`}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="crypto-card__chart">
        {props.cryptoDetailedData.data && (
          <LineChart data={props.cryptoDetailedData.data} isGain={isGain} />
        )}
      </div>
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

    return (
      <>
        <tr key={nanoid()} onClick={() => props.handleClick(asset.id, "m5")}>
          {props.isDesktop && (
            <td colSpan="1" className="center-text">
              {asset.rank}
            </td>
          )}
          <td colSpan="4">
            <NameCard name={asset.name} symbol={asset.symbol} />
          </td>
          <td colSpan="3">${priceUsd}</td>
          {props.isDesktop && (
            <td colSpan="3">
              ${formatLargeNumber(Number(asset.marketCapUsd))}
            </td>
          )}
          {props.isDesktop && (
            <td colSpan="3">{formatLargeNumber(Number(asset.supply))}</td>
          )}
          {props.isDesktop && (
            <td colSpan="3">
              ${formatLargeNumber(Number(asset.volumeUsd24Hr))}
            </td>
          )}
          <td colSpan="3" className={gainOrLoss}>
            {changePercent24Hr}%
          </td>
        </tr>
        <tr className={showCardClass()}>
          <td colSpan={props.isDesktop ? "20" : "10"} className="expanded-row">
            <CryptoCardExpanded
              cryptoDetailedData={props.cryptoDetailedData}
              isLoading={props.isLoading}
              isDesktop={props.isDesktop}
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
            {props.isDesktop && (
              <th colSpan="1" className="center-text">
                Rank
              </th>
            )}
            <th colSpan="4" className="left-align">
              Name
            </th>
            <th colSpan="3">Price</th>
            {props.isDesktop && <th colSpan="3">Market Cap</th>}
            {props.isDesktop && <th colSpan="3">Supply</th>}
            {props.isDesktop && <th colSpan="3">Volume (24hr)</th>}
            <th colSpan="3">Change (24hr)</th>
          </tr>
        </thead>
        <tbody>{cryptoTableElements}</tbody>
      </table>
    </div>
  );
}
