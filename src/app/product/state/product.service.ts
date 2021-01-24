import { Injectable } from "@angular/core";
import { ProductsStore } from "./product.store";
import { map, mapTo } from "rxjs/operators";
import { Observable, timer } from "rxjs";
import { ID, cacheable } from "@datorama/akita";
import { products } from "../product.mocks";
import {Product} from "./product.model";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private productsStore: ProductsStore) {}

  get(): Observable<void> {
    const request = timer(500).pipe(
      mapTo(products),
      map(response => this.productsStore.set(response))
    );

    return cacheable(this.productsStore, request);
  }

  getProduct(id: ID): Observable<any> {
    const product = products.find(current => current.id === +id);

    return timer(500).pipe(
      mapTo(product),
      // @ts-ignore
      map(() => this.productsStore.add(product))
    );
  }
}
