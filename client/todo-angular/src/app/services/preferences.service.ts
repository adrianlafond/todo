import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface Preferences {
  theme: string;
}
export type Subscriber = (prefs: Preferences) => void;

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private data: Preferences = {
    theme: 'light'
  };

  private prefsObservable: Observable<Preferences>;
  private observer: Observer<Preferences>;

  public get preferences(): Preferences {
    return { ...this.data };
  }

  constructor() {
    this.prefsObservable = new Observable<Preferences>(observer => this.observer = observer);
  }

  public getValue(key: string) {
    return this.data[key] || null;
  }

  public setValue(key: string, value: any) {
    this.data[key] = value;
    this.publish();
  }

  public getObservable() {
    return this.prefsObservable;
  }

  private publish() {
    this.observer.next(this.preferences);
  }
}
