import { Assign } from "./Assign";

export interface RequestSubmitTask {
  taskId: string;
  assign: Assign;
  description: string;
}
