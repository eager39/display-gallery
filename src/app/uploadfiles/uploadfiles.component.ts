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
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder,  private _dataService: ApiDataService,) {
    this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      
      avatar: null
    });
  }



  ngOnInit() {
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
          this.uspeh=data
          console.log(this.uspeh)
         this.loading=false;
         this.clearFile();
      },
      error => {
        console.log(error.statusText);
          this.loading = false;
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
