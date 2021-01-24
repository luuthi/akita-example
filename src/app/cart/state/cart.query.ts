import {Injectable} from "@angular/core";
import {CartState, CartStore} from "./cart.store";
// import {combineLatest} from "rxjs";
import {map, shareReplay, combineLatest, withLatestFrom} from "rxjs/operators";
import {HashMap, QueryEntity} from "@datorama/akita";
import {ProductsQuery} from "../../product/state/product.query";
import {CartItem} from "./cart.model";
import {Product} from "../../product/state/product.model";

@Injectable({providedIn: "root"})
export class CartQuery extends QueryEntity<CartState> {
  constructor(protected store: CartStore, private productsQuery: ProductsQuery) {
    super(store);
  }

  selectItems$ = this.selectAll().pipe(combineLatest(this.productsQuery.selectAll({asObject: true}))).pipe(
    map(joinItems),
    shareReplay({bufferSize: 1, refCount: true})
  );

  // selectItems$ = withLatestFrom(this.selectAll(), this.productsQuery.selectAll({asObject: true})).pipe(
  //   map(joinItems),
  //   shareReplay({bufferSize: 1, refCount: true})
  // );

  selectTotal$ = this.selectItems$.pipe(map(items => items.reduce((acc, item) => acc + item.total, 0)));

  selectNotification$ = this.select((state) => state.notify);
}

function joinItems([cartItems, products]: [CartItem[], HashMap<Product>]): CartItem[] {
  return cartItems.map((cartItem: CartItem) => {
    const product = products[cartItem.productId];
    return {
      ...cartItem,
      ...product,
      total: cartItem.quantity * product.price
    };
  });
}
