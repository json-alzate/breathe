import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

import { BreatheComponent } from './components/breathe/breathe.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'breathe/:id',
    component: BreatheComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
