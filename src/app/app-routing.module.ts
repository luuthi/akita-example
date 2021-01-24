import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "p",
    pathMatch: "full"
  },
  {
    path: "p",
    loadChildren: () => import("./product/product.module").then((m) => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: "c",
    loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
