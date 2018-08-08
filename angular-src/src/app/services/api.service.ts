import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  //user2:Object;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    /*this.authService.getProfile().subscribe(profile=>{
    this.user2 = profile.user;
  },
  err=>{
    console.log(err);
    return false;
  });
  console.log('_profile: '+this.user2);
    alert('test api service');*/
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getBooks(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    //alert("url: "+url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postBook(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBook(id, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*purchaseBook(id: string): Observable<any> {
    //return this.getBook(id);
    var url = `${apiUrl}/purchase/${id}`;
    var book=this.getBook(id);
    var email,username, user_id='x';
    this.authService.getProfile().subscribe(profile => {
      email = profile.user.email;
      username=profile.user.username;
      user_id=profile.user._id;
      alert('profile: '+username+", "+email+', '+user_id);
    }, err=>{
      console.log(err);
      return false;
    });
    url+='/'+user_id;
    alert('url: '+url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }*/
  purchaseBook(id: string): void {
    //return this.getBook(id);
    var url = `${apiUrl}/purchase/${id}`;
    var book = this.getBook(id);
    var email, username, user_id = 'x';
    this.authService.getProfile().subscribe(profile => {
      email = profile.user.email;
      username = profile.user.username;
      user_id = profile.user._id;
      alert('profile: ' + username + ", " + email + ', ' + user_id);
      url += '/' + user_id;
      alert('url: ' + url);
      this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }, err => {
      console.log(err);
      return false;
    });
  }
}
