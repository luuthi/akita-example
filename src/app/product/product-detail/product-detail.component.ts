import {Component, OnInit} from "@angular/core";
import {Product} from "../state/product.model";
import {combineLatest, Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {ProductsService} from "../state/product.service";
import {ProductsQuery} from "../state/product.query";
import {CartService} from "../../cart/state/cart.service";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  // @ts-ignore
  products$: Observable<Product[]>;
  // @ts-ignore
  loading$: Observable<boolean>;
  search = new FormControl();
  sortControl = new FormControl("title");

  constructor(private productService: ProductsService, private cartService: CartService, private productQuery: ProductsQuery) {
  }

  ngOnInit(): void {
    this.productService.get().subscribe();
    this.loading$ = this.productQuery.selectLoading();

    this.products$ = combineLatest(this.search.valueChanges.pipe(startWith("")), this.sortControl.valueChanges.pipe(startWith("title"))).pipe(
      switchMap(([term, sortBy]) => this.productQuery.getProducts(term, sortBy as keyof Product))
    );
  }

}
