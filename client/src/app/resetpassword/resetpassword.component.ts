import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm : FormGroup;
  token;
  constructor(private route : ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.token=params.id;
      this.checktoken(this.token);
    })
    this.resetForm = new FormGroup({
      'password':new FormControl(null,[Validators.required])
      });
  }

  checktoken(token){
    this.authService.checkToken(token).subscribe(res=>{
      if(res["msg"]!="Valid Token"){
        alert(res["msg"]);
        this.router.navigate([''])
      }
    })
  }

  reset() {
    this.resetForm.value.token=this.token;
    this.authService.resetPassword(this.resetForm.value).subscribe(res=>{
      alert(res["msg"]);
      this.router.navigate([''])
    })
  }
}
