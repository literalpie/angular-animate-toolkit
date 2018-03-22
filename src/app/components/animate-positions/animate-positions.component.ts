import { Component, OnInit, ViewChild, AfterViewInit, ApplicationRef } from '@angular/core';
import { AnimatePositionDirective } from '../../animate-position.directive';
import { Route, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-animate-positions',
  templateUrl: './animate-positions.component.html',
  styleUrls: ['./animate-positions.component.css']
})
export class AnimatePositionsComponent implements OnInit, AfterViewInit {
  @ViewChild(AnimatePositionDirective) animatePositionElement: AnimatePositionDirective;
  constructor(private router: Router) { }
  something = false;
  animateNextTime = false;
  ngOnInit() {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.animatePositionElement.registerElementPosition();
      }
    });
   }
  onButtonPress() {
    this.something = true;
    this.animatePositionElement.animateElementFromPreviousPosition();
  }
  ngAfterViewInit() {
    this.animatePositionElement.registerElementPosition();
  }
}
