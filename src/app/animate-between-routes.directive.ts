import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AnimationLocationsService } from './animation-locations.service';
import { NavigationStart, Router } from '@angular/router';
import { animation, style, animate, AnimationBuilder } from '@angular/animations';

@Directive({
  selector: '[appAnimateBetweenRoutes]'
})
export class AnimateBetweenRoutesDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private animationLocation: AnimationLocationsService,
    private builder: AnimationBuilder,
  ) {}
  element: HTMLElement;

  ngOnInit() {
    this.element = this.elRef.nativeElement as HTMLElement;
    if (this.element.clientHeight === 0 && this.element.clientWidth === 0) {
      console.warn('do not put animation between routed directive on component without a width and height');
    }
    // When there is a route change, register the current position of this component
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const animateElement = {
          id: '1',
          width: this.element.clientWidth,
          height: this.element.clientHeight,
          leftPosition: this.element.offsetLeft,
          topPosition: this.element.offsetTop,
        };
        this.animationLocation.registerComponentPosition(animateElement);
      }
    });

    // When this component is being created,
    // if the animationLocationService has information about the component's previous position, load it
    const previousComponentPosition = this.animationLocation.getComponentPosition('1');

    if (previousComponentPosition) {
      this.animateComponentFromPreviousPosition(previousComponentPosition);
    }
  }

  animateComponentFromPreviousPosition(previousComponentPosition) {
      // create an animations starting at the component's previous position,
      // and ending at the position that it would normally have
      const myAnimation = animation([
        style({
          top: previousComponentPosition.topPosition,
          left: previousComponentPosition.leftPosition,
          width: previousComponentPosition.width,
          height: previousComponentPosition.height,
          position: 'fixed'
        }),
        animate(300, style({
          top: this.element.offsetTop,
          left: this.element.offsetLeft,
          width: this.element.clientWidth,
          height: this.element.clientHeight,
          position: 'fixed'
        })),
        style('*')
      ]);

      const factory = this.builder.build(myAnimation);
      const player = factory.create(this.element);

      // Create a placeholder div to go at the current component's position while the animation is happening
      // (so other components don't jump around when the component is added at it's final position)
      const placeholderDiv = this.renderer.createElement('div');
      const parentNode = this.renderer.parentNode(this.element);
      this.renderer.setAttribute(placeholderDiv, 'style', `width: ${this.element.clientWidth}px; height: ${this.element.clientHeight}px;`);
      this.renderer.appendChild(parentNode, placeholderDiv);

      // Play the animation. When the animation is finished,
      // remove the player from the component, and remove the placeholderDiv
      player.play();
      player.onDone(() => {
        this.renderer.removeChild(parentNode, placeholderDiv);
        player.destroy();
      });
  }

}
