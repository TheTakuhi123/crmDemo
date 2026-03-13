export interface DetailDataInterface {
  category?: string;
  state: string;
  role: string;
  name: string;
  imageUrl: string;
  regNumber: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  websiteUrl?: string;
  text: string;
  owner: string;
}