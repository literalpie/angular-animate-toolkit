import { Directive, ElementRef, Renderer2, OnInit, ApplicationRef, Input } from '@angular/core';
import { AnimationLocationsService } from './animation-locations.service';
import { NavigationStart, Router } from '@angular/router';
import { animation, style, animate, AnimationBuilder } from '@angular/animations';

@Directive({
  selector: '[appAnimatePosition]'
})
export class AnimatePositionDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private animationLocation: AnimationLocationsService,
    private builder: AnimationBuilder,
    private appRef: ApplicationRef,
  ) {}
  element: HTMLElement;
  // tslint:disable-next-line:no-input-rename
  @Input('appAnimatePosition') id: string;
  ngOnInit() {
    this.element = this.elRef.nativeElement as HTMLElement;
    if (this.element.clientHeight === 0 && this.element.clientWidth === 0) {
      console.warn('do not put animatePosition directive on component that doesn\'t have a width and height');
    }
    if (!Boolean(this.id)) {
      this.id = this.animationLocation.getNextId();
    } else {
      if (String(this.id).indexOf('auto-generated-') >= 0) {
        throw new Error(`You\'re trying to break stuff, aren\'t you?
          Don\'t give an ID that starts with \'auto-generated-\'.
          I don\'t know if I\'m proud or dissapointed`);
      }
    }
    // When this component is being created,
  }

  registerElementPosition() {
    setTimeout(() => {
      const animateElement = {
        id: this.id,
        width: this.element.clientWidth,
        height: this.element.clientHeight,
        leftPosition: this.element.offsetLeft,
        topPosition: this.element.offsetTop,
      };
      this.animationLocation.registerElementPosition(animateElement);
    }, 0);
  }


  animateElementFromPreviousPosition() {
    this.appRef.tick();
    const previousElementPosition = this.animationLocation.getComponentPosition(this.id);
    if (!previousElementPosition) {
      console.warn('trying to animate from previous position, but none found');
      return false;
    }
      // create an animations starting at the component's previous position,
      // and ending at the position that it would normally have
      const myAnimation = animation([
        style({
          top: previousElementPosition.topPosition,
          left: previousElementPosition.leftPosition,
          width: previousElementPosition.width,
          height: previousElementPosition.height,
          position: 'absolute'
        }),
        animate(300, style({
          top: this.element.offsetTop,
          left: this.element.offsetLeft,
          width: this.element.clientWidth,
          height: this.element.clientHeight,
          position: 'absolute'
        })),
        style('*')
      ]);
      const factory = this.builder.build(myAnimation);
      const player = factory.create(this.element);

      // Create a placeholder div to go at the current component's position while the animation is happening
      // (so other components don't jump around when the component is added at it's final position)
      const placeholderDiv = this.renderer.createElement('div');
      const parentNode = this.renderer.parentNode(this.element);
      this.renderer.setAttribute(
        placeholderDiv,
        'style',
        `width: ${this.element.clientWidth}px; height: ${this.element.clientHeight}px;`
      );

      this.renderer.appendChild(parentNode, placeholderDiv);

      // Play the animation. When the animation is finished,
      // remove the player from the component, and remove the placeholderDiv
      player.play();
      player.onDone(() => {
        this.renderer.removeChild(parentNode, placeholderDiv);
        player.destroy();
        this.registerElementPosition();
      });
    }

}
