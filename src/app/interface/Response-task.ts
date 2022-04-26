import { Assign } from "./Assign";

export interface ResponseTask {
  isSuccess: boolean;
  taskDetail: TaskDetail;
  assign: Assign;
}

export interface TaskDetail {
  taskId: string;
  taskName: string;
  taskDate: string;
}
