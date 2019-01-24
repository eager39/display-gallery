import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(
    private _dataService: ApiDataService,
    private auth:AuthService,
    config: NgbCarouselConfig
   
    ) {
      config.interval = 5000;
      config.wrap = true;
      config.keyboard = false;
      config.pauseOnHover = false;
     }
  data;
  user;
  ngOnInit() {
  //this.userData()  
 
 //this.user=this.auth.currentUserValue;

  }

  async userData() {
    this.data =await this._dataService.get("data").toPromise()
    console.log(this.data)
  }
 
  logout(){
    this.auth.logout();
  }

}
