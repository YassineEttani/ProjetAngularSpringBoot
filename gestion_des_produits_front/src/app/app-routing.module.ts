import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/category', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/category' }, // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
