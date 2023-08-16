import { Component } from '@angular/core';
import { GameAttemptsSelectionMode } from '../game.model';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent {
  attemptsSelectionMode: GameAttemptsSelectionMode =
    GameAttemptsSelectionMode.Manual;
  attemptsNumber: number = 0;
  attemptsSelected: number = -1;
  GameAttemptsSelectionMode = GameAttemptsSelectionMode;

  constructor(private storeService: StoreService) {}

  calculateDisableStatus(): boolean {
    return this.attemptsSelectionMode === GameAttemptsSelectionMode.Manual
      ? this.attemptsNumber == 0 || !this.attemptsNumber
      : false;
  }

  playGame() {
    const numAttempts =
      this.attemptsSelectionMode === GameAttemptsSelectionMode.Manual
        ? this.attemptsNumber
        : this.attemptsSelected;
    this.storeService.setNumberOfAttempts(numAttempts);
  }
}
