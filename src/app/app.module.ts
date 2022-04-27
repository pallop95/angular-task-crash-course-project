import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TasksV2Component } from './components/tasks-v2/tasks-v2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TasksV2Component, canActivate: [AuthGuard] },
  { path: 'task-2', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    TasksV2Component,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
