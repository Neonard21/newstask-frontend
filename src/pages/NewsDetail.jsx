import React from "react";
import { useLocation, Link } from "react-router-dom";
import LikeButton from "../components/LikeButton";

function NewsDetail() {
  const location = useLocation();
  const { article } = location.state;

  return (
    <div className="container mt-4 mb-4">
      {/* Title in bold */}
      <h1 className="fw-bold mb-4">{article.title}</h1>

      {/* Bigger image */}
      <img
        src={article.image}
        alt={article.title}
        className="img-fluid mb-4"
        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
      />

      {/* Article text */}
      <p className="mb-4">{article.text}</p>

      {/* Row with tags on the left and like/dislike buttons on the right */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {article.tags &&
            article.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/news/tag/${tag}`}
                className="badge bg-secondary me-1"
              >
                {tag}
              </Link>
            ))}
        </div>
        <div>
          <LikeButton
            id={article.id}
            likes={article.likes}
            dislikes={article.dislikes}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
