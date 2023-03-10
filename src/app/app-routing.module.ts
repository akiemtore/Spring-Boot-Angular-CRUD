import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import {NewProduitComponent} from "./new-produit/new-produit.component";
import {ShowProductComponent} from "./show-product/show-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path: "products", component: ProductComponent} ,

  {path: "newProduct", component: NewProduitComponent} ,

  {path: "product/:id" , component : ShowProductComponent} ,

  {path: "product/update/:id" , component : EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
