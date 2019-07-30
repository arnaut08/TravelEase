import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchedBuses;
  searchBus = new Observable;
  constructor(private http: HttpClient, private router: Router) { }

  getSourceDestination(){
    return this.http.get(`${Path.currentPath}/distinct`)
  }

  searchBuses(searchform){
    this.router.navigate(['result'],{ queryParams: searchform })
  }
}
