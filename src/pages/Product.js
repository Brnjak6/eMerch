import React, { useState, useEffect, useContext, useRef } from "react";
import { ProductContext } from "../components/ProductContext";
import { useHistory } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import ReadMoreModal from "../components/ReadMoreModal";
import { InputContext } from "../components/InputContext";
import { InputDataContext } from "../components/InputDataContext";
import { ItemsInCartContext } from "../components/ItemsInCartContext";
import Line from "../components/RadialLine";
import AlertWindow from "../components/AlertWindow";

function SelectedProduct() {
  const [product, setProduct] = useContext(ProductContext);
  const [fetched, setFetched] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [input, setInput] = useContext(InputContext);
  const [inputData, setInputData] = useContext(InputDataContext);
  const [itemsInCart, setItemsInCart] = useContext(ItemsInCartContext);
  const [category, setCategory] = useState(false);
  const [error, setError] = useState(null);
  const notInitialRender = useRef(false);
  const [alertMessage, setAlertMessage] = useState("");
  let history = useHistory();

  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/${product}?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url = `https://api.allorigins.win/get?url=${encodedSearch}`;

  const encodedCategory = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${category}&limit=20`
  );
  const urlCategory = `https://api.allorigins.win/get?url=${encodedCategory}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setFetched(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetched
      ? setActiveImage(fetched.results[0].Images[0].url_fullxfull)
      : false;
  }, [fetched]);

  useEffect(() => {
    const showMoreHandler = (e) => {
      if (e.key === "Escape") {
        setReadMore(false);
      }
    };
    document.addEventListener("keydown", showMoreHandler);

    return () => document.removeEventListener("keydown", showMoreHandler);
  });

  const closeModal = () => {
    setReadMore(false);
  };

  const searchByCategory = async (data) => {
    setInputData("");
    setInput(data.target.innerHTML);
    setCategory(data.target.innerHTML);
  };

  useEffect(() => {
    if (notInitialRender.current && category) {
      history.push("/search");
      fetch(urlCategory)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            setInputData(JSON.parse(data.contents));
          }
        })
        .catch(console.error && setError(error));
    } else {
      notInitialRender.current = true;
    }
  }, [category]);

  const addToCart = () => {
    const isInCart = itemsInCart.find(
      (item) => item.listing_id === fetched.results[0].listing_id
    );

    if (isInCart) {
      setAlertMessage("Product is already in the cart");
      return setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    } else if (itemsInCart.length > 10) {
      setAlertMessage("Maximum amount of 10 items in cart is reached");
      return setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    } else setItemsInCart((prevState) => [...prevState, fetched.results[0]]);
    setAlertMessage("Product added to cart");
    return setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  const closeAlertMessage = () => {
    setAlertMessage("");
  };

  if (!fetched) {
    return (
      <LoadContainer>
        <HashLoader size={150} color={"#42748F"} />
      </LoadContainer>
    );
  } else if (error) {
    <LoadContainer>
      <h1>{error}</h1>
    </LoadContainer>;
  } else {
    return (
      <Container>
        <ResultItem>
          <Title>{fetched.results[0].title}</Title>
          <Line />
          <ProductBox>
            <InfoBox>
              <PriceBox>
                <Price>€{fetched.results[0].price}</Price>
                <Pgraph>Taxes included</Pgraph>
              </PriceBox>
              <ButtonBox>
                <Button onClick={addToCart}>Add To Cart</Button>
                <p style={{ fontSize: "90%" }}>
                  {fetched.results[0].quantity * 1 < 5
                    ? `Only ${fetched.results[0].quantity} left`
                    : `${fetched.results[0].quantity} more left`}
                </p>
              </ButtonBox>
              <Materials>
                {fetched.results[0].materials.length < 1 ? null : (
                  <p>
                    Made out of: <br /> {fetched.results[0].materials[0]}
                  </p>
                )}
              </Materials>

              <Description>
                {fetched.results[0].description.substring(0, 250) + "..."}{" "}
                <ReadMore onClick={() => setReadMore(true)}>Read More</ReadMore>
              </Description>
              <Categories>
                {fetched.results[0].taxonomy_path.map((category) => (
                  <Category
                    key={Math.random()}
                    onClick={(e) => searchByCategory(e)}
                  >
                    {category}
                  </Category>
                ))}
              </Categories>
            </InfoBox>
            <Pictures>
              <Image src={activeImage} />
              <Variants>
                {fetched.results[0].Images.map((img) => (
                  <div key={img.listing_image_id}>
                    <ExtraImg
                      src={img.url_fullxfull}
                      onClick={() => setActiveImage(img.url_fullxfull)}
                      style={
                        img.url_fullxfull === activeImage
                          ? { border: "8px double black" }
                          : null
                      }
                    />
                  </div>
                ))}
              </Variants>
            </Pictures>
          </ProductBox>
        </ResultItem>
        {readMore ? (
          <ReadMoreModal
            description={fetched.results[0].description}
            closeModal={closeModal}
          />
        ) : (
          false
        )}
        {alertMessage.length > 2 && (
          <AlertWindow
            message={alertMessage}
            closeAlertMessage={closeAlertMessage}
          />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 125%;

  @media only screen and (max-width: 1200px) {
    font-size: 125%;
  }
`;

const ResultItem = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 35rem;
  height: 88%;
  border-radius: 4px;

  @media only screen and (max-width: 1200px) {
    width: 95%;
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;

const ExtraImg = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  margin: 0.2rem 0;
  cursor: pointer;
  z-index: 5;

  @media only screen and (max-width: 1200px) {
    width: 4rem;
    height: 4rem;
    margin: 0.3rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 27%;
  height: 88%;

  @media only screen and (max-width: 1200px) {
    width: 95%;
    padding: 2.5rem;
    line-height: 4rem;
  }
  @media only screen and (max-width: 400px) {
    font-size: 1.1rem;
    margin-top: 4rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  margin-top: 0.5rem;
  width: 90%;

  @media only screen and (max-width: 1500px) {
    font-size: 120%;
  }
  @media only screen and (max-width: 400px) {
    margin-bottom: 4rem;
  }
`;

const Button = styled.button`
  transition: 0.3s all;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.main} !important;
  border: none !important;
  padding: 0.5rem 1rem;

  &:hover {
    background: ${(props) => props.theme.colors.main} !important;
    color: ${(props) => props.theme.colors.third};
    border: 5px double ${(props) => props.theme.colors.third};
  }
  @media only screen and (max-width: 700px) {
    font-size: 120%;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  width: 100%;
`;

const Price = styled.h3`
  color: ${(props) => props.theme.colors.main};
  text-align: center;
`;

const PriceBox = styled.div`
  color: ${(props) => props.theme.colors.main};
  text-align: center;
`;

const Categories = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Pictures = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;

  @media only screen and (max-width: 1200px) {
    font-size: 115%;
    flex-direction: column;
    width: 98%;
    padding: 2rem;
  }

  @media only screen and (max-width: 700px) {
    margin: 1rem 0;
  }

  @media only screen and (max-height: 900px) {
    margin-top: 3rem;
  }
`;

const Category = styled.div`
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 80%;
  padding: 0.5rem;
  margin: 0.6rem 0.5rem;
  min-width: 6.5rem;
  text-align: center;

  &:hover {
    transform: rotate(-10deg);
    transition: 0.3s;
    cursor: pointer;
  }

  @media only screen and (max-width: 1200px) {
    padding: 0 0.5rem;
    font-size: 0.8rem;
  }
`;

const ProductBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 1200px) {
    font-size: 125%;
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

const Variants = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: 1200px) {
    flex-direction: row;
    width: 95%;
    flex-wrap: wrap;
    margin: 0.4rem;
  }
`;

const Materials = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const Pgraph = styled.p`
  font-size: 65%;
  font-weight: lighter;
  letter-spacing: 0.15rem;
`;

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReadMore = styled.span`
  color: ${(props) => props.theme.colors.main};
  font-weight: bold;
  cursor: pointer;
`;
export default SelectedProduct;
