import { ObjectId } from "mongodb";

export interface UserDTO {
  _id?: ObjectId;
  email: string;
  password: string;
  createdAt: Date;
}
