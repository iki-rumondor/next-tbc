import { Case } from "./case";

export type Result = {
  uuid: string;
  type: string;
  total: number;
  cluster: number;
  created_at: number;
  case: Case
};
