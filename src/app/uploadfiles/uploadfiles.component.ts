import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import { ApiDataService } from '../api-data.service';


@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.scss']
})
export class UploadfilesComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  uspeh;
  napaka=false;
  images;
  videos;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder,  private _dataService: ApiDataService,) {
    this.createForm();
  }
  image = new FormGroup({
    red: new FormControl(''),
  })
  video = new FormGroup({
    red: new FormControl(''),
  })


  createForm() {
    this.form = this.fb.group({
      
      avatar: null
    });
  }
  allImageVideo(){
    this._dataService.get("uredi").subscribe(
      data => {
        console.log(data);
        this.images=data[0];
        this.videos=data[1];
      }
    )
  }



  ngOnInit() {
    this.allImageVideo()
  }
  deleteImg(id){
    
    this._dataService.add({"id":id},"deleteImg").subscribe(
        (val) => {
        
          
            console.log("POST call successful value returned in body", 
                        val);
                         this.allImageVideo()
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        
        });
  

  }
  deleteVid(id){
    this._dataService.add({"id":id},"deleteVid").subscribe(
        (val) => {
         this.allImageVideo();
          
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        
        });
  

  }
  showhideImg(image){
    if(image.active==0){
      image.active=1;
     }else{
       image.active=0;
     }
     this._dataService.add({"id":image.id,"active":image.active},"showhideImg").subscribe(
      (val) => {
       this.allImageVideo();
        
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      
      });

  }
  showhideVid(video){
    if(video.active==0){
      video.active=1;
     }else{
       video.active=0;
     }
     this._dataService.add({"id":video.id,"active":video.active},"showhideVid").subscribe(
      (val) => {
       this.allImageVideo();
        
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      
      });

  }
  
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: (reader.result as string).split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    this._dataService.add(formModel,"image").subscribe(
      data => {
        
          if(data){
            this.uspeh=true
            this.napaka=false
            this.allImageVideo();
          }else{
            this.napaka=true
          }
          
         this.loading=false;
         this.clearFile();
      },
      error => {
        console.log(error.statusText);
          this.loading = false;
        this.napaka=true;
      });
   
  }
  updateImgRed(id,value){
    console.log(id+" "+value)
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
   setTimeout(()=>{    //<<<---    using ()=> syntax
     this.uspeh=false;
 }, 2000);
    
  }
}
