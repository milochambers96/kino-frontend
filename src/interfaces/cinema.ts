export interface ICinema {
  _id: string;
  name: string;
  bio: string;
  address: string;
  buildingNo: string;
  street: string;
  city: "London";
  postcode: string;
  area: "North" | "East" | "South" | "West" | "Central";
  borough: string;
  image: string;
  website: string;
  yearEst: number;
  screens: number;
  capacity: number;
  owner: string;
}
