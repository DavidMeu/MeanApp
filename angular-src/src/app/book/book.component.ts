import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { $ } from 'protractor';

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService, private parameter: string) {
    super();
  }

  connect() {
    if (this.parameter == '/search')
      return this.api.getBooks();
    return this.api.getUserBooks();
  }

  disconnect() {
  }
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];

  @Input()
  public parameter: string;

  //dataSource = new BookDataSource(this.api, this.parameter);
  dataSource;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource= new BookDataSource(this.api, this.parameter);
    /*if (this.parameter == '/search')
      this.api.getBooks()
        .subscribe(res => {
          console.log(res);
          this.books = res;
        }, err => {
          console.log(err);
        });
    else if(this.parameter == '/dashboard') {
      //alert('else if(this.parameter == "/dashboard") {')
      this.api.getUserBooks()
        .subscribe(res => {
          console.log(res);
          this.books = res;
        }, err => {
          console.log(err);
        });
    }*/
  }

  getParameter() {
    console.log('parameter: ' + this.parameter);
    return this.parameter;
  }
}
