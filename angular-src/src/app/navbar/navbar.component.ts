import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //apiService:ApiService;
  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      //this.apiService.user = profile.user;
      ApiService.user=profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onLogoutClick() {
    this.authService.logout();
    this._flashMessagesService.show('you are logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
    return false;
  }

}
