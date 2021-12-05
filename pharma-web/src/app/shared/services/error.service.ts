import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor() {
    }

    private errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');

    onRecieveErrorMessage(): Observable<string> {
        return this.errorMessage.asObservable();
    }

    updateErrorMessage(msg: string) {
        this.errorMessage.next(msg);
    }
}
