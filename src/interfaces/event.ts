export interface IEvent {
  _id: string;
  title: string;
  location: ILocation;
  image: string;
  description: string;
  specificStartDate: Date;
  specificEndDate: Date;
  recurringDate: string;
  eventDateType: "specific" | "recurring";
  eventLink: string;
  author: EventAuthor;
  createdAt: string;
}

export interface ILocation {
  name: string;
  address: string;
  owner: string;
  _id: string;
}

export interface EventAuthor {
  _id: string;
  username: string;
}
