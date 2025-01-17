import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;
  isbn = '';
  title = '';
  description = '';
  author = '';
  publisher = '';
  published_year = '';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  @Input()
  public parameter: string;

  onFormSubmit(form: NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate([this.getParameter(), 'book-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'published_year' : [null, Validators.required]
    });
  }

  getParameter() {
    console.log('parameter: '+this.parameter);
    return this.parameter;
  }
}
