import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestSubmitTask } from 'src/app/interface/Request-submit-task';
import { ResponseLogin } from 'src/app/interface/Response-login';
import { ResponseTask, TaskDetail } from 'src/app/interface/Response-task';
import { TaskV2Service } from 'src/app/services/task-v2.service';

@Component({
  selector: 'app-tasks-v2',
  templateUrl: './tasks-v2.component.html',
  styleUrls: ['./tasks-v2.component.css']
})
export class TasksV2Component implements OnInit {

  tasks: TaskDetail[] = [];
  roleId: string = '';
  userId: string = '';

  // export class TableBasicExample {
  displayedColumns: string[] = ['taskId', 'taskName', 'taskDate', 'userId', 'assign'];
  // dataSource = ELEMENT_DATA;
  // }

  constructor(
    private authService: AuthService,
    private tasksV2Service: TaskV2Service,
  ) { }

  ngOnInit(): void {
    this.roleId = this.authService.getRoleId() ?? '';
    this.userId = this.authService.getUserId() ?? '';

    setInterval(() => {
      this.getTasks(this.userId, this.roleId);
    }, 1000);
  }

  displayHello() {
    console.log('Hello');
  }

  getTasks(userId: string, roleId: string) {
    this.tasksV2Service.getTaskList({ userId, roleId }).subscribe(response => {

      this.tasks = response.taskList;
    });
  }

  onAssign(taskDetail: TaskDetail) {
    //  console.log('taskDetail => ', taskDetail);
    const requestSubmitTask: RequestSubmitTask = {
      taskId: taskDetail.taskId,
      assign: taskDetail.assign,
      description: 'Test desc'
    };
    this.tasksV2Service.submitAssign(requestSubmitTask).subscribe(response => {
      alert(`isSuccess => ${response.isSuccess}`);
    });
  }
}
