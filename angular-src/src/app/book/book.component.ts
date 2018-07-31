import { Component, OnInit , Input} from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { $ } from 'protractor';

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getBooks();
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

  dataSource = new BookDataSource(this.api);
  constructor(private api: ApiService) { }

  @Input()
  public parameter: string;

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });

      var param=this.getParameter();
      document.getElementById('addBookButton').addEventListener("click", function(){
        //alert(param);
        alert('element:'+ this.parentElement.localName);
      });
  }

  getParameter() {
    return this.parameter;
  }
}
