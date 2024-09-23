export interface IEvent {
  _id: string;
  title: string;
  location: ILocation;
  image: string;
  description: string;
  specificDate: Date;
  recurringDate: string;
  eventLink: string;
  author: string;
}

export interface ILocation {
  name: string;
  address: string;
  _id: string;
}
