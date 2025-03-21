import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavContainer, NewsTicker, NewsItem, NewsWrapper } from "../navbar/NavBar.styles";
import { NewsApi } from "../../services/categoryapi/CategoryApi";
import { FontSizeContext } from "../../context/FontSizeProvider";
import { LanguageContext } from "../../context/LanguageContext";

const NavBar = () => {
  const [headlines, setHeadlines] = useState([]);
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await NewsApi();
        if (data?.data && Array.isArray(data.data)) {
          const localizedHeadlines = data.data.map((article) => getLocalizedContent(article, "title"));
          setHeadlines(localizedHeadlines);
        } else {
          setHeadlines([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language]);

  const getLocalizedContent = (article, field) => {
    if (language === "English") {
      return article[field] || "No content available";
    } else if (language === "Hindi") {
      return article.hindi?.[field] || article[field] || "No content available";
    } else if (language === "Kannada") {
      return article.kannada?.[field] || article[field] || "No content available";
    }
    return article[field] || "No content available";
  };

  return (
    <NavContainer style={{ fontSize: `${fontSize}%` }}>
      <NewsWrapper>
        <NewsTicker style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
          {headlines.map((headline, index) => (
            <NewsItem
              style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
              key={index}
            >
              {headline}
            </NewsItem>
          ))}
        </NewsTicker>
      </NewsWrapper>
    </NavContainer>
  );
};

export default NavBar;