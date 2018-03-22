import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  @ViewChild('common') attr;
  something;

  constructor() { }

  ngOnInit() {
  }

}
