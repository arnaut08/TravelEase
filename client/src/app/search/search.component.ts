import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../search.service';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ttSources;
  ttDestinations;
  searchform : FormGroup;
  constructor(private searchService: SearchService,private timetableService:TimetableService) {}

  ngOnInit() {
    this.searchService.getSourceDestination().subscribe(details=>{
      this.ttSources=details['source'];
      this.ttDestinations=details["destination"];
      this.searchform = new FormGroup({
        'date':new FormControl(null,[Validators.required]),
        'source':new FormControl(this.ttSources[0].source,[Validators.required]),
        'destination':new FormControl(this.ttDestinations[0].destination,[Validators.required]),
        'busCategory':new FormControl("AC-Sleeper",[Validators.required]),
       })
    }); 
  }

  search(){
    this.searchService.searchBuses(this.searchform.value)
  }
}
