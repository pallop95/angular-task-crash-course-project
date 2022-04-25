import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../interface/Task';
import { faTimes, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task = {
    text: '',
    day: '',
    reminder: false
  };
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder : EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task: Task) {
    // console.log('123 ', task)
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
