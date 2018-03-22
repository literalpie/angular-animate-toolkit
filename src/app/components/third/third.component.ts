import { Component, OnInit, ViewChildren, QueryList, AfterContentInit, AfterViewInit } from '@angular/core';
import { AnimatePositionDirective } from '../../animate-position.directive';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements AfterViewInit {
  @ViewChildren(AnimatePositionDirective) animatePositionElements: QueryList<AnimatePositionDirective>;

  layout = 'row';
  constructor() { }

  ngAfterViewInit() {
    this.animatePositionElements.forEach(el => {
      el.registerElementPosition();
    });
  }

  toggleLayout() {
    this.layout = this.layout === 'row' ? 'column' : 'row';
    this.animatePositionElements.forEach(el => {
      el.animateElementFromPreviousPosition();
    });

  }
}
