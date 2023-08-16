import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    private numberOfAttempts = new BehaviorSubject<number>(0);
    numberOfAttempts$ = this.numberOfAttempts.asObservable();

    constructor() {}

    setNumberOfAttempts(value: number) {
        this.numberOfAttempts.next(value);
    }

    resetNumberOfAttempts() {
        this.numberOfAttempts.next(0);
    }
}