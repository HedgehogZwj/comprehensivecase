import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  users$: Observable<User>;
  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  baseUrl = "http://localhost:8080/";
  currentuser: Observable<User>;
  constructor(private fb: FormBuilder, private hc: HttpClient) {
    this.myForm = this.fb.group(
      {
        'id': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      }
    );
    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.hc.get(this.baseUrl + 'current').subscribe((val: any) => {
      this.currentuser = <Observable<User>>this.hc.get(this.baseUrl + 'users/' + val.id);
      this.currentuser.forEach(element => {
        console.log(element);
        this.myForm.controls['id'].setValue(element[0].id);
        this.myForm.controls['userName'].setValue(element[0].userName);
        this.myForm.controls['password'].setValue(element[0].password);
      });
    })
  }
  update() {
    this.hc.put(this.baseUrl + 'user', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        this.ngOnInit();
        alert('修改成功')
      }
      else {
        alert('学号信息重复，请重新输入');
      }
    })
  }

}
