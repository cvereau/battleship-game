import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './credits.component';

const routes: Routes = [
  {
    path: '',
    component: CreditsComponent,
  },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreditsRoutingModule {}
