import { Component } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { RouterOutlet } from '@angular/router';
import { ToastsContainerComponent } from './shared/toast/toast-container.component';
import { ThemeService } from './shared/theme.service';

@Component({
    selector: 'shpp-root',
    templateUrl: './app.component.html',
    styles: [],
    standalone: true,
    imports: [RouterOutlet, ToastsContainerComponent]
})
export class AppComponent {

  constructor(private transloco: TranslocoService, theme: ThemeService) {
    transloco.setActiveLang(getBrowserLang() || 'en');
    theme.initialize();
  }
}
