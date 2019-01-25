import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder,  private _dataService: ApiDataService,) {
    this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      
      avatar: null
    });
  }
  allImageVideo(){
    this._dataService.get("uredi").subscribe(
      data => {
        console.log(data);
      }
    )
  }



  ngOnInit() {
    this.allImageVideo()
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

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
   setTimeout(()=>{    //<<<---    using ()=> syntax
     this.uspeh=false;
 }, 2000);
    
  }
}
