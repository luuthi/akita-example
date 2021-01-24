import {Component, OnInit} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {Product} from "../state/product.model";
import {FormControl} from "@angular/forms";
import {ProductsService} from "../state/product.service";
import {CartService} from "../../cart/state/cart.service";
import {ProductsQuery} from "../state/product.query";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {

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

    this.products$ = combineLatest(this.search.valueChanges
      .pipe(startWith("")), this.sortControl.valueChanges.pipe(startWith("title"))).pipe(
      switchMap(([term, sortBy]) => this.productQuery.getProducts(term, sortBy as keyof Product))
    );
  }

  addProductToCart({id}: Product): void {
    this.cartService.addProductToCart(id);
  }

  subtract({id}: Product): void {
    this.cartService.subtract(id);
  }

}
