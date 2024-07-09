import { Screen } from "./screen";

export interface Solution {
  id?: string;
  name: string;
  owner: string;
  screens?: Screen[];
}
