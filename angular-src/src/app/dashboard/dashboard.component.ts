import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  innerContent: string;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd) {
        this.innerContent=this.route.snapshot.params['id'];
      }
    });
   }

  ngOnInit() {
    this.innerContent=this.route.snapshot.params['id'];
    console.log('innerConetnt: '+ this.innerContent);
  }

  getInnerContent() {
    return this.innerContent;
  }
}
