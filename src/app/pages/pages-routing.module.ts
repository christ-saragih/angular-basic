import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CategoryComponent } from './category/category.component';
import { EditComponent } from './todo/edit/edit.component';

const routes: Routes = [
  { path: 'todos', component: TodoComponent },
  { path: 'todos/edit/:id', component: EditComponent }, 
  { path: 'categories', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
