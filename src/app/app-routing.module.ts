import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';

const routes: Routes = [
  {path: 'first', component: FirstComponent, data: {animationState: 'first'}},
  {path: 'second', component: SecondComponent, data: {animationState: 'second'}},
  {path: 'third', component: ThirdComponent, data: {animationState: 'third'}},
  {path: '**', redirectTo: 'first'},
  {path: '', redirectTo: 'first', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
