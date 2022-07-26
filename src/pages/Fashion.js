import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import '../components/SlicedImage.scss';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../components/Contexts/ProductContext';
import HashLoader from 'react-spinners/HashLoader';
import { ReactComponent as Bag } from '../img/shopping-bag.svg';
import '../components/SlicedImage.scss';
import { motion } from 'framer-motion';
import { pageAnimation, slideToLeft, slideToRight } from '../global/Animations';
import { useScroll } from '../global/useScroll';

function fashion() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);
  const [contents4, setContents4] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [product, setProduct] = useContext(ProductContext);
  const [element, controls] = useScroll();
  let history = useHistory();

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/278845428?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/518514766?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;
  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/538864635?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url3 = `https://api.allorigins.win/get?url=${encoded3}`;
  const encoded4 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/973951494?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url4 = `https://api.allorigins.win/get?url=${encoded4}`;

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

    fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents3(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
    fetch(url4)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents4(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  }, []);

  const shopNowHandler = (data) => {
    setProduct(data);
    history.push('/product');
  };

  useEffect(() => {
    if (contents1 && contents2 && contents3 && contents4) {
      setContentLoaded(true);
    }
  }, [contents1, contents2, contents3, contents4]);

  if (!contentLoaded) {
    return (
      <LoadContainer>
        <HashLoader size={150} color={'#42748F'} />
      </LoadContainer>
    );
  }
  return (
    <Container variants={pageAnimation} initial="hidden" animate="show">
      <Section>
        <Information>
          <Title>{contents1.results[0].title.replace(/,/g, '/')}</Title>
          <ShopNow onClick={() => shopNowHandler(278845428)}>
            <ShopBagSvg />
            <p>Shop Now</p>
          </ShopNow>
        </Information>
        <ImageBox variants={slideToLeft} initial="hidden" animate="show">
          <div className="image-wrapper">
            <Img
              className="image-1"
              src={contents1.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-2"
              src={contents1.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-3"
              src={contents1.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-4"
              src={contents1.results[0].Images[0].url_fullxfull}
            />
          </div>
        </ImageBox>
      </Section>
      <Section style={{ flexDirection: 'row-reverse' }}>
        <Information>
          <Title>{contents2.results[0].title.replace(/,/g, '/')}</Title>
          <ShopNow onClick={() => shopNowHandler(518514766)}>
            <ShopBagSvg />
            <p>Shop Now</p>
          </ShopNow>
        </Information>
        <ImageBox variants={slideToRight} initial="hidden" animate="show">
          <div className="image-wrapper">
            <Img
              className="image-1"
              src={contents2.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-2"
              src={contents2.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-3"
              src={contents2.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-4"
              src={contents2.results[0].Images[0].url_fullxfull}
            />
          </div>
        </ImageBox>
      </Section>
      <Section>
        <Information>
          <Title>{contents3.results[0].title.replace(/,/g, '/')}</Title>
          <ShopNow onClick={() => shopNowHandler(538864635)}>
            <ShopBagSvg />
            <p>Shop Now</p>
          </ShopNow>
        </Information>
        <ImageBox
          variants={slideToLeft}
          initial="hidden"
          animate={controls}
          ref={element}
        >
          <div className="image-wrapper">
            <Img
              className="image-1"
              src={contents3.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-2"
              src={contents3.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-3"
              src={contents3.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-4"
              src={contents3.results[0].Images[0].url_fullxfull}
            />
          </div>
        </ImageBox>
      </Section>
      <Section style={{ flexDirection: 'row-reverse' }}>
        <Information>
          <Title>{contents4.results[0].title}</Title>
          <ShopNow onClick={() => shopNowHandler(973951494)}>
            <ShopBagSvg />
            <p>Shop Now</p>
          </ShopNow>
        </Information>
        <ImageBox>
          <div className="image-wrapper">
            <Img
              className="image-1"
              src={contents4.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-2"
              src={contents4.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-3"
              src={contents4.results[0].Images[0].url_fullxfull}
            />
            <Img
              className="image-4"
              src={contents4.results[0].Images[0].url_fullxfull}
            />
          </div>
        </ImageBox>
      </Section>
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  min-height: 95vh;
  background: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
`;

const ImageBox = styled(motion.div)`
  width: 40%;
  padding: 2rem;

  @media only screen and (max-width: 900px) {
    height: 43vh;
    width: 90%;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  flex-direction: column;
  font-size: 120%;
  width: 60%;

  @media only screen and (max-width: 900px) {
    width: 100%;
    margin: 3rem 0;
  }
`;
const Title = styled.div`
  width: 70%;
  height: 20%;
`;

const Section = styled.div`
  width: 100vw;
  height: 45vh;
  padding: 1rem;
  display: flex;

  @media only screen and (max-width: 900px) {
    flex-direction: column !important;
    height: auto;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }
`;

const Img = styled.img`
  object-fit: cover;
  object-position: 50% 30%;
  height: 95%;
  width: 70%;
`;

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShopBagSvg = styled(Bag)`
  width: 3vw;
  height: 3vh;
  margin-right: 1rem;
  transition: 3;
`;

const ShopNow = styled.div`
  width: fit-content;
  display: flex;
  font-weight: bolder;
  padding: 0.3rem 2rem;
  background: rgba(0, 0, 0, 0.12);
  clip-path: polygon(13% 0, 100% 0, 87% 100%, 0 100%);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-1px);
    ${ShopBagSvg} {
      fill: ${(props) => props.theme.colors.third};
    }
    p {
      color: ${(props) => props.theme.colors.third};
    }
  }

  &:active {
    transform: translateY(3px);
  }

  @media only screen and (max-width: 900px) {
    margin-top: 1.5rem;
  }
`;
export default fashion;
