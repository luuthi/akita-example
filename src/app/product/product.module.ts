import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductItemComponent } from './product-item/product-item.component';
import {MaterialModule} from "../shared/material.module";

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },
  {
    path: "/:id",
    component: ProductDetailComponent
  }
];


@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule {
}
