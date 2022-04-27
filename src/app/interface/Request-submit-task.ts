import { Assign } from "./Assign";

export interface RequestSubmitTask {
  userId: string;
  taskId: string;
  assign: Assign;
  description: string;
}
