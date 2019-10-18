import { Component, OnInit } from '@angular/core';

import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todos in Angular';
  theme = '';
  themeClass = { 'theme-dark': false };

  constructor(private prefs: PreferencesService) { }

  ngOnInit() {
    this.updateTheme(this.prefs.getValue('theme'));
    this.prefs.getObservable().subscribe(prefs => {
      this.updateTheme(prefs.theme);
    });
  }

  updateTheme(theme: string) {
    this.themeClass = { 'theme-dark': theme === 'dark' };
  }
}
