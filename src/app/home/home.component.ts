import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service'
import { environment } from '../../environments/environment';

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
      private actionUrl: string=environment.baseUrl
    
  data;
  user;
     apiurl;
  ngOnInit() {
   this.apiurl=this.actionUrl
  this.userData()  
 
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
