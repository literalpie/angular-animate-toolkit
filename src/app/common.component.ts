import { Component, OnInit, HostBinding, ContentChild, ViewChildren, ViewChild, Input, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, useAnimation, animation, AnimationBuilder } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { AnimationLocationsService, ComponentPosition } from './animation-locations.service';


  // transition('void=>first', [
  //   style({top: 346, left: 18, width: '95%', position: 'fixed'}),
  //   // style({opacity: 0}),
  //   animate(2000, style({opacity: '*', top: 52, left: 18, position: 'fixed'}))
  // ])

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  animateElement: ComponentPosition;
   @Input() route = 'first';
  constructor(
    private builder: AnimationBuilder,
    private router: Router,
    private animationLocation: AnimationLocationsService,
    private renderer: Renderer2,
  ) { }
  @ViewChild('button') attr;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.animateElement = {
          id: '1',
          width: this.attr.nativeElement.clientWidth,
          height: this.attr.nativeElement.clientHeight,
          leftPosition: this.attr.nativeElement.offsetLeft,
          topPosition: this.attr.nativeElement.offsetTop,
        };
        this.animationLocation.registerComponentPosition(this.animateElement);
      }
    });
    const previousComponentPosition = this.animationLocation.getComponentPosition('1');
    if (previousComponentPosition) {
      const thisElement = this.attr.nativeElement as HTMLElement;
      const myAnimation = animation([
        style({
          top: previousComponentPosition.topPosition,
          left: previousComponentPosition.leftPosition,
          width: previousComponentPosition.width,
          height: previousComponentPosition.height,
          position: 'fixed'
        }),
        animate(2000, style({
          top: thisElement.offsetTop,
          left: thisElement.offsetLeft,
          width: thisElement.clientWidth,
          height: thisElement.clientHeight,
          position: 'fixed'
        })),
        style('*')
      ]);

      const factory = this.builder.build(
        myAnimation
      );
      const player = factory.create(this.attr.nativeElement);
      const placeholderDiv = this.renderer.createElement('div');
      const parentNode = this.renderer.parentNode(this.attr.nativeElement);
      this.renderer.setAttribute(placeholderDiv, 'style', `width: ${thisElement.clientWidth}px; height: ${thisElement.clientHeight}px;`);
      this.renderer.appendChild(parentNode, placeholderDiv);
      player.play();
      player.onDone(() => {
        this.renderer.removeChild(parentNode, placeholderDiv);
        player.destroy();
      });
    }
  }
}

// to make a directive that does this stuff: https://github.com/angular/angular/issues/8277#issuecomment-316246310
