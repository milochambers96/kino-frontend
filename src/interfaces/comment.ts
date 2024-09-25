export interface IComment {
  _id: string;
  content: string;
  event: eventDetails;
  author: commentAuthor;
  createdAt: string;
}

export interface eventDetails {
  title: string;
  _id: string;
}

export interface commentAuthor {
  username: string;
  _id: string;
}
