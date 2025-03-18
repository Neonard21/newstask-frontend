import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewsItem({ title, image, text, likes, tags, dislikes, id, onDelete }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = () => {
    navigate(`/news/${id}`, {
      state: { article: { id, title, image, text, likes, tags, dislikes } },
    });
  };

  const handleDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

  return (
    <div
      className="row mb-5 border"
      onClick={handleNavigate}
      style={{ cursor: "pointer", position: "relative" }} // position relative for modal overlay
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} alt="news" className="img-fluid h-100" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className="card-title">{title}</p>
            <p className="card-text">{text ? text : "No content available"}.</p>
            <div onClick={(e) => e.stopPropagation()}>
              {/* {tags?.map((tag, index) => (
                <Link
                  key={index}
                  to={`/news/tag/${tag}`}
                  className="badge bg-secondary me-1"
                >
                  {tag}
                </Link>
              ))} */}
             <Link to={`/news/tag/${tags}`} className="badge bg-secondary me-1">{tags}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-5">
        <button
          className="btn btn-danger mt-2 btn-sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent's onClick
            setShowModal(true); // Open the modal
          }}
        >
          Delete
        </button>
      </div>
      {showModal && (
        // Wrap the modal in a container that stops propagation of clicks
        <div
          className="modal show d-block"
          // tabIndex="-1"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          >

          {/* <div
            className="modal-backdrop show"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          ></div>  */}
                 
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                    handleDelete();
                  }}
                ></button>
              </div>
              <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <p>Are you sure you want to delete this news item?</p>
              </div>
              <div
                className="modal-footer"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {/* Modal Backdrop */}
          
        </div>
      )}
    </div>
  );
}

export default NewsItem;
