import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DefaultRoutingModule } from './default-routing.module';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';



@NgModule({
  declarations: [
    HomeComponent, 
    NavbarComponent, 
    BioComponent, 
    ContactComponent
  ],
  providers: [
    ContactService
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
