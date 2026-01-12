import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../services/auth.store';
import { dataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly auth = inject(AuthStore);
  readonly dataService = inject(dataService);

  logout() {
    this.dataService.logout();
  }
}
