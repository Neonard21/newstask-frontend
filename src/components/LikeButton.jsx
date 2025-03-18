import React, { useState } from "react";
import "./like.css";

const LikeButton = ({ likes, dislikes, id }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [DislikeCount, setDislikeCount] = useState(likes);
  const [activeBtn, setactiveBtn] = useState("none");

  const handleReaction = async (reaction) => {
    const resp = await fetch(`http://localhost:8000/news-article/likes/${id}/`, {
      'method': 'PUT',
      'headers': {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'K62QAXCMAQ0LCniyI3DUP0HQa2ilHOMo'
      },
    });
    const data = await resp.json();
    console.log(data);
    setLikeCount(data.likes);

    if (activeBtn === "none") {
      if (reaction === "like") {
        setLikeCount(likeCount + 1);
        setactiveBtn("like");
      } else if (reaction === "dislike") {
        setDislikeCount(DislikeCount + 1);
        setactiveBtn("dislike");
      }
    } else if (activeBtn === reaction) {
      if (reaction === "like") {
        setLikeCount(likeCount - 1);
      } else if (reaction === "dislike") {
        setDislikeCount(DislikeCount - 1);
      }
      setactiveBtn("none");
    } else if (activeBtn !== reaction) {
      if (reaction === "like") {
        setLikeCount(likeCount + 1);
        setDislikeCount(DislikeCount - 1);
        setactiveBtn("like");
      } else if (reaction === "dislike") {
        setDislikeCount(DislikeCount + 1);
        setLikeCount(likeCount - 1);
        setactiveBtn("dislike");
      }
    }
  };

  return (
    <div className="btn-container ">
      <button
        onClick={() => {
          handleReaction("like");
        }}
        className={`${activeBtn === "like" ? "like-active" : ""}`}
      >
        <span>👍</span>
        Like {likeCount}
      </button>
      <button
        onClick={() => {
          handleReaction("dislike");
        }}
        className={`${activeBtn === "dislike" ? "dislike-active" : ""}`}
      >
        <span>👎</span>
        Dislike
      </button>
    </div>
  );
};

export default LikeButton;
