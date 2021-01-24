import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Product} from "../../product/state/product.model";
import {CartItem} from "../state/cart.model";
import {CartQuery} from "../state/cart.query";
import {Actions} from "@datorama/akita-ng-effects";
import {CartActions} from "../state/cart.action";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {

  // @ts-ignore
  items$: Observable<(CartItem & Product)[]>;
  // @ts-ignore
  total$: Observable<number>;
  // @ts-ignore
  notify$: Observable<boolean>;

  constructor(private cartQuery: CartQuery, private actions: Actions) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.items$ = this.cartQuery.selectItems$;
    this.total$ = this.cartQuery.selectTotal$;
    this.notify$ = this.cartQuery.selectNotification$;
  }

  remove({productId}: CartItem): void {
    this.actions.dispatch(CartActions.removeItem({productId}));
  }
}
