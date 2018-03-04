import { Component, OnInit, HostBinding, ContentChild, ViewChildren, ViewChild, Input, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, useAnimation, animation, AnimationBuilder } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { AnimationLocationsService, ComponentPosition } from './animation-locations.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  constructor( ) { }
  ngOnInit() {
  }
}
