import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path: "", redirectTo: "products", pathMatch: "full"},
    {path: "products", component: ProductsComponent, title: "Products"},
    {path: "products/:id", loadComponent: () => import("./components/product-details/product-details.component").then((c) => c.ProductDetailsComponent), title: "Details"},
    {path: "cart" , loadComponent: () => import("./components/cart/cart.component").then((c) => c.CartComponent), title: "Cart"},
    {path: "**" , loadComponent: () => import("./components/not-found/not-found.component").then((c) => c.NotFoundComponent), title: "Not Found"}
];
