import { enableProdMode, Injectable } from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import { provideTranslocoLocale } from '@ngneat/transloco-locale';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, Routes} from "@angular/router";
import {usernameSetGuard} from "./app/shared/user-info/username-set.service";
import {canActivateGame} from "./app/ongoing-game/current-game.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideTransloco, Translation, translocoConfig, TranslocoLoader } from '@ngneat/transloco';
import { APP_BASE_HREF, PathLocationStrategy, PlatformLocation } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    loadComponent: () => import('./app/new-game/new-game-page.component'),
    title: 'Team Estimation'
  },
  {
    path: 'game/:gameId',
    loadComponent: () => import('./app/ongoing-game/ongoing-game-page.component'),
    canActivate: [ usernameSetGuard, canActivateGame ],
    providers: [ provideHttpClient() ]
  },
  {
    path: 'set-username',
    loadComponent: () => import('./app/set-username/set-username-page.component')
  },
  {
    path: '**',
    redirectTo: 'new'
  }
];

if (environment.production) {
  enableProdMode();
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient,
              private pls: PathLocationStrategy) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`${this.pls.getBaseHref()}assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {
    providers: [
      provideTranslocoLocale({
        langToLocaleMapping: {
          af: 'af-ZA',
          ar: 'ar-SA',
          ca: 'ca-ES',
          cs: 'cs-CZ',
          da: 'da-DK',
          de: 'de-DE',
          el: 'el-GR',
          en: 'en-US',
          es: 'es-ES',
          fi: 'fi-FI',
          fr: 'fr-FR',
          he: 'he-IL',
          hu: 'hu-HU',
          it: 'it-IT',
          ja: 'ja-JP',
          ko: 'ko-KR',
          nl: 'nl-NL',
          no: 'no-NO',
          pl: 'pl-PL',
          pt: 'pt-PT',
          ro: 'ro-RO',
          ru: 'ru-RU',
          sr: 'sr-RS',
          sv: 'sv-SE',
          tr: 'tr-TR',
          uk: 'uk-UA',
          vi: 'vi-VN',
          zh: 'zh-CN'
        }
      }),
      provideRouter(routes),
      provideHttpClient(),
      provideTransloco({
        config: translocoConfig({
          availableLangs: ['af', 'ar', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'he', 'hu', 'it', 'ja', 'ko',
            'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sr', 'sv', 'tr', 'uk', 'vi', 'zh'],
          fallbackLang: 'en',
          prodMode: environment.production,
          missingHandler: {
            useFallbackTranslation: true
          }
        }),
        loader: TranslocoHttpLoader
      }),
      {
        provide: APP_BASE_HREF,
        useFactory: (pl: PlatformLocation) => pl.getBaseHrefFromDOM(),
        deps: [PlatformLocation]
      }
    ]
})
  .catch(err => console.error(err));
