import { Injectable } from '@angular/core';
import { Gameplayed } from '../../game/game.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiBaseUrl = 'https://fake-backend/api';

  constructor(private http: HttpClient) {}

  saveGame(gamePlayed: Gameplayed) {
    return this.http.post(`${this.apiBaseUrl}/game/register`, gamePlayed);
  }

  getGamesHistory() {
    return this.http.get<Gameplayed[]>(`${this.apiBaseUrl}/games-history`);
  }
}
