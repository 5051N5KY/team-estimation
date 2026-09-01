import { Injectable } from '@angular/core';

export type Theme = 'colorful' | 'sadness';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'team-estimation-theme';
  private readonly palettes: Record<Theme, Record<string, string>> = {
    colorful: {
      '--theme-background': '#F2E2BA',
      '--theme-surface': '#BAF2D8',
      '--theme-surface-alt': '#BAF2BB',
      '--theme-accent': '#BAD7F2',
      '--theme-highlight': '#F2BAC9',
      '--theme-ink': '#2B2B2B',
      '--theme-muted': '#565656',
      '--card-color': '#F2BAC9',
      '--navbar-bg-color': '#BAD7F2',
      '--navbar-border-bottom-color': '#F2BAC9',
      '--navbar-text-color': '#2B2B2B',
      '--navbar-muted-color': '#565656',
      '--bs-body-bg-rgb': '242, 226, 186'
    },
    sadness: {
      '--theme-background': '#E0E0E0',
      '--theme-surface': '#B3B3B3',
      '--theme-surface-alt': '#848484',
      '--theme-accent': '#565656',
      '--theme-highlight': '#848484',
      '--theme-ink': '#2B2B2B',
      '--theme-muted': '#565656',
      '--card-color': '#565656',
      '--navbar-bg-color': '#565656',
      '--navbar-border-bottom-color': '#2B2B2B',
      '--navbar-text-color': '#E0E0E0',
      '--navbar-muted-color': '#B3B3B3',
      '--bs-body-bg-rgb': '224, 224, 224'
    }
  };
  private currentTheme: Theme = this.initialTheme();

  initialize(): void {
    this.apply(this.currentTheme);
  }

  get theme(): Theme {
    return this.currentTheme;
  }

  toggle(): void {
    this.currentTheme = this.currentTheme === 'colorful' ? 'sadness' : 'colorful';
    try {
      localStorage.setItem(this.storageKey, this.currentTheme);
    } catch {
      // The theme still changes when browser storage is unavailable.
    }
    this.apply(this.currentTheme);
  }

  private initialTheme(): Theme {
    return this.storedTheme() ?? 'colorful';
  }

  private storedTheme(): Theme | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'colorful' || stored === 'sadness') {
        return stored;
      }
      return stored === 'dark' ? 'sadness' : stored === 'light' ? 'colorful' : null;
    } catch {
      return null;
    }
  }

  private apply(theme: Theme): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', 'light');
    root.style.colorScheme = 'light';
    Object.entries(this.palettes[theme]).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }
}
