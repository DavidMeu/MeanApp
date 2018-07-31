import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
   }

  ngOnInit() {
    this.innerContent=this.route.snapshot.params['id'];
    alert('innerConetnt: '+ this.innerContent);
    console.log('innerConetnt: '+ this.innerContent);

    var x=this.getInnerContent();
    document.getElementById('test').addEventListener("click", function(){
      document.getElementById('test').innerHTML=x;
    });
  }

  getInnerContent() {
    return this.innerContent;
  }
}
