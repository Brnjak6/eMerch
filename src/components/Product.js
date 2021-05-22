import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import ReadMoreModal from "./ReadMoreModal";

function SelectedProduct() {
  const [product, setProduct] = useContext(ProductContext);
  const [fetched, setFetched] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/${product}?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url = `https://api.allorigins.win/get?url=${encodedSearch}`;

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

  return !fetched ? (
    <LoadContainer>
      <HashLoader size={150} />
    </LoadContainer>
  ) : (
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
              <Button>Add To Cart</Button>
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
                <Category key={Math.random()}>{category}</Category>
              ))}
            </Categories>
          </InfoBox>
          <Image src={activeImage} />
          <Variants>
            {fetched.results[0].Images.map((img) => (
              <div key={img.listing_image_id}>
                <ExtraImg
                  src={img.url_fullxfull}
                  onClick={() => setActiveImage(img.url_fullxfull)}
                  style={
                    img.url_fullxfull === activeImage
                      ? { border: "3px double black" }
                      : null
                  }
                />
              </div>
            ))}
          </Variants>
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
    </Container>
  );
}

const Container = styled.div`
  height: 85vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
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
`;

const ExtraImg = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  margin: 0.2rem 0;
  cursor: pointer;
  z-index: 5;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 27%;
  height: 88%;
  overflow: hidden;
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
`;

const Button = styled.button`
  transition: 0.3s all;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.main} !important;
  border: 5px double ${(props) => props.theme.colors.main};

  &:hover {
    background: ${(props) => props.theme.colors.main} !important;
    color: ${(props) => props.theme.colors.third};
    border: 5px double ${(props) => props.theme.colors.third};
  }
`;

const Line = styled.div`
  height: 3px;
  width: 80%;
  background: radial-gradient(#000, #fff);
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
`;

const ProductBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Variants = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
