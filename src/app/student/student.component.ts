import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  users$: Observable<User>;
  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  currentuser: Observable<User>;
  baseUrl = "http://localhost:8080/";
  command: boolean;
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
    this.users$ = <Observable<User>>this.hc.get(this.baseUrl + 'users');
  }
  search() {
    var id = (<HTMLInputElement>document.getElementById('id')).value;
    this.users$ = <Observable<User>>this.hc.get(this.baseUrl + 'users/' + id);
  }
  update(id: string) {
    this.open();
    this.currentuser = <Observable<User>>this.hc.get(this.baseUrl + 'users/' + id);
    this.currentuser.forEach(element => {
      this.myForm.controls['id'].setValue(id);
      this.myForm.controls['userName'].setValue(element[0].userName);
      this.myForm.controls['password'].setValue(element[0].password);
    });
  }
  add() {
    if (this.command) {
      this.hc.post(this.baseUrl + 'user', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          this.close();
          this.ngOnInit();
          this.command = false;
        }
        else {
          alert('学号信息重复，请重新输入');
        }
      })
    }
    else {
      this.hc.put(this.baseUrl + 'user', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          this.close();
          this.ngOnInit();
          this.command = false;
        }
        else {
          alert('学号信息重复，请重新输入');
        }
      })
    }
  }
  adduser() {
    this.command = true;
    this.open();
    this.myForm.controls['id'].setValue('');
    this.myForm.controls['userName'].setValue('');
    this.myForm.controls['password'].setValue('');
  }
  open() {
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page';
  }
  close() {
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page';
    pages[1].className = 'page hide';
    this.command = false;
  }
  delete(id: string) {
    this.hc.delete(this.baseUrl + 'user/' + id).subscribe((val: any) => {
      this.ngOnInit();
    })
    this.hc.delete(this.baseUrl + 'score/' + id).subscribe((val: any) => {
    })
  }
}
