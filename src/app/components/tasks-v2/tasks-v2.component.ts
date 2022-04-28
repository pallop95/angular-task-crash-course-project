import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestSubmitTask } from 'src/app/interface/Request-submit-task';
import { ResponseLogin } from 'src/app/interface/Response-login';
import { ResponseTask, TaskDetail } from 'src/app/interface/Response-task';
import { TaskV2Service } from 'src/app/services/task-v2.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tasks-v2',
  templateUrl: './tasks-v2.component.html',
  styleUrls: ['./tasks-v2.component.css'],
})
export class TasksV2Component implements OnInit {
  tasks: TaskDetail[] = [];
  roleId: string = '';
  userId: string = '';

  currentSelectedTask: TaskDetail = this.initTaskDetail();

  // export class TableBasicExample {
  displayedColumns: string[] = [
    'taskId',
    'taskName',
    'taskDate',
    'userId',
    'assign',
  ];
  // dataSource = ELEMENT_DATA;
  // }

  constructor(
    private authService: AuthService,
    private tasksV2Service: TaskV2Service,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.roleId = this.authService.getRoleId() ?? '';
    this.userId = this.authService.getUserId() ?? '';

    // setInterval(() => {
    this.getTasks(this.userId, this.roleId);
    // }, 1000);
  }

  initTaskDetail() {
    return {
      taskId: '',
      taskName: '',
      taskDate: '',
      userId: '',
      isAssign: false,
      assign: {
        userIds: []
      }
    }
  }
  displayHello() {
    console.log('Hello');
  }

  getTasks(userId: string, roleId: string) {
    this.tasksV2Service
      .getTaskList({ userId, roleId })
      .subscribe((response) => {
        this.tasks = response.taskList;
      });
  }

  onAssign(taskDetail: TaskDetail) {
    //  console.log('taskDetail => ', taskDetail);
    this.currentSelectedTask = taskDetail;

    this.openDialog(taskDetail);
    // const requestSubmitTask: RequestSubmitTask = {
    //   userId: taskDetail.userId,
    //   taskId: taskDetail.taskId,
    //   assign: taskDetail.assign,
    //   description: 'Test desc',
    // };
    // this.tasksV2Service
    //   .submitAssign(requestSubmitTask)
    //   .subscribe((response) => {
    //     alert(`isSuccess => ${response.isSuccess}`);
    //   });
  }

  submitAssign(users: string[]) {
    // console.log('taskDetail => ', taskDetail);
    const requestSubmitTask: RequestSubmitTask = {
      userId: this.currentSelectedTask.userId,
      taskId: this.currentSelectedTask.taskId,
      assign: this.currentSelectedTask.assign,
      description: 'Test desc',
    };
    this.tasksV2Service
      .submitAssign(requestSubmitTask)
      .subscribe((response) => {
        alert(`isSuccess => ${response.isSuccess}`);
      });

    this.currentSelectedTask = this.initTaskDetail();
  }

  openDialog(taskDetail: TaskDetail) {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // this.dialog.open(DialogComponent, dialogConfig);

    let dialogRef = this.dialog.open(DialogComponent, {
      // data: { name: 'Pallop' },
      data: { ids: taskDetail.assign.userIds },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe((result) => {
        // console.log('Got the data!', result);

        // do something here with the data
        dialogRef.componentInstance.closeDialog();
        dialogSubmitSubscription.unsubscribe();

        if(result.length > 1) {
          this.submitAssign(result);
        } else {
          alert('plss select user(s)!');
        }
      });
  }
}
