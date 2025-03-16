import React from "react";
import { useState, useEffect } from "react";
import NewsItem from "../components/NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreNews = async () => {
    try {
      const response = await fetch("http://localhost:8000/news-article/");
      const data = await response.json();
      console.log(data);
      
      setNews((prevNews) => [...prevNews, ...data]);
      setPage(page + 1);
      if (data && data.length > 0) {
        // Append the new items to the current news list.
        setNews((prevNews) => [...prevNews, ...data]);
        setPage(page + 1);
      } else {
        // If no more data is available, stop further fetches.
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
  };
  useEffect(() => {
    loadMoreNews();
  }, []);

  const handleDeleteNewsItem = (id) => {
    setNews((prevNews) => prevNews.filter((item) => item.id !== id));
  };

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={loadMoreNews}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p>
          <b>No More News</b>
        </p>
      }
      className="container"
    >
      <h1>Latest news</h1>
      {/* {console.log("news", news)} */}
      {news.map((item, index) => (
        <NewsItem
          key={index}
          image={item.url_to_image}
          tags={item.tag}
          likes={item.likes}
          dislikes={item.dislikes}
          text={item.description}
          title={item.title}
          id={item.id}
          onDelete={handleDeleteNewsItem}
        />
      ))}
    </InfiniteScroll>
  );
}

export default Home;
