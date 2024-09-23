export interface ICinema {
  _id: string;
  name: string;
  bio: string;
  address: string;
  area: "North" | "East" | "South" | "West" | "Central";
  image: string;
  website: string;
  yearEst: number;
  screens: number;
  capacity: number;
  owner: string;
}
