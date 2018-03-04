import { Component, OnInit, ViewChildren, OnDestroy, ViewChild } from '@angular/core';
import { QueryList } from '@angular/core';
import { CommonComponent } from './common.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
