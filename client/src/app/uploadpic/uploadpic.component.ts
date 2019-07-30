import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadpic',
  templateUrl: './uploadpic.component.html',
  styleUrls: ['./uploadpic.component.css']
})
export class UploadpicComponent implements OnInit {
  file;  
  uploadPic : FormGroup;
  
  constructor(private profileService : ProfileService, private router : Router) { }

  ngOnInit() {
    this.uploadPic = new FormGroup({
      'avatar':new FormControl(null,[Validators.required]),
     });
  }

  getFile(event){
    this.file = event.target.files[0];
    // console.log(this.file);
  }

  submit(){
    const formData = new FormData();
    formData.append("avatar",this.file,this.file.name)
    this.profileService.uploadPic(formData).subscribe(res=>{
      alert(res["msg"]);
      this.router.navigate(['/profile']);
    })
  }
}
