export type AdminLoginCredentials = {
  email: string;
  password: string;
};
export type CustomerLoginCredentials = {
  client_number: string;
};

export type CustomerSlice = {
  client_number: string | null;
  client_name: string | null;
  mobile: string | null;
  email: string | null;
  gender: string | null;
  isLoggedIn: boolean;
};

export type AdminSlice = {
  first_name: string | null
  email: string | null
  embedUrl: string | null
  isLoggedIn: boolean
}

export type Customer = {
  [K in keyof Omit<CustomerSlice, "isLoggedIn">]: string;
};

export type EditProfile = Omit<Customer, 'client_number'>