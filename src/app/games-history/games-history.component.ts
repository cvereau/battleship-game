import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { Observable } from 'rxjs';
import { Gameplayed } from '../game/game.model';

@Component({
  selector: 'app-games-history',
  templateUrl: './games-history.component.html',
  styleUrls: ['./games-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesHistoryComponent implements OnInit {
  gamesHistory$: Observable<Gameplayed[]> = new Observable<Gameplayed[]>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gamesHistory$ = this.gameService.getGamesHistory();
  }

  formatDate(date: any) {
    const d = new Date(date);
    return (
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
    );
  }
}
