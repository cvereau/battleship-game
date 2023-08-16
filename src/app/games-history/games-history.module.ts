import { NgModule } from '@angular/core';
import { GamesHistoryComponent } from './games-history.component';
import { CommonModule } from '@angular/common';
import { GamesHistoryRoutingModule } from './games-history-routing.module';

const components = [
    GamesHistoryComponent
]

@NgModule({
    declarations: [...components],
    imports: [CommonModule, GamesHistoryRoutingModule]
})
export class GamesHistoryModule {}