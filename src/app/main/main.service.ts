import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
private savingsAcct = new BehaviorSubject<any>(null);
  constructor() { }

  getSavingsAcct$() {
    return this.savingsAcct.asObservable();
  }

  setSavingsAcct(data) {
    return this.savingsAcct.next(data);
  }
}
