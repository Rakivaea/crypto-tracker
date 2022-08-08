export function roundPercentage(input) {
  let roundedVal = Math.round((input + Number.EPSILON) * 100) / 100;
  return roundedVal.toFixed(2);
}

export function roundPriceUsd(input) {
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

export function formatLargeNumber(input) {
  let formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(input).toLowerCase();
}

export function getCurrentDate() {
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
