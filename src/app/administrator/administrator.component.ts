import { Component, OnInit } from '@angular/core';
import { AdService } from '../admin.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private adService: AdService) { }

  ngOnInit(): void {
  }
  Logout(): void {
    this.adService.logout();
  }

}
