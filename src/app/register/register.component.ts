import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: Observable<User>;
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  baseUrl = 'http://localhost:8080/';
  ngOnInit(): void {

  }

  constructor(private fb: FormBuilder, private hc: HttpClient, private router: Router, private adService: AdService) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }
  login() {
    this.hc.post(this.baseUrl + 'admin', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        this.adService.login();
        this.router.navigate(['/administrator']);
      }
      else {
        alert('用户名或密码错误');
      }
    })
  }
}
