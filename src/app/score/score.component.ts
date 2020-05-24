import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  users$: Observable<User>;
  myForm: FormGroup;
  id: AbstractControl;
  Web: AbstractControl;
  RFID: AbstractControl;
  currentuser: Observable<User>;
  baseUrl = "http://localhost:8080/";
  command: boolean;
  constructor(private fb: FormBuilder, private hc: HttpClient) {
    this.myForm = this.fb.group(
      {
        'id': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'Web': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'RFID': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      }
    );
    this.id = this.myForm.controls['id'];
    this.Web = this.myForm.controls['Web'];
    this.RFID = this.myForm.controls['RFID'];
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.hc.get(this.baseUrl + 'score');
  }
  search() {
    var id = (<HTMLInputElement>document.getElementById('id')).value;
    this.users$ = <Observable<User>>this.hc.get(this.baseUrl + 'score/' + id);
  }
  update(id: string) {
    this.open();
    this.currentuser = <Observable<User>>this.hc.get(this.baseUrl + 'score/' + id);
    this.currentuser.forEach(element => {
      this.myForm.controls['id'].setValue(id);
      this.myForm.controls['Web'].setValue(element[0].Web);
      this.myForm.controls['RFID'].setValue(element[0].RFID);
    });
  }
  add() {
    if (this.command) {
      this.hc.post(this.baseUrl + 'userid', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          this.hc.post(this.baseUrl + 'score', this.myForm.value).subscribe((val2: any) => {
            if (val2.succ) {
              this.close();
              this.ngOnInit();
              this.command = false;
            }
            else {
              alert('学号信息重复，请重新输入');
            }
          });
        }
        else {
          alert('无此学生信息，无法添加成绩');
        }
      })
    }
    else {
      this.hc.put(this.baseUrl + 'score', this.myForm.value).subscribe((val: any) => {
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
    this.myForm.controls['Web'].setValue('');
    this.myForm.controls['RFID'].setValue('');
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
    this.hc.delete(this.baseUrl + 'score/' + id).subscribe((val: any) => {
      this.ngOnInit();
    })
  }
}
