import {Injectable} from "@angular/core";
import {AuthStore} from "./auth.store";
import {mapTo, tap} from "rxjs/operators";
import {Observable, timer} from "rxjs";
import {Identifier} from "./auth.model";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private authStore: AuthStore) {
  }

  login(credential: Identifier): Observable<any> {
    return simulateRequest(credential).pipe(tap(user => this.authStore.update(user)));
  }

  logout(): void {
    this.authStore.reset();
  }
}

export function simulateRequest(credential: Identifier): Observable<any> {
  return timer(400).pipe(
    mapTo({
      id: 1,
      firstName: "luu",
      lastName: "thii",
      token: "token"
    })
  );
}
