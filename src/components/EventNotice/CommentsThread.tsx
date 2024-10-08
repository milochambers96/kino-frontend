import { IComment } from "../../interfaces/comment";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../config";

interface CommentsThreadProps extends IComment {
  user: string | null;
  eventAuthor?: string;
  fetchComments: () => void;
}

function CommentsThread({
  content,
  author,
  createdAt,
  event,
  _id,
  user,
  fetchComments,
}: CommentsThreadProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(content);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const commentId = _id;
  const eventId = event._id;

  async function deleteComment() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/events/${eventId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (error: unknown) {
      console.log("The error is: ", error);
    }
  }

  async function editComment() {
    try {
      console.log("Attempting to update comment:", editedComment);
      const token = localStorage.getItem("token");
      await axios.put(
        `${baseUrl}/events/${eventId}/comments/${commentId}`,
        {
          content: editedComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      fetchComments();
    } catch (error: unknown) {
      console.error("Error updating comment: ", error);
    }
  }

  return (
    <article className="media ml-5 box kino-grey has-text-white-ter">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{author.username} </strong>
            <small>
              @ {formattedTime} on {formattedDate}
            </small>
            <br />
            {isEditing ? (
              <textarea
                className="textarea"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              ></textarea>
            ) : (
              <span>{content}</span>
            )}
            <br />
          </p>
          {user === author._id && (
            <>
              {isEditing ? (
                <button
                  className="button is-small is-success mt-3"
                  onClick={() => {
                    console.log("Save button clicked");
                    editComment();
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="button is-small is-link mt-3"
                  onClick={() => {
                    console.log("Edit button clicked");
                    setIsEditing(true);
                  }}
                >
                  ✎
                </button>
              )}
              <button
                className="button is-small has-background-danger-20 mt-3 ml-2"
                onClick={deleteComment}
              >
                🆇
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default CommentsThread;
