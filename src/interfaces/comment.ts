export interface IComment {
  _id: string;
  content: string;
  event: eventName;
  author: commentAuthor;
  createdAt: string;
}

export interface eventName {
  title: string;
}

export interface commentAuthor {
  username: string;
}
