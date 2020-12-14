import React from "react";
import NewsList from "./NewsList";
import Categories from "./Categories";
import { useParams } from "react-router-dom";

function NewsPage() {
  const { category } = useParams() || { category: "all" };

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
}

export default NewsPage;
