import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestSubmitTask } from '../interface/Request-submit-task';
import { RequestTask } from '../interface/Request-task';
import { ResponseSubmitTask } from '../interface/Response-submit-task';
import { ResponseTask, TaskDetail } from '../interface/Response-task';

@Injectable({
  providedIn: 'root'
})
export class TaskV2Service {
  private apiUrl = 'http://localhost:9001/workflow-service/task'
  // private apiUrlSubmit = 'http://localhost:9001/workflow-service/submit'

  constructor(private http: HttpClient) { }

  getTaskList(requestTask: RequestTask): Observable<ResponseTask> {
    return this.http.post<ResponseTask>(`${this.apiUrl}/get`, requestTask);
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
}
