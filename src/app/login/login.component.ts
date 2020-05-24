import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//学生登录界面
export class LoginComponent implements OnInit {
  users: Observable<User>;
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  baseUrl = 'http://localhost:8080/';
  ngOnInit(): void {

  }

  constructor(private fb: FormBuilder, private hc: HttpClient, private router: Router, private authService: AuthService) {
    this.myForm = this.fb.group(
      {
        'id': [''],
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }
  login() {
    this.hc.post(this.baseUrl + 'users', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        this.hc.get(this.baseUrl + 'usersName/' + this.userName.value).subscribe((val: any) => {
          this.myForm.value.id = val[0].id;
          this.hc.post(this.baseUrl + 'current', this.myForm.value).subscribe((val: any) => {
            if (val.succ) {
              this.authService.login();
              this.router.navigate(['/management']);
            }
          });
        })
      }
      else {
        alert('用户名或密码错误');
      }
    })
  }
}
