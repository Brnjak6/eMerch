import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Search } from "../img/search.svg";
import { ReactComponent as Cart } from "../img/shopping-cart.svg";
import { InputDataContext } from "../components/InputDataContext";
import { OffsetContext } from "../components/OffsetContext";
import { InputContext } from "../components/InputContext";
import { SearchPageContext } from "../components/SearchPageContext";
import DiscoverComponent from "../components/DiscoverComponent";
import "../components/Navigation.scss";
import BurgerMenu from "../components/BurgerMenu";

function Navigation() {
  const [fixedNav, setfixedNav] = useState(false);
  const [input, setInput] = useContext(InputContext);
  const [inputData, setInputData] = useContext(InputDataContext);
  const [offset, setOffset] = useContext(OffsetContext);
  const [page, setPage] = useContext(SearchPageContext);
  const [category, setCategory] = useState(false);
  const notInitialRender = useRef(false);
  const [burgerActive, setBurgerActive] = useState(false);
  let history = useHistory();

  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${input}&limit=20&offset=${offset}`
  );
  const urlSearch = `https://api.allorigins.win/get?url=${encodedSearch}`;

  const encodedCategory = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${category}&limit=20&offset=${offset}`
  );
  const urlCategory = `https://api.allorigins.win/get?url=${encodedCategory}`;

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 1200) {
        setfixedNav(true);
      } else {
        setfixedNav(false);
      }
    };

    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [window.scrollY]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!input) {
      return alert("Please input desired item to search");
    }
    history.push("/search");
    setInputData("");
    setPage(1);
    fetch(urlSearch)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setInputData(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  };

  const searchByCategory = (data) => {
    setInputData("");
    history.push("/search");
    setInput(data.target.innerHTML);
    setCategory(data.target.innerHTML);
  };

  const burgerHandler = () => {
    setBurgerActive(!burgerActive);
  };

  useEffect(() => {
    if (notInitialRender.current && category) {
      fetch(urlCategory)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            setInputData(JSON.parse(data.contents));
          }
        })
        .catch(console.error);
    } else {
      notInitialRender.current = true;
    }
  }, [category]);

  const returnToMain = () => {
    setInput("");
    setInputData("");
    window.scroll({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (burgerActive) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [burgerActive]);

  return (
    <>
      <Container
        style={fixedNav ? { position: "fixed", opacity: 0.8, top: 0 } : null}
      >
        <SearchBox onSubmit={submitHandler}>
          <SearchBtn onClick={submitHandler} />
          <Input
            type="search"
            placeholder="Search items......"
            onChange={inputHandler}
            value={input}
            onClick={() => setInputData("")}
          />
        </SearchBox>
        <Title to="/" onClick={returnToMain}>
          Widicy
        </Title>
        <RightItems>
          <Products>
            <Discover>
              <DiscoverComponent />
              <Dropdown>
                <Li onClick={(e) => searchByCategory(e)}>gardening</Li>
                <Li onClick={(e) => searchByCategory(e)}>men coats</Li>
                <Li onClick={(e) => searchByCategory(e)}>smart watches</Li>
                <Li onClick={(e) => searchByCategory(e)}>car products</Li>
              </Dropdown>
            </Discover>
          </Products>
          <ToCart to={"/cart"}>
            <CartIcon />
          </ToCart>
        </RightItems>
        <div className="burger-box" style={{ position: "absolute" }}>
          <div
            className={burgerActive ? "container change" : "container"}
            onClick={() => burgerHandler()}
          >
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </div>
        </div>
        <BorderBottom></BorderBottom>
        {burgerActive && <BurgerMenu burgerHandler={burgerHandler} />}
      </Container>
    </>
  );
}

const Container = styled.div`
  z-index: 500;
  width: 100%;
  height: 10vh;
  padding: 0 5rem;
  font-family: "Rhodium Libre", serif;
  background: ${(props) => props.theme.colors.navigation};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.colors.third};

  &:hover {
    opacity: 1 !important;
    transition: 0.2s;
  }
`;

const RightItems = styled.div`
  position: relative;
  width: 20vw;
`;
const Dropdown = styled.ul`
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};
  margin-top: 0.3rem;
  width: fit-content;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 0;
  opacity: 0;
  transition: 0.4s;
`;

const Li = styled.div`
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  font-size: 90%;
  transition: 1s;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.third} 50%,
    ${(props) => props.theme.colors.main} 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;

  &:hover {
    background-position: left bottom;
  }
`;

const Discover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover > ul {
    height: auto;
    opacity: 1;
  }
`;

const CartIcon = styled(Cart)`
  fill: white;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  float: right;
`;

const ToCart = styled(Link)`
  width: fit-content;
  height: fit-content;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const SearchBtn = styled(Search)`
  width: 1.2rem;
  height: 1.2rem;
  fill: ${(props) => props.theme.colors.secondary};
  position: absolute;
  top: 20%;
  opacity: 0.8;
  right: 0%;
  cursor: pointer;
  z-index: 200;
`;

const Title = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.3rem;
  letter-spacing: 0.25rem;
  font-family: "Rhodium Libre", serif;
  text-decoration: none;
  color: ${(props) => props.theme.colors.third};
  text-transform: uppercase;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const Products = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  position: absolute;
  left: 0%;
  width: 70%;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0%;
  right: 45%;
  height: 0.2rem;
  width: 10%;
  background: ${(props) => props.theme.colors.third};
  box-shadow: 0 -2px 20px 4px ${(props) => props.theme.colors.third};

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const SearchBox = styled.form`
  width: 11%;
  height: 6vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;

  &:before {
    content: "";
    width: 100%;
    height: 3px;
    top: 0%;
    left: -80%;
    background: linear-gradient(to right, transparent 30%, #fff);
    position: absolute;
  }

  &:after {
    content: "";
    width: 100%;
    height: 3px;
    background: ${(props) => props.theme.colors.third};
    position: absolute;
    bottom: 0%;
    left: 30%;
    background: linear-gradient(to left, transparent 30%, #fff);
  }

  @media only screen and (max-width: 900px) {
    width: 35%;
  }

  @media only screen and (max-width: 460px) {
    width: 50%;

    &:before {
      content: none;
    }

    &:after {
      content: none;
    }
  }
`;

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  caret-color: ${(props) => props.theme.colors.third};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 5%;
  height: 60%;
  font-size: 1.15rem;
  font-weight: lighter;
  padding: 0.5rem 1rem;
  opacity: 0.5;

  &:focus {
    opacity: 1;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.secondary};
    font-family: "Rhodium Libre", serif;
    font-size: 1rem;
    opacity: 0.4;
  }
`;

export default Navigation;
