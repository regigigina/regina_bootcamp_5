import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  item = {};

  constructor(private http : Http, private route : Router ){}

  ngOnInit() {
    // var id = 1516851026042;
    var id = sessionStorage.getItem("id");
    this.Detail(id);
  }

  Detail(id){

    let header = new Headers();
    let options = new RequestOptions({ headers : header });

    this.http.get("http://localhost:3000/detail?id=" + id, options)
    .subscribe(
      result => {
        this.item = result.json();
      },
      error => {
        
      }
    );
  }

}
