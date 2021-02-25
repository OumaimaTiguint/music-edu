import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { AudioComponent } from './audio/audio.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bio', component: BioComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'audio', component: AudioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }