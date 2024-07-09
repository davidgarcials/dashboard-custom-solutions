import { ObjectId } from "mongodb";
import { Screen } from "../screen";

export interface SolutionDTO {
  _id?: ObjectId;
  name: string;
  owner: string;
  screens?: Screen[];
  createdAt: Date;
}
