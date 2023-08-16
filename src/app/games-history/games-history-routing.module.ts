import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GamesHistoryComponent } from './games-history.component';

const routes: Routes = [
  {
    path: '',
    component: GamesHistoryComponent,
  },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesHistoryRoutingModule {}
