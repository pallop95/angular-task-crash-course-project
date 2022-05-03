import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  // private number: Number = 0;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;

    this.subject.next(this.showAddTask);
  }

  // toggleNumberNotification(number: Number): void {
  //   this.number = number;
  //   this.subject.next(this.number);
  // }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
