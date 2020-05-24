import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  current: string;
  baseUrl = "http://localhost:8080/";
  constructor(private authService: AuthService, private hc: HttpClient) {
  }

  ngOnInit(): void {
    this.hc.get(this.baseUrl + 'current').subscribe((val: any) => {
      this.current = val.userName;
    })
  }
  Logout(): void {
    this.authService.logout();
  }

}
