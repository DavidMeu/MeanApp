import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router) {}

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(async data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this._flashMessagesService.show('You are logged in', {cssClass: 'alert-success', timeout: 5000});
          await this.getNewUserId();
          this.router.navigate(['/search', 'book', '']);
        } else {
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
        }
    });
  }

  async getNewUserId() {
    await this.authService.getProfile().subscribe(profile => {
      ApiService.user=profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }
}
