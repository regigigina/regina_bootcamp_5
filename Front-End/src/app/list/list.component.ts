import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  collection = [];
  
  constructor(private http : Http, private route : Router ){}

  ngOnInit() {
    this.Load();
  }

  Load(){
    this.http.get("http://localhost:3000/show")
    .subscribe(
      result => {
        this.collection = result.json();
      },
      error => {
        
      }
    );
  }

  Cat(category){

    let header = new Headers();
    let options = new RequestOptions({ headers : header });

    this.http.get("http://localhost:3000/category?cat=" + category, options)
    .subscribe(
      result => {
        this.collection = result.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  oneItem(){
    var oneID = (document.getElementById('itemID')).toString();
    // var string = '' + oneID;
    var string = '1516851026042';

    sessionStorage.setItem("id", string);

    this.route.navigate(['/detail']);

  }

  

}
