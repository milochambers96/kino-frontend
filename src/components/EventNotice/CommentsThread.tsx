import { IComment } from "../../interfaces/comment";

function CommentsThread({ content, author, createdAt }: IComment) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        </div>
      </div>
    </article>
  );
}

export default CommentsThread;
