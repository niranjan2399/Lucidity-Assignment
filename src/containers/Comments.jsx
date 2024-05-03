import React, { useEffect, useState } from "react";
import CommentBox from "../components/Comments/CommentBox";
import Comment from "../components/Comments/Comment";

const Comments = () => {
  const [comments, setComments] = useState({});

  const postCallback = (commentData) => {
    const existingComments =
      JSON.parse(window.localStorage.getItem("comments")) || [];
    window.localStorage.setItem(
      "comments",
      JSON.stringify([...existingComments, commentData])
    );
  };

  useEffect(() => {
    const savedComments = window.localStorage.getItem("comments");
    setComments(savedComments);
  }, []);

  return (
    <div className="cc-container">
      <div className="cc">
        <CommentBox postCallback={postCallback} />
        <div>
          <div>Sort By: Date and Time</div>
        </div>
        <div>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Comments;
