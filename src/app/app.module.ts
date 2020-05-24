import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { HeadComponent } from './head/head.component';
import { UpdateLogComponent } from './update-log/update-log.component';
import { ContactComponent } from './contact/contact.component';
import { ManagementComponent } from './management/management.component';
import { LoginComponent } from './login/login.component';
import { ScoreComponent } from './score/score.component';
import { ExitComponent } from './exit/exit.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EndComponent } from './end/end.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministratorComponent } from './administrator/administrator.component';
import { InfoComponent } from './info/info.component';
import { QueryComponent } from './query/query.component';
import { AdminGuard } from './register.guard';
import { AdService } from './admin.service';

//创建二级路由，登录成功后management的子路由,需要放在一级路由上面
const managementChildRoutes: Routes = [
  { path: 'info', component: InfoComponent },//学生用户信息
  { path: 'query', component: QueryComponent },//学生成绩查询
  { path: '', redirectTo: 'info', pathMatch: 'full' }
];

//创建二级路由，登录成功后admin的子路由,需要放在一级路由上面
const adminChidrenRoutes: Routes = [
  { path: 'student', component: StudentComponent },//学生用户信息管理
  { path: 'score', component: ScoreComponent }, //学生成绩管理
  { path: '', redirectTo: 'student', pathMatch: 'full' }
];

// 创建一级路由
const routes: Routes = [
  { path: 'home', component: HomeComponent },//主页
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'introduce', component: IntroduceComponent },//介绍
  { path: 'update-log', component: UpdateLogComponent },//更新日志
  { path: 'contact', component: ContactComponent },//联系
  { path: 'login', component: LoginComponent },//  <--需修改为学生登录  //学生登录页面
  { path: 'register', component: RegisterComponent },//  <--需修改为管理员登录
  { path: 'management', component: ManagementComponent, children: managementChildRoutes, canActivate: [LoginGuard] },//学生登录界面-学生用户管理
  { path: 'administrator', component: AdministratorComponent, children: adminChidrenRoutes, canActivate: [AdminGuard] }// <--管理员登录界面
];
//学生登录-学生基本信息（可修改）-学生成绩查询（不可修改）
//管理员登录-学生用户管理（可添删查改用户）-学生成绩管理查询（可修改添加）


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroduceComponent,
    HeadComponent,
    UpdateLogComponent,
    ContactComponent,
    ManagementComponent,
    LoginComponent,
    ScoreComponent,
    ExitComponent,
    RegisterComponent,
    StudentComponent,
    EndComponent,
    AdministratorComponent,
    InfoComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // 引入路由模块
  ],
  providers: [LoginGuard, AuthService, AdminGuard, AdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
