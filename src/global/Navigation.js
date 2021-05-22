import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Search } from "../img/search.svg";
import { ReactComponent as Cart } from "../img/shopping-cart.svg";
import { ReactComponent as Arrow } from "../img/down-arrow.svg";
import { InputDataContext } from "../components/InputDataContext";
import { OffsetContext } from "../components/OffsetContext";
import { InputContext } from "../components/InputContext";
import { SearchPageContext } from "../components/SearchPageContext";

function Navigation() {
  const [fixedNav, setfixedNav] = useState(false);
  const [input, setInput] = useContext(InputContext);
  const [inputData, setInputData] = useContext(InputDataContext);
  const [offset, setOffset] = useContext(OffsetContext);
  const [page, setPage] = useContext(SearchPageContext);
  let history = useHistory();

  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${input}&limit=20&offset=${offset}`
  );
  const url = `https://api.allorigins.win/get?url=${encodedSearch}`;

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 130) {
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
    setInputData("");
    setPage(1);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setInputData(JSON.parse(data.contents));
          console.log(inputData);
        }
      })
      .catch(console.error);
    history.push("/search");
  };

  const returnToMain = () => {
    setInput("");
    setInputData("");
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
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
          <Header>
            DISCOVER <ArrowBtn />
          </Header>
          <Dropdown>
            <Li>Garden</Li>
            <Li>Men coats</Li>
            <Li>Smart watches</Li>
            <Li>car equipment</Li>
          </Dropdown>
        </Products>
        <CartIcon />
      </RightItems>
      <BorderBottom></BorderBottom>
    </Container>
  );
}

const Container = styled.div`
  z-index: 200;
  width: 100%;
  height: 11vh;
  padding: 0 5rem;
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

const Dropdown = styled.div``;

const Li = styled.div`
  text-decoration: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(Cart)`
  fill: white;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  float: right;
`;

const ArrowBtn = styled(Arrow)`
  fill: ${(props) => props.theme.colors.secondary};
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
  padding-bottom: 0.2rem;
`;

const SearchBtn = styled(Search)`
  width: 1.2rem;
  height: 1.2rem;
  fill: ${(props) => props.theme.colors.secondary};
  position: absolute;
  top: 30%;
  opacity: 0.8;
  right: 0%;
  cursor: pointer;
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
`;

const Products = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  position: absolute;
  left: 0%;
  width: 70%;
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0%;
  right: 45%;
  height: 0.2rem;
  width: 10%;
  background: ${(props) => props.theme.colors.third};
  box-shadow: 0 -2px 20px 4px ${(props) => props.theme.colors.third};
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

  &::placeholder {
    color: ${(props) => props.theme.colors.secondary};
    font-family: "Rhodium Libre", serif;
    font-size: 1rem;
    opacity: 0.4;
  }
`;

export default Navigation;
