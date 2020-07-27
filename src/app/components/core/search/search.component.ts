import {Component, OnInit, Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
@Output() keyword = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  getKeyword(event) {
    let input = event.target.value;
    this.keyword.emit(input);

  }

}
