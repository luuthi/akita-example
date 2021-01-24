import {Injectable} from "@angular/core";
import {CartItem} from "./cart.model";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Product} from "../../product/state/product.model";

export interface CartState extends EntityState<CartItem> {
}

@Injectable({providedIn: "root"})
@StoreConfig({
  name: "cart",
  idKey: "productId"
})
export class CartStore extends EntityStore<CartState> {
  constructor() {
    super();
  }

  updateQuantity(productId: Product["id"], operand = 1): any {
    this.update(productId, entity => {
      const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        quantity: newQuantity
      };
    });
  }

  notify(notify: boolean): any {
    this.update(state => ({...state, notify}));
  }
}
