import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Product} from "../state/product.model";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent implements OnInit {
  // @ts-ignore
  @Input() product: Product;
  @Output() add = new EventEmitter<Product>();
  @Output() subtract = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

}
