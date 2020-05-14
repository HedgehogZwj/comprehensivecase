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


//创建二级路由，登录成功后management的子路由,需要放在一级路由上面
const managementChildRoutes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'exit', component: ExitComponent },
  { path: '', redirectTo: 'student', pathMatch: 'full' }
];

// 创建一级路由
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'introduce', component: IntroduceComponent },
  { path: 'update-log', component: UpdateLogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'management', component: ManagementComponent, children: managementChildRoutes }
];



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
    StudentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // 引入路由模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
