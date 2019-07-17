import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  searchedBuses;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private route:ActivatedRoute, private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      const url = `http://localhost:3000/search?source=${params.source}&destination=${params.destination}&date=${params.date}&category=${params.busCategory}`;
      this.http.get(url).subscribe(buses=>{
        this.searchedBuses=buses;
        this.dtTrigger.next();
      })
    })
    // this.searchService.searchBus.subscribe(buses=>{
    //   this.searchedBuses=buses;
    //   console.log(this.searchedBuses)
    // })
    // this.searchedBuses = this.searchService.searchedBuses;
  }

  book(id){
    this.router.navigate(['book/'+id])
  }
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
