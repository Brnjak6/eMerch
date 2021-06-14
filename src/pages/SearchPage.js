import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { InputDataContext } from "../components/Contexts/InputDataContext";
import { ProductContext } from "../components/Contexts/ProductContext";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import { ReactComponent as Eye } from "../img/eye.svg";
import { ReactComponent as LeftArrow } from "../img/left-arrow.svg";
import { ReactComponent as RightArrow } from "../img/right-arrow.svg";
import { ReactComponent as DownArrow } from "../img/down-arrow.svg";
import { OffsetContext } from "../components/Contexts/OffsetContext";
import { InputContext } from "../components/Contexts/InputContext";
import { SearchPageContext } from "../components/Contexts/SearchPageContext";
import { motion } from "framer-motion";
import { pageAnimation } from "../global/Animations";
import ReactImageAppear from "react-image-appear";

function SearchPage() {
  const [inputData, setInputData] = useContext(InputDataContext);
  const [product, setProduct] = useContext(ProductContext);
  const [offset, setOffset] = useContext(OffsetContext);
  const [input, setInput] = useContext(InputContext);
  const [page, setPage] = useContext(SearchPageContext);
  const [descendingActive, setDescendingActive] = useState(false);
  const [ascendingActive, setAscendingActive] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  let history = useHistory();

  // Offset changed for page parameter, 'offset' useState is left the same
  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${input}&limit=20&page=${offset}`
  );
  const url = `https://api.allorigins.win/get?url=${encodedSearch}`;
  // Price descending params
  const encodedSearchDescending = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${input}&limit=20&page=${offset}&sort_on=price`
  );
  const urlDescending = `https://api.allorigins.win/get?url=${encodedSearchDescending}`;
  // Price ascending params
  const encodedSearchAscending = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${input}&limit=20&page=${offset}&sort_on=price&sort_order=up`
  );
  const urlAscending = `https://api.allorigins.win/get?url=${encodedSearchAscending}`;

  // Limits only already displayed results, param sort_on is a better option
  // const priceDescendingHandler = () => {
  //   setPriceDescending(inputData.sort((a, b) => b.price - a.price));
  //   console.log(inputData);
  // };

  // const priceAscendingHandler = () => {
  //   setPriceDescending(inputData.sort((a, b) => a.price - b.price));
  //   console.log(inputData);
  // };

  const priceDescendingHandler = () => {
    setDescendingActive(true);
    setInputData(false);
    setOffset(1);
    setPage(1);
    fetch(urlDescending)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setInputData(JSON.parse(data.contents));
          console.log(inputData);
        }
      })
      .catch(console.error);
  };

  const priceAscendingHandler = () => {
    setAscendingActive(true);
    setInputData(false);
    setOffset(1);
    setPage(1);
    fetch(urlAscending)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setInputData(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  };

  const nextPage = () => {
    setPage(page + 1);
    setOffset(offset + 1);
    setInputData(false);
    if (ascendingActive) {
      return fetch(urlAscending)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            if (inputData) {
              return setInputData(JSON.parse(data.contents));
            } else {
              setProductData(JSON.parse(data.contents));
            }
          }
        })
        .catch(console.error);
    }
    if (descendingActive) {
      return fetch(urlDescending)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            setInputData(JSON.parse(data.contents));
          }
        })
        .catch(console.error);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          if (inputData) {
            return setInputData(JSON.parse(data.contents));
          } else {
            setProductData(JSON.parse(data.contents));
          }
        }
      })
      .catch(console.error);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
    setOffset(offset - 1);
    setInputData(false);
    if (ascendingActive) {
      return fetch(urlAscending)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            if (inputData) {
              return setInputData(JSON.parse(data.contents));
            } else {
              return setProductData(JSON.parse(data.contents));
            }
          }
        })
        .catch(console.error);
    }
    if (descendingActive) {
      return fetch(urlDescending)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            setInputData(JSON.parse(data.contents));
            console.log(inputData);
          }
        })
        .catch(console.error);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setInputData(JSON.parse(data.contents));
          console.log(inputData);
        }
      })
      .catch(console.error);
  };

  if (!inputData) {
    return (
      <LoadContainer>
        <HashLoader size={150} color={"#42748F"} />
      </LoadContainer>
    );
  } else if (inputData.results.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "5rem" }}>
        Unfortunately there are no results for your query
      </h2>
    );
  } else {
    return (
      <>
        <Navbar>
          <FilterTitle onClick={() => setFiltersOpen(!filtersOpen)}>
            <h3>Filters</h3>
            <ArrowBtn />
          </FilterTitle>

          <NavbarHidden
            style={filtersOpen ? { opacity: "1" } : { opacity: "0" }}
          >
            <Filter onClick={() => priceDescendingHandler()}>
              Price descending
            </Filter>
            <Filter onClick={() => priceAscendingHandler()}>
              Price ascending
            </Filter>
          </NavbarHidden>
        </Navbar>

        <ResultsContainer
          variants={pageAnimation}
          initial="hidden"
          animate="show"
        >
          {inputData.results.map((res) => {
            if (!res) {
              return <ItemArea>Product not available</ItemArea>;
            } else {
              return (
                <ItemArea key={res.listing_id}>
                  <ItemBox>
                    <Front>
                      <Title>
                        {res.title.length > 25
                          ? res.title
                              .substring(0, 25)
                              .replace(/&#39;/g, "'")
                              .replace(/&quot;/g, "'") + "..."
                          : res.title
                              .replace(/&#39;/g, "'")
                              .replace(/&quot;/g, "'")}
                      </Title>
                      <Img
                        src={res ? res.Images[0].url_fullxfull : null}
                        alt="img"
                        animation="blurIn"
                        animationDuration=".5s"
                        placeholderStyle={{ background: "transparent" }}
                      />
                      <Price>${res.price}</Price>
                    </Front>
                    <Hover>
                      <Button
                        onClick={() => {
                          setProduct(res.listing_id), history.push("/product");
                        }}
                      >
                        Details
                      </Button>
                    </Hover>
                  </ItemBox>
                  <Views>
                    <ViewsSvg />
                    <span style={{ fontWeight: "bold" }}>{res.views}</span>
                  </Views>
                </ItemArea>
              );
            }
          })}
          <Pagination>
            <LeftArrowSvg
              style={page === 1 ? { fill: "red", opacity: 0.4 } : null}
              onClick={() => prevPage()}
            />
            {page}
            <RightArrowSvg
              onClick={() => {
                nextPage();
              }}
            />
          </Pagination>
        </ResultsContainer>
      </>
    );
  }
}

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsContainer = styled(motion.div)`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0rem 2rem 0 2rem;
`;

const Hover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.7s all;
`;

const Button = styled.button`
  transition: 0.3s all;
  color: ${(props) => props.theme.colors.main};
  background: ${(props) => props.theme.colors.secondary} !important;
  border: 5px double ${(props) => props.theme.colors.secondary} !important;

  &:hover {
    border: 5px double ${(props) => props.theme.colors.third} !important;
  }
`;

const Img = styled(ReactImageAppear)`
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 0%;
`;

const Views = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.4rem;
  width: 100%;
`;

const ViewsSvg = styled(Eye)`
  fill: ${(props) => props.theme.colors.main};
  height: 2rem;
  width: 2rem;
  z-index: 200;
`;

const ItemArea = styled.div`
  width: 24rem;
  height: 55vh;
  margin-bottom: 6rem;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: visibility 2s;
`;

const Navbar = styled.div`
  width: 15rem;
  height: 10rem;
  margin-right: 6rem;
  font-size: 110%;
  display: flex;
  flex-direction: column;
  text-align: center;
  float: right;
  margin-top: 2rem;
`;

const NavbarHidden = styled.div`
  width: 100%;
  margin: 0 2rem;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  float: left;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const Filter = styled.button`
  margin: 0.3rem 0;
  text-transform: uppercase;
  width: 70%;
  font-size: 80%;
  color: ${(props) => props.theme.colors.main};
  border: 5px double ${(props) => props.theme.colors.main};
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;
const LeftArrowSvg = styled(LeftArrow)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 0.5rem;
`;
const RightArrowSvg = styled(RightArrow)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const ArrowBtn = styled(DownArrow)`
  fill: ${(props) => props.theme.colors.main};
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  margin-left: 0.9rem;
`;

const ItemBox = styled.div`
  width: 90%;
  height: 65%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background: #141e30;
  background: -webkit-linear-gradient(to right, #243b55, #141e30);
  background: linear-gradient(to right, #243b55, #141e30);
  &:hover {
    ${Hover} {
      opacity: 1;
    }

    ${Img} {
      display: none;
    }
  }
`;

const Price = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};
  letter-spacing: 0.3rem;
  padding: 0.3rem;
  width: 100%;
  height: 10%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Front = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  height: 15%;
  width: 100%;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.main};
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SearchPage;
