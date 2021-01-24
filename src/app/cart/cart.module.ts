import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CartListComponent} from "./cart-list/cart-list.component";
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../shared/material.module";

const routes: Routes = [
  {
    path: "",
    component: CartListComponent
  },
];

@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule {
}
