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
        const response = await fetch(`http://localhost:8000/news-article/tag/${tag}/`);
        const data = await response.json();
        console.log(data);
        setNews(data);
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
          image={item.url_to_image}
          tags={item.tag}
          likes={item.like}
          text={item.description}
          title={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default NewsByTag;
