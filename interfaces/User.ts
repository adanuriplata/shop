export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;

  createDeflate?: string;
  updatedAt?: string;
}