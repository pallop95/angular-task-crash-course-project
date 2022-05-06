import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskDetail } from '../interface/Response-task';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<any>();
  private subjectTaskDetails = new Subject<any>();

  private number: Number = 0;
  private taskDetails: TaskDetail[] = [];

  constructor() { }

  toggleNumberNotification(number: Number): void {
    console.log('toggleNumberNotification => ', number);
    this.number = number;
    this.subject.next(this.number);
  }

  onToggleNumberNotification(): Observable<any> {
    return this.subject.asObservable();
  }

  toggleTaskDetails(taskDetails: TaskDetail[]): void {
    this.taskDetails = taskDetails;
    this.subjectTaskDetails.next(this.taskDetails);
  }

  onUpdateTaskDetails(): Observable<any> {
    return this.subjectTaskDetails.asObservable();
  }
}
