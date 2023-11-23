export interface resultResponseGroup {
  status: number;
  discussion: [];
}
export interface Discuss {
  _id: string;
  title: string;
  content: string;
  group: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
}
export type SuccessApi<Data> = {
  message: string;
  data: Data;
};
interface Customer {
  _id: string;
  email: string;
  password: string;
  avatar: string;
  follow: never[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  experience: number;
  group: string[];
  type: string;
}
