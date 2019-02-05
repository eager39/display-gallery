import { Component, OnInit,ViewChild,ViewChildren } from '@angular/core';
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
  @ViewChild("video") vid:any
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
  ngAfterViewInit(){
   // if( this.carousel.slides[this.carousel.activeSlide].el.nativeElement.children[0].className.includes("video")){
        
   //   let elem = <HTMLVideoElement> document.getElementById(this.carousel.activeSlide)
   //   elem.play()
  //  }
  console.log(this.carousel.slides)
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
 
  }
  end(name){ 
    this.carousel.interval=1000
    name.load()
    this.carousel.nextSlide()
  
     }
     change(item){
      //console.log(item.activeSlide)
      if( item.slides[item.activeSlide].el.nativeElement.children[0].className.includes("video")){
        
        let elem = <HTMLVideoElement> document.getElementById(item.activeSlide)
        elem.play()
        
      }else{
        
      }
     }

}
