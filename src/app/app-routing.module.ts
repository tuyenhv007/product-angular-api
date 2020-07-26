import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "./components/product/product.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";


const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'product/add', component: ProductAddComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
