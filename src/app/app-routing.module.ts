import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'categories',
    pathMatch: 'full'
  },
  {
    path : 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categories/add',
    loadChildren: () => import('./pages/category-add/category-add.module').then( m => m.CategoryAddPageModule)
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./pages/category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
