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
  componentPositions: BehaviorSubject<ComponentPosition[]> = new BehaviorSubject([]);
  constructor() { }

  registerComponentPosition(position: ComponentPosition) {
    this.componentPositions.next(
      [...this.componentPositions.value
        .filter(pos => pos.id !== position.id),
        position
      ]
    );
  }

  getComponentPosition(componentId: string) {
    return this.componentPositions.value.find(pos => pos.id === componentId);
  }

}
