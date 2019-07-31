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
    this.searchform = new FormGroup({
      'date':new FormControl(null,[Validators.required]),
      'source':new FormControl(null,[Validators.required]),
      'destination':new FormControl(null,[Validators.required]),
      'busCategory':new FormControl("AC-Sleeper",[Validators.required]),
     })
    this.searchService.getSourceDestination().subscribe(details=>{
      this.ttSources=details['source'];
      this.ttDestinations=details["destination"];
      this.searchform.patchValue({
        source : this.ttSources[0].source,
        destination : this.ttDestinations[0].destination
      })
    }); 
  }

  search(){
    this.searchService.searchBuses(this.searchform.value)
  }
}
