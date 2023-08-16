import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { FormsModule } from '@angular/forms';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { NumbersOnlyDirective } from '../shared/directives/numbers-only.directive';

const components = [GameComponent];
const directives = [NumbersOnlyDirective]

@NgModule({
  declarations: [...components, GameBoardComponent, GameSettingsComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    ...directives
  ],
})
export class GameModule {}
