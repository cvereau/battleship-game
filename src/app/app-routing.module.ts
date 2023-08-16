import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/main/games-history', pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'games-history',
        loadChildren: () => import('./games-history/games-history.module').then(m => m.GamesHistoryModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
      },
      {
        path: 'credits',
        loadChildren: () => import('./credits/credits.module').then(m => m.CreditsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
