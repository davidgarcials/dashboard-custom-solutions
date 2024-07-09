import { Widget } from "./widgets";

export interface Screen {
  id: string;
  name: string;
  widgets?: Widget[];
  description?: string;
}
