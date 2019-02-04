import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service'
import { environment } from '../../environments/environment';
import { CarouselComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('asd') carousel: any;
  @ViewChild('video') vid: any;
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
  play(){ 
 this.carousel.interval=0
 console.log(this.carousel)
  }
  end(){ 
    this.carousel.interval=5000
    this.vid.nativeElement.load();
    this.carousel.nextSlide()
     }

}
