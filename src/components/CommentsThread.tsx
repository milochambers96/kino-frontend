import { IComment } from "../interfaces/comment";

function CommentsThread({ content, author, createdAt }: IComment) {
  return (
    <article className="media ml-5">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{author.username}</strong>
            <small> on {createdAt}</small>
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
