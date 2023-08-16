import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  numAttempts$: Observable<number> = new Observable<number>();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.numAttempts$ = this.storeService.numberOfAttempts$;
  }
}
