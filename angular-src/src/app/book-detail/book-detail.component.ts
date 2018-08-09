import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book = {};
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  @Input()
  public parameter: string;

  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

  deleteBook(id) {
    this.api.deleteBook(id)
      .subscribe(res => {
        this.router.navigate([this.getParameter(), 'book', '']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  purchaseBook(id) {
    this.api.purchaseBook(id)
      .subscribe(res => {
        this.router.navigate(['/dashboard', 'book', '']);
        if(JSON.stringify(res)=='"true"')
          alert('Book has been successfully purchased!');
        else alert('You already own this book!');
      }, (err) => {
        console.log(err);
      });
      //this.router.navigate(['/dashboard', 'book', '']);
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id2']);
  }

  getParameter() {
    console.log('parameter: ' + this.parameter);
    return this.parameter;
  }
}
