import { IComment } from "../../interfaces/comment";
import axios from "axios";

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
  eventAuthor,
  fetchComments,
}: CommentsThreadProps) {
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
      await axios.delete(
        `http://localhost:8000/api/events/${eventId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("The error is: ", error);
    }
  }

  return (
    <article className="media ml-5 box">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{author.username} </strong>
            <small>
              @ {formattedTime} on {formattedDate}
            </small>
            <br />
            {content}
            <br />
          </p>
          {(user === author._id || user === eventAuthor) && (
            <button
              className="button is-small is-danger mt-3"
              onClick={deleteComment}
            >
              🆇
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CommentsThread;
