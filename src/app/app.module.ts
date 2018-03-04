import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { CommonComponent } from './common.component';
import { AnimationLocationsService } from './animation-locations.service';
import { AnimateBetweenRoutesDirective } from './animate-between-routes.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    CommonComponent,
    AnimateBetweenRoutesDirective
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
