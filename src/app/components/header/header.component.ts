import { Component, OnInit } from '@angular/core';

import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskDetail } from 'src/app/interface/Response-task';
import { TaskService } from 'src/app/services/task.service';
import { TaskV2Service } from 'src/app/services/task-v2.service';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestUpdateTaskStatus } from '../../interface/Request-update-task-status';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: String = 'Task tracker';
  subscription: Subscription;
  notiSubscription: Subscription;
  taskDetailsSubscription: Subscription;
  roleId: string = '';
  userId: string = '';

  number = 0;
  showAddTask: boolean = false;
  taskDetailList: TaskDetail[] = []

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private router: Router,
    private notificationService: NotificationService,
    private taskV2Service: TaskV2Service
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    this.notiSubscription = this.notificationService
      .onToggleNumberNotification()
      .subscribe((value) => (this.number = value));
    this.taskDetailsSubscription = this.notificationService
      .onUpdateTaskDetails()
      .subscribe(v => {
        // console.log('taskDetails header =>', v);
        this.taskDetailList = v;
      })
  }

  ngOnInit(): void {
    this.roleId = this.authService.getRoleId() ?? '';
    this.userId = this.authService.getUserId() ?? '';
  }

  toggleAddTask() {
    // console.log('toggleAddTask')
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  onClickTask(taskDetail: TaskDetail) {
    if(taskDetail.status === 'READ') {
      // TODO: maybe get more information by id
      return;
    }

    // updateTask status
    // taskDetail.status = 'READ'
    const requestUpdateTaskStatus: RequestUpdateTaskStatus = {
      userId: taskDetail.userId,
      taskId: taskDetail.taskId,
      roleId: this.roleId
    } 
    this.taskV2Service.updateTaskStatus(requestUpdateTaskStatus).subscribe(() => {});
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.notiSubscription.unsubscribe();
    this.taskDetailsSubscription.unsubscribe();
  }
}
