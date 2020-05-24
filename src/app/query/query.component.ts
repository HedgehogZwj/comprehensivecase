import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  currentid: string;
  Web: string;
  RFID: string;
  baseUrl = "http://localhost:8080/";
  constructor(private hc: HttpClient) { }

  ngOnInit(): void {
    this.hc.get(this.baseUrl + 'current').subscribe((val: any) => {
      this.currentid = val.id;
      this.hc.get(this.baseUrl + 'score/' + this.currentid).subscribe((val: any) => {
        this.Web = val[0].Web;
        this.RFID = val[0].RFID;
      })
    })
  }

}
