import React, { useState, useEffect } from "react";
import Trending from "../../components/Trending/Trending";
import AllNews from "../../components/allnews/AllNews";
import MagaZines from "../../components/magazine/MagaZine";
import {
  HomeContainer,
  ContentWrapper,
  NewsSection,
  MagazineSection,
} from "../../pages/Home/Home.styles";
import Loader from "../../../components/loder/Loder";
import Magzines from "../../components/magzinesdata/MagzineNews";
import AllNewsData from "../../components/allnewssection2/AllNewsData";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  

  // Simulate a loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <HomeContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Trending />
          <ContentWrapper>
            <NewsSection>
              {/* <AllNews /> */}
              <Magzines/>
            </NewsSection>
            <MagazineSection>
              {/* <MagaZines /> */}
              <AllNewsData/>
            </MagazineSection>
          </ContentWrapper>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
