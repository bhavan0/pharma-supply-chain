import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SuccessService {

    constructor() {
    }

    private successMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');

    onRecieveSuccessMessage(): Observable<string> {
        return this.successMessage.asObservable();
    }

    updateSuccessMessage(msg: string) {
        this.successMessage.next(msg);
    }
}
