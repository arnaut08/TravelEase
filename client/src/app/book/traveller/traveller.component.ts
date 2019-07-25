import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

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
  amount;
  finalAmount;
  token;

  constructor(private http: HttpClient,private route:ActivatedRoute
    , public router: Router, private bookingService: BookingService
    ,private authService:AuthService ) { }

  ngOnInit() {

    this.route.params.subscribe(param=>{
      this.id = param.id;
      this.bookingService.getPrice(this.id).subscribe(response=>{
        this.amount=response['price'];
        this.finalAmount=this.amount;
      })
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
    this.finalAmount=this.travellers.length*this.amount;
  }

  counter(){
    this.count+=1;
    this.createForm();
    console.log(this.finalAmount)
  }

  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_AlrZ9BcgCFWr3yl6YNfhUoEc00sRf0ZigF',
      locale: 'auto',
      token: function (token) {
        getToken(token.id)      
      }
    });
    
    handler.open({
      name: 'TravelEase',
      description: 'Bus Tickets',
      amount: this.finalAmount/0.69
    });

    const getToken = (token)=>{
      this.token=token;
      console.log(this.token);
      this.pay()
    }

  }
  
  pay(){
    const count=this.travellers.length;
    const bookedBus=this.id;
    const email = this.authService.user.value.email;
    this.http.post("http://localhost:3000/payment",{email:email, token:this.token
    , amount: this.finalAmount/0.69 })
    .subscribe(resp=>{
      const payment=resp['payment'];
      console.log(this.travellerform.value)
      this.http.post("http://localhost:3000/book",{values:Object.values(this.travellerform.value),
      count:count, bookedBus:bookedBus, email:email, payment:payment}).subscribe(resp=>{
        console.log(resp)
      });
    });
    alert("Payment Successful")
    this.router.navigate(['']);
  }
  
}
