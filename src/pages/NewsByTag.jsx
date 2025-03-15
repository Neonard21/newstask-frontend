import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewsItem from "../components/NewsItem";

const NewsByTag = () => {
  const { tag } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsByTag = async () => {
      try {
        const response = await fetch("/news.json");
        const data = await response.json();
        const filteredData = data.news.filter((news) =>
          news.tags.includes(tag)
        );
        setNews(filteredData);
        // console.log(filteredData);
      } catch (error) {
        console.error("Error fetching news by tag:", error);
      }
    };
    fetchNewsByTag();
  }, [tag]);

  return (
    <div>
      <h1>News: {tag}</h1>
      {news.map((item, index) => (
        <NewsItem
          key={index}
          image={item.image}
          tags={item.tags}
          likes={item.like}
          text={item.text}
          title={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default NewsByTag;
