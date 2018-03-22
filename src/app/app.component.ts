import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { style, query, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animateRoutes', [
      transition('*=>*', [
        query(':enter', [
          style({opacity: '0', height: '0px'}),
        ], {optional: true}),
        query(':leave', [
          style({opacity: '1'}),
          animate('200ms', style({opacity: '0'}))
        ], {optional: true}),
        query(':enter', [
          style({opacity: '0', height: '*'}),
          animate('200ms', style({opacity: '1'}))
        ], {optional: true}),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  routeName$: Observable<string>;
  constructor(private router: Router) { }
  ngOnInit() {
    this.routeName$ = this.router.events.pipe(
      filter(routerEvent => routerEvent instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects.substring(1)),
    );
  }
  name: string;

  inputChange(ev: Event) {
    console.log((ev.currentTarget as HTMLElement).value);
    this.name = (ev.currentTarget as HTMLElement).value;
  }
}
