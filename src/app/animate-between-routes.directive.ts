import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
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
  // tslint:disable-next-line:no-input-rename
  @Input('appAnimateBetweenRoutes') id;

  ngOnInit() {
    this.element = this.elRef.nativeElement as HTMLElement;
    if (this.element.clientHeight === 0 && this.element.clientWidth === 0) {
      console.warn('do not put animation between routed directive on component without a width and height');
    }
    if (!Boolean(this.id)) {
      this.id = this.animationLocation.getNextId();
    } else {
      if ((this.id as string).indexOf('auto-generated-') >= 0) {
        throw new Error(`You\'re trying to break stuff, aren\'t you?
          Don\'t give an ID that starts with \'auto-generated-\'.
          I don\'t know if I\'m proud or dissapointed`);
      }
    }

    // When there is a route change, register the current position of this component
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const animateElement = {
          id: this.id,
          width: this.element.clientWidth,
          height: this.element.clientHeight,
          leftPosition: this.element.offsetLeft,
          topPosition: this.element.offsetTop,
        };
        this.animationLocation.registerElementPosition(animateElement);
      }
    });

    // When this component is being created,
    // if the animationLocationService has information about the component's previous position, load it
    const previousComponentPosition = this.animationLocation.getComponentPosition(this.id);

    if (previousComponentPosition) {
      this.animateComponentFromPreviousPosition(previousComponentPosition);
    }
  }

  animateComponentFromPreviousPosition(previousComponentPosition) {
      // create an animations starting at the component's previous position,
      // and ending at the position that it would normally have
      const dest = {
        top: this.element.offsetTop,
        left: this.element.offsetLeft,
        width: this.element.clientWidth,
        height: this.element.clientHeight,
        position: 'absolute'
      };
      const parentNode = this.renderer.parentNode(this.element);

      // put the element in the great-great... grandparent so that it doesn't get animated with the route
      // TODO: Make a better way to detect which ancestor to put the element on during animations.
      const grannyNode = this.renderer.parentNode(
        this.renderer.parentNode(
          this.renderer.parentNode(
            this.renderer.parentNode(
              this.renderer.parentNode(
                this.renderer.parentNode(
                  this.element)
                )
              )
            )
          )
        );
      this.renderer.appendChild(grannyNode, this.element);

      const myAnimation = animation([
        style({
          top: previousComponentPosition.topPosition,
          left: previousComponentPosition.leftPosition,
          width: previousComponentPosition.width,
          height: previousComponentPosition.height,
          // if absolute, animations moves when scrolling move (which is good), but overflow causes scrollbars
          // if fixed, overflow doesn't scroll, which is good, but it doesn't behave right when user scrolls
          position: 'absolute'
        }),
        animate(300, style(dest)),
        style('*')
      ]);

      const factory = this.builder.build(myAnimation);
      const player = factory.create(this.element);

      // Create a placeholder div to go at the current component's position while the animation is happening
      // (so other components don't jump around when the component is added at it's final position)
      const placeholderDiv = this.renderer.createElement('div');
      this.renderer.setAttribute(placeholderDiv, 'style', `width: ${this.element.clientWidth}px; height: ${this.element.clientHeight}px;`);
      this.renderer.appendChild(parentNode, placeholderDiv);

      // Play the animation. When the animation is finished,
      // remove the player from the component, and remove the placeholderDiv
      player.play();
      player.onDone(() => {
        this.renderer.removeChild(parentNode, placeholderDiv);
        player.destroy();
        this.renderer.appendChild(parentNode, this.element);
      });
  }

}
