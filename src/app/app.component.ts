import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {AuthQuery} from "./auth/state/auth.query";
import {map, take} from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "akita-ecommerce";
  isLoggedIn: Observable<boolean>;

  constructor(private authQuery: AuthQuery) {
    this.isLoggedIn = this.authQuery.isLoggedIn$;
  }
}
