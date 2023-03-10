import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {

  @Output() keyword = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  send(query: string) {
    this.keyword.emit(query);
  }

}
