import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { CommonComponent } from './components/common/common.component';
import { AnimationLocationsService } from './animation-locations.service';
import { AnimateBetweenRoutesDirective } from './animate-between-routes.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnimatePositionDirective } from './animate-position.directive';
import { AnimatePositionsComponent } from './components/animate-positions/animate-positions.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    CommonComponent,
    AnimateBetweenRoutesDirective,
    AnimatePositionDirective,
    AnimatePositionsComponent,
    ThirdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [AnimationLocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
