import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';
import { GalleryItem, ImageItem, VideoItem } from '@ngx-gallery/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _dataService: ApiDataService,
    private auth:AuthService,
    config: NgbCarouselConfig,
    private gallery: Gallery
   
    ) {
     
     }
     galleryId = 'mixedExample';
  data;
  user;

  ngOnInit() {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    
    galleryRef.addImage({
      src: 'slika.jpg',
     
    });

    galleryRef.addVideo({
      src: 'test.mp4',
     
    });
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
