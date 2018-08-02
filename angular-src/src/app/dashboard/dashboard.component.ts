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
    //this.innerContent=this.route.snapshot.params['id'];
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd) {
        this.innerContent=this.route.snapshot.params['id'];
        //var id2=this.route.snapshot.params['id2'];
        //alert('id: '+neww+ ' id2: '+id2);
      }
    });
   }

  ngOnInit() {
    this.innerContent=this.route.snapshot.params['id'];
    console.log('innerConetnt: '+ this.innerContent);

    /*document.getElementById('test').addEventListener("click", function(){
      document.getElementById('test').innerHTML=x();
    });*/
  }

  getInnerContent() {
    return this.innerContent;
  }
}
