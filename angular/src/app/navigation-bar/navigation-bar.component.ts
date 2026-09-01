import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { BaseHrefPipe } from "../shared/base-href.pipe";
import { ThemeService } from '../shared/theme.service';

@Component({
  standalone: true,
  selector: 'shpp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  imports: [TranslocoDirective, BaseHrefPipe],
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(public readonly theme: ThemeService) {}
}
