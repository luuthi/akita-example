import {Injectable} from "@angular/core";
import {ProductsState, ProductsStore} from "./product.store";
import {Product} from "./product.model";
import {QueryConfig, QueryEntity} from "@datorama/akita";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
@QueryConfig({sortBy: "price"})
export class ProductsQuery extends QueryEntity<ProductsState> {
  constructor(protected store: ProductsStore) {
    super(store);
  }

  getProducts(term: string, sortBy: keyof Product): Observable<Product[]> {
    return this.selectAll({
      sortBy,
      filterBy: entity => entity.title.toLowerCase().includes(term)
    });
  }
}
