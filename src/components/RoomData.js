const encoded1 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/642136027?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

const encoded2 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/935071104?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url2 = `https://api.allorigins.win/get?url=${encoded2}`;

const encoded3 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/949303486?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url3 = `https://api.allorigins.win/get?url=${encoded3}`;

const encoded4 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/973019467?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url4 = `https://api.allorigins.win/get?url=${encoded4}`;

const encoded5 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/618214338?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url5 = `https://api.allorigins.win/get?url=${encoded5}`;

const encoded6 = encodeURIComponent(
  `https://openapi.etsy.com/v2/listings/880690644?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
);
const url6 = `https://api.allorigins.win/get?url=${encoded6}`;

export function fetchFridge() {
  let url = url1;
  return fetch(url).then((res) => res.json());
}

export function fetchLights() {
  let url = url2;
  return fetch(url).then((res) => res.json());
}

export function fetchCarpet() {
  let url = url3;
  return fetch(url).then((res) => res.json());
}

export function fetchSeats() {
  let url = url4;
  return fetch(url).then((res) => res.json());
}

export function fetchTable() {
  let url = url5;
  return fetch(url).then((res) => res.json());
}

export function fetchBench() {
  let url = url6;
  return fetch(url).then((res) => res.json());
}
