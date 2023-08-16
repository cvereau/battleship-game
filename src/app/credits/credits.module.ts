import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsComponent } from './credits.component';
import { CreditsRoutingModule } from './credits-routing.module';

const components = [
  CreditsComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule
  ]
})
export class CreditsModule { }
