import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem.js";
import axios from "axios";
import usePromise from "./lib/usePromise";

const NewListWrapper = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === undefined ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ed6f5b3db1e54374b8ecee25f33b20ad`
    );
  }, [category]);

  if (loading) {
    return <NewListWrapper>대기 중..</NewListWrapper>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewListWrapper>에러 발생!</NewListWrapper>;
  }

  const { articles } = response.data;

  return (
    <NewListWrapper>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewListWrapper>
  );
};

export default NewsList;
