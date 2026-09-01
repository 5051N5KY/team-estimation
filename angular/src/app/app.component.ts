import { Component } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { RouterOutlet } from '@angular/router';
import { ToastsContainerComponent } from './shared/toast/toast-container.component';

@Component({
    selector: 'shpp-root',
    templateUrl: './app.component.html',
    styles: [],
    standalone: true,
    imports: [RouterOutlet, ToastsContainerComponent]
})
export class AppComponent {

  constructor(private transloco: TranslocoService) {
    transloco.setActiveLang(getBrowserLang() || 'en');
  }
}
