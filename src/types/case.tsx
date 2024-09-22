import { HealthCenter } from "./health_center";

export type Case = {
  uuid: string;
  year: string;
  children_count: number;
  adults_count: number;
  male_count: number;
  female_count: number;
  total: number;
  created_at: number;
  health_center: HealthCenter;
};
