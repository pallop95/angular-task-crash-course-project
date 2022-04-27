import { Assign } from "./Assign";

export interface ResponseTask {
  isSuccess: boolean;
  // taskDetail: TaskDetail;
  // assign: Assign;
  taskList: TaskDetail[]
}

export interface TaskDetail {
  taskId: string;
  taskName: string;
  taskDate: string;
  userId: string;
  isAssign: boolean;
  assign: Assign;
}
