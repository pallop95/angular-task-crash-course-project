import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestSubmitTask } from '../interface/Request-submit-task';
import { RequestTask } from '../interface/Request-task';
import { RequestUpdateTaskStatus } from '../interface/Request-update-task-status';
import { ResponseSubmitTask } from '../interface/Response-submit-task';
import { ResponseTask, TaskDetail } from '../interface/Response-task';

@Injectable({
  providedIn: 'root'
})
export class TaskV2Service {
  private apiUrl = 'http://localhost:9000/workflow-service/task'
  private apiUrlMock = 'http://localhost:5001/task'
  // private apiUrlSubmit = 'http://localhost:9000/workflow-service/submit'

  constructor(private http: HttpClient) { }

  getTaskList(requestTask: RequestTask): Observable<ResponseTask> {
    return this.http.post<ResponseTask>(`${this.apiUrl}/get`, requestTask);
    // return this.http.get<ResponseTask>(`${this.apiUrlMock}`);
  }

  // {
  //   "assign" : {
  //     "userIds" : ["1234","5678"]
  //   },
  //   "description" : "test assign"
  // }
  submitAssign(requestSubmitTask: RequestSubmitTask): Observable<ResponseSubmitTask> {
    // console.log()
    return this.http.post<ResponseTask>(`${this.apiUrl}/submit`, requestSubmitTask);
  }

  updateTask(taskDetail: TaskDetail): Observable<TaskDetail> {
    const url = `${this.apiUrlMock}/taskList/${taskDetail.taskId}`;
    return this.http.put<TaskDetail>(url, taskDetail);
  }

  updateTaskStatus(requestUpdateTaskStatus: RequestUpdateTaskStatus): Observable<TaskDetail> {
    // const url = `${this.apiUrlMock}/taskList/${taskDetail.taskId}`;
    // return this.http.put<TaskDetail>(url, taskDetail);
    const url = `${this.apiUrl}/update-status-read`;
    return this.http.post<TaskDetail>(url, requestUpdateTaskStatus);
  }
}
