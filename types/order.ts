export type orderProps = {
  _id: string;
  _type: string;
  total: number;
  vendor: {
    name: string;
    image: string;
    address: {
      street: string;
      city: string;
      province: string;
      postal_code: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };
  user: {
    user_firstname: string;
  };
  _createdAt: string;
};
