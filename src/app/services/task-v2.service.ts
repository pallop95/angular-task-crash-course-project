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
  private apiUrl = 'http://localhost:5001/task'
  private apiUrlSubmit = 'http://localhost:5001/submit'

  constructor(private http: HttpClient) { }

  getTaskList(requestTask: RequestTask): Observable<ResponseTask> {
    return this.http.get<ResponseTask>(this.apiUrl);
  }

  // {
  //   "assign" : {
  //     "userIds" : ["1234","5678"]
  //   },
  //   "description" : "test assign"
  // }
  submitAssign(requestSubmitTask: RequestSubmitTask): Observable<ResponseSubmitTask> {
    // console.log()
    return this.http.get<ResponseTask>(this.apiUrlSubmit);
  }
}
