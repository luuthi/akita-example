import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthQuery} from "../../../auth/state/auth.query";
import {AuthService} from "../../../auth/state/auth.service";
import {Observable} from "rxjs";
import {CartQuery} from "../../../cart/state/cart.query";

type NavBarItem = {
  title: string;
  link: string;
};

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {

  navItems: NavBarItem[] = [
    {
      title : "Products",
      link: "p"
    }
  ];
  count$: Observable<number>;
  isLoggedIn$: Observable<boolean>;

  constructor(private cartQuery: CartQuery, private authService: AuthService, private authQuery: AuthQuery, private router: Router) {
    this.count$ = this.cartQuery.selectCount();
    this.isLoggedIn$ = this.authQuery.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }

  resetStores(): void {
    this.router.navigateByUrl("login");
  }

  ngOnInit(): void {
  }

}
