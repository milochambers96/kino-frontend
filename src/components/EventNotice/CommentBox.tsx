import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

interface CommentBoxProps {
  eventId: string;
  fetchComments: () => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ eventId, fetchComments }) => {
  const [comment, setComment] = useState("");

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const newCommentContent = targetElement.value;
    setComment(newCommentContent);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    await postComment();
    fetchComments();
  }

  async function postComment() {
    try {
      const token = localStorage.getItem("token");
      const content = comment;
      await axios.post(
        `${baseUrl}/events/${eventId}/comments`,
        {
          content,
          event: eventId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response.data.errors);
    }
  }

  return (
    <section className="section">
      <div className="container box">
        <h2 className="subtitle is-5">Add a Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Post
              </button>
            </div>
            <div className="control">
              <button
                className="button is-light"
                type="button"
                onClick={() => setComment("")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CommentBox;
