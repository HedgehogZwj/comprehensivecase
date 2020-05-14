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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
