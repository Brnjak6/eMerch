import React, { useState, useEffect } from "react";
const url2 = `https://openapi.etsy.com/v2/listings/465354376?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`;
const url3 = `https://openapi.etsy.com/v2/listings/465354376?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`;

function Recommended() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);
  const images = [contents1, contents2, contents3];

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/465354376?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/958578813?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;
  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/971993404?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url3 = `https://api.allorigins.win/get?url=${encoded3}`;

  useEffect(() => {
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents1(JSON.parse(data.contents));
        }
      })
      .catch(console.error);

    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents2(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
    console.log(contents2);

    fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents3(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  }, []);

  return !contents3 ? (
    <h2>Loading error</h2>
  ) : (
    <>
      <img src={contents1.results[0].Images[0].url_fullxfull} alt="img" />
      <img src={contents2.results[0].Images[0].url_fullxfull} alt="img" />
      <img src={contents3.results[0].Images[0].url_fullxfull} alt="img" />
    </>
  );
}

export default Recommended;
