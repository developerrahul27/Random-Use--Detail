export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface ApiUser {
  name: UserName;
  email: string;
  location: Location;
}

export interface ApiResponse {
  results: ApiUser[];
}

export interface DisplayUser {
  fullName: string;
  email: string;
  location: string;
}
