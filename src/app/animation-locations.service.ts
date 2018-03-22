import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ComponentPosition {
  id: string;
  width: number;
  height: number;
  leftPosition: number;
  topPosition: number;
}

@Injectable()
export class AnimationLocationsService {
  private componentPositions: ComponentPosition[] = [];
  private nextId = 1;
  constructor() { }

  registerElementPosition(position: ComponentPosition) {
      this.componentPositions = [
        ...this.componentPositions.filter(pos => pos.id !== position.id),
        position
      ];
  }

  getComponentPosition(componentId: string) {
    return this.componentPositions.find(pos => pos.id === componentId);
  }

  getNextId(): string {
    return 'auto-generated-' + this.nextId++;
  }
}
