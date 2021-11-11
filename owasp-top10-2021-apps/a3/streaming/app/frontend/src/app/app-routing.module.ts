import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivesComponent } from './lives/lives.component';
import { PlayComponent } from './lives/play/play.component';

const routes: Routes = [
	{
    path: '', component: LivesComponent
  },
  {
    path: 'play/:username', component: PlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
