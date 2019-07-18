import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit{
  id;
  count=2;
  travellerform: FormGroup;
  travellers;

  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.id = param.id;
    })
    this.createForm();
  }

  createForm(){
    const travellers = {};
    for(let i = 1; i < this.count; i++){
      travellers[`traveller${i}`] = new FormControl(null,[Validators.required]);
    }
    this.travellerform = new FormGroup(travellers);
    this.travellers=Object.keys(travellers);
  }

  counter(){
    this.count+=1;
    this.createForm();
  }

  book(){
    console.log(Object.keys(this.travellerform.value).length);
    this.router.navigate(['book/'+this.id+'/payment'])
  }
}
