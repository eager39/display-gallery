import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slike=[];
  constructor(
    private _dataService: ApiDataService,
    private auth:AuthService,

   
    ) {
     
     }
     
    
  data;
  user;

  ngOnInit() {
   
  this.userData()  
 
 //this.user=this.auth.currentUserValue;

  }

  async userData() {
    this.data =await this._dataService.get("data").toPromise()
    console.log(this.data.slika)
  }
 
  logout(){
    this.auth.logout();
  }

}
