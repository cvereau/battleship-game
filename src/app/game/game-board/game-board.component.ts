import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GameStatus, Gameplayed, Ship, Tile } from '../game.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class GameBoardComponent implements OnInit {
  @Input() maxAttempts: number = 5;

  @ViewChild('gameOverDialog', { static: true })
  gameOverDialog?: ElementRef;

  tilesGrid: Tile[] = [];
  statusMessage: string = '';
  turns: number = 0;
  gameStatus: GameStatus = GameStatus.Lose;

  GameStatus = GameStatus;

  private boardSize: number = 10;
  private shipsSunk: number = 0;
  private ships: Ship[] = []
  private shipsInitialValue: Ship[] = [
    { locations: [0, 0, 0, 0], hits: ['', '', ''], shipLength: 4 },
    { locations: [0, 0, 0], hits: ['', '', ''], shipLength: 3 },
    { locations: [0, 0, 0], hits: ['', '', ''], shipLength: 3 },
    { locations: [0, 0], hits: ['', ''], shipLength: 2 },
    { locations: [0, 0], hits: ['', ''], shipLength: 2 },
    { locations: [0, 0], hits: ['', ''], shipLength: 2 },
    { locations: [0], hits: [''], shipLength: 1 },
    { locations: [0], hits: [''], shipLength: 1 },
    { locations: [0], hits: [''], shipLength: 1 },
    { locations: [0], hits: [''], shipLength: 1 },
  ];

  private columns: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ];
  private rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  private startTime: Date = new Date();
  private endTime: Date = new Date();
  private interval: any;

  constructor(private router: Router, private storeService: StoreService, private gameService: GameService) {}

  ngOnInit(): void {
    this.ships = [...this.shipsInitialValue];
    this.initializeTilesGrid();
    this.generateShipLocations();
  }

  initializeTilesGrid() {
    let identifier: number = 1;
    this.tilesGrid = [];
    this.tilesGrid.push(
      ...[
        { value: '', isHeader: true },
        ...this.columns.map((c) => ({
          value: c,
          isHeader: true,
        })),
      ]
    );

    for (let i = 0; i < this.rows.length; i++) {
      this.tilesGrid.push({
        value: this.rows[i],
        isHeader: true,
      });
      for (let j = 0; j < this.columns.length; j++) {
        this.tilesGrid.push({
          id: identifier,
          isHeader: false,
        });
        identifier++;
      }
    }
  }

  isGridHeader(tile: string): boolean {
    return this.rows.includes(tile) || this.columns.includes(tile);
  }

  generateShipLocations(): void {
    this.generateShipLocationsWithLength(4);
    this.generateShipLocationsWithLength(3);
    this.generateShipLocationsWithLength(2);
    this.generateShipLocationsWithLength(1);
  }

  playTurn(tile: Tile) {
    if (!tile.isHeader && !tile.disabled) {
      const location = tile.id || 0;
      this.processTurn(location, tile);
    }
  }

  tryAgain(gameOverDialog: HTMLDialogElement) {
    gameOverDialog.close();
    this.resetGame();
  }

  resetGame() {
    this.storeService.resetNumberOfAttempts();
  }

  goToGameslist() {
    this.router.navigate(['/main/games-history']);
  }

  private generateShipLocationsWithLength(shipLength: number): void {
    let locations = [];
    let shipsWithProvidedLength = this.ships.filter(
      (s) => s.shipLength === shipLength
    );
    for (let ship of shipsWithProvidedLength) {
      do {
        locations = this.generateShip(shipLength);
      } while (this.collision(locations));
      ship.locations = locations;
    }
  }

  private generateShip(shipLength: number): number[] {
    const direction = Math.floor(Math.random() * 2);
    let row: number = 0;
    let col: number = 0;

    if (direction === 1) {
      //lo colocamos horizontalmente
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - shipLength));
    } else {
      // lo colocamos verticalmente
      row = Math.floor(Math.random() * (this.boardSize - shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    for (var i = 0; i < shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + '' + (col + i));
      } else {
        newShipLocations.push(row + i + '' + col);
      }
    }
    return newShipLocations.map((l) => parseInt(l));
  }

  private collision(locations: number[]) {
    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  private processTurn(location: number, tile: Tile) {
    if (this.turns === 0) this.startTime = new Date();

    if (location) {
      this.turns++;
      const hit = this.fire(location, tile);
      
      if (hit && this.shipsSunk === this.ships.length) {
        this.endTime = new Date();    
        this.gameStatus = GameStatus.Win;        
        this.gameOverDialog?.nativeElement.showModal();
        this.saveGame();      
      } else if (+this.maxAttempts !== -1 && this.turns === +this.maxAttempts) {
        this.endTime = new Date();
        this.gameStatus = GameStatus.Lose;
        this.gameOverDialog?.nativeElement.showModal();
        this.saveGame();   
      }
    }
  }

  private fire(guess: number, tile: Tile): boolean {
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      const index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        tile.hitStatus = true;
        tile.disabled = true;
        this.showStatusMessage("It's a hit!");
        if (this.isSunk(ship)) {
          this.showStatusMessage('You sunk a battleship!');
          this.shipsSunk++;
        }
        return true;
      }
    }
    tile.missStatus = true;
    tile.disabled = true;
    this.showStatusMessage("It's a miss!");
    return false;
  }

  private isSunk(ship: Ship) {
    for (let i = 0; i < ship.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }
    return true;
  }

  private showStatusMessage(message: string) {
    this.statusMessage = message;
    clearInterval(this.interval);
    this.interval = setTimeout(() => (this.statusMessage = ''), 2000);
  }

  private saveGame() {
    const gamePlayed : Gameplayed = {
      turnsUsed: this.turns,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.gameStatus,
      overallAccuracy: ((this.shipsSunk) / (this.shipsInitialValue.length )) * 100
    }
    this.gameService.saveGame(gamePlayed).subscribe();
  }
}
