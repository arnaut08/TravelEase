import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchedBuses;
  searchBus = new Observable;
  constructor(private http: HttpClient, private router: Router) { }

  getSourceDestination(){
    return this.http.get("http://localhost:3000/distinct")
  }

  searchBuses(searchform){
    // const url = `http://localhost:3000/search?source=${searchform.source}&destination=${searchform.destination}&date=${searchform.date}&category=${searchform.busCategory}`;
    // this.searchBus = this.http.get(url);
    this.router.navigate(['result'],{ queryParams: searchform })
  }
}
