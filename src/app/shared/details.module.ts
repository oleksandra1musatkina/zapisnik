export interface Details {
  data: string;
  date: string;
  uid: string;
  imageName: string;
}

export interface DetailsId extends Details {
  id: string;
}