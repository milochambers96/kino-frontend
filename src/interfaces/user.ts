export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "Cinema" | "Film Fanatic";
}
