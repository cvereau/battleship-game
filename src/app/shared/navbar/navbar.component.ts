import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { menu } from '../menu';
import { MenuItem } from '../models/menu.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  menu: MenuItem[] = menu.reverse();
  isResponsive: boolean = false;

  showResponsiveMenu() {
    this.isResponsive = !this.isResponsive;
  }
}
