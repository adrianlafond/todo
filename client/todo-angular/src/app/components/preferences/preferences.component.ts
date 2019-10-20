import { Component, OnInit } from '@angular/core';

import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  private themeValue = '';

  public get theme() {
    return this.themeValue;
  }

  public set theme(value: string) {
    this.prefs.setValue('theme', this.themeValue = value);
  }

  constructor(private prefs: PreferencesService) {}

  ngOnInit() {
    this.themeValue = this.prefs.preferences.theme;
  }
}
